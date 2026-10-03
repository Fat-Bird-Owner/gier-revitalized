const tag = "configs-assembler"

// Saves config to current map via tags
Events.on(TapEvent, e => {
try {

let {player, tile} = e;
if (!tile.build || !player || !player.team || tile.team() != player.team()) return;
if (tile.block() != Vars.content.block("gr-imprinter-assembler")) return;
  
let build = tile.build
let c = JSON.parse(Vars.state.rules.tags.get(tag));

let baseDialog = new BaseDialog("");
baseDialog.addCloseButton();

let t = 0;
build.block.plans.each(p => {

let i = t;

t++;
let button = new Button();

button.add(new Image(p.unit.uiIcon).setScaling(Scaling.fit))
button.row();
button.add(p.unit.localizedName)

button.clicked(() => {
try {

build.lastTier = i;
build.currentTier = i;
if (!c) c = {};
c[build.pos()] = {
x: build.x,
y: build.y,
config: i
}

Vars.state.rules.tags.put(tag, JSON.stringify(c))
baseDialog.hide();

} catch(e){
log("ConfigAssembler - TapEvent Inner" + e)
}});

baseDialog.cont.add(button).grow().row()

});

baseDialog.show();

} catch(e){
log("ConfigAssembler - TapEvent" + e)
}});

function removeBuild(id){
    let c = Vars.state.rules.tags.get(tag);
    if(!c) return;
    c = JSON.parse(c);
    delete c[id];
    Vars.state.rules.tags.put(tag, JSON.stringify(c));
}

// Loads config
Events.on(WorldLoadEvent, () => {
try {

let c = Vars.state.rules.tags.get(tag);
if (!c) return;

let parseConfig = JSON.parse(c)
let array = Object.keys(parseConfig);
let length = array.length;

for (let i = 0; i < length; i++){

if (c != Vars.state.rules.tags.get(tag)){
c = Vars.state.rules.tags.get(tag);
}

const key = array[i]
const buildArray = parseConfig[key];

if (!buildArray || buildArray["x"] == null) {
removeBuild(key)
continue;
}

const build = Vars.world.build(buildArray["x"]/8, buildArray["y"]/8);

if (!build || build.block != Vars.content.block("gr-imprinter-assembler")) {
removeBuild(key)
continue;
}
  
build.currentTier = buildArray["config"];
build.lastTier = buildArray["config"];
  
}
  
} catch(e){
log("ConfigAssembler - WorldLoad" + e)
}});
