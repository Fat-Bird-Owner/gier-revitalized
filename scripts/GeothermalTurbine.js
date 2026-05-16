let blocks = null;
let floorBlock = null;
let block = null;

Events.run(Trigger.update, () => {
try {
if (!Vars.state.isPlaying()) return

if (floorBlock == null){
floorBlock = Vars.content.block("gr-oil-tile");
}

if (block == null){
block = Vars.content.block("gr-geothermal-turbine");;
}
  
if (blocks == null || blocks.size != Groups.build.copy().size){
blocks = Groups.build.copy().select(b => b.block == block);
}
  
for(let i = 0; i < blocks.size; i++){
try{
const build = blocks.get(i);
  
if(
build.liquids &&
build.tile &&
build.tile.floor() == floorBlock
){
build.liquids.add(
Liquids.oil,
(15 / 60) * Time.delta
);
}

}catch(e){}
}
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
