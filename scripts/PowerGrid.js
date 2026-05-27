const blocks = [
"gr-power-grid"
];

const stats = require("Stats");
let time = 0;
let group = null;
let ls = 0;
let block = null;
let netIn = null;

Events.run(Trigger.update, () => {
try {
if (Vars.state.isPaused() || !Vars.state.isPlaying()) return;

if (block == null){
block = Vars.content.block("gr-power-grid");
}

if (netIn == null){
netIn = Attribute.get("netIn");
}

  
time += Time.delta;
if ((ls != Groups.build.size()) && (time >= 60 || group == null)) {
time = 0;

/*
group = Groups.build.copy().select(build => build.block == block);
*/

if (group == null) group = new Seq();  
group.clear();

Groups.build.each(b => {
try {

if(b.block == block){
group.add(b);
}
  
} catch(e){}
});
  
ls = Groups.build.size();
}

if (group == null) return;
for(let i = 0; i < group.size; i++){ 

const build = group.get(i);
const netInAtt = build.sense(LAccess.powerNetIn) - build.sense(LAccess.powerNetOut);
  
if (netInAtt >= build.block.attributes.get(netIn)) {
group.remove(i);
build.kill();
}

}
  
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
