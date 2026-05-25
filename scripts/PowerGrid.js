const blocks = [
"gr-power-grid"
];

const stats = require("Stats");
let time = 0;
let group = null;

Events.run(Trigger.update, () => {
try {
if (Vars.state.isPaused() || !Vars.state.isPlaying()) return;
  
time += Time.delta;
if (time >= 60 || group == null) {
time = 0;
group = Groups.build.copy().select(build => build.block == Vars.content.block("gr-power-grid"));
}

if (group == null) return;
group.each(build => {
try {
const netIn = build.sense(LAccess.powerNetIn) - build.sense(LAccess.powerNetOut);
if (netIn >= build.block.attributes.get(Attribute.get("netIn"))) {
time = 60;
build.kill();
}

  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

Events.on(ClientLoadEvent, () => {
try {

for (let i = 0; i < blocks.length; i++){
const block = Vars.content.block(blocks[i]);
Vars.ui.content.show(block);
Vars.ui.content.hide();

block.stats.add(stats.netIn, block.attributes.get(Attribute.get("netIn")));
}
  
} catch(e){
Vars.ui.showErrorMessage(e);
}});
