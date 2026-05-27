const blocks = [
"gr-power-grid"
];

const stats = require("Stats");

Events.on(BuildDamageEvent, event => {
try {
const {build} = event;
if (!build || !build.block) return;

let found = false;
for (let i = 0; i < blocks.length; i++){
if (build.block == Vars.content.block(blocks(i]) {
found = true;
break;
}}

const netInAtt = build.sense(LAccess.powerNetIn) - build.sense(LAccess.powerNetOut);

if (netInAtt >= build.block.attributes.get(Attribute.get("netIn"))){
build.kill();
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
