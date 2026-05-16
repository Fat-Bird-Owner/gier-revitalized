let blocks = null;

Events.run(Trigger.update, () => {
try {
if (!Vars.state.isPlaying()) return;
const block = Vars.content.block("gr-geothermal-turbine");

if (blocks == null || blocks.size() != Groups.build.size()){
blocks = Groups.build.copy().select(b => b.block == block);
}
  
for(let i = 0; i < blocks.size; i++){
try{
const build = blocks.get(i);

if(
build.liquids &&
build.tile &&
build.tile.floor() == Vars.content.block("gr-oil-tile")
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
