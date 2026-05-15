Events.run(Trigger.update, () => {
const block = Vars.content.block("gr-geothermal-turbine");
const blocks = Groups.build.copy().select(b => b.block == block);

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
});
