let blocks = null;
let floorBlock = null;
let block = null;
let check = 0;

Events.run(Trigger.update, () => {
try {
if (!Vars.state.isPlaying()) return;

if (floorBlock == null){
floorBlock = Vars.content.block("gr-oil-tile");
}

if (block == null){
block = Vars.content.block("gr-geothermal-turbine");;
}

check += Time.delta;
if (check >= 60){
blocks = Groups.build.copy().select(b => b.block == block);
check = 0;
}

if (!blocks) return;  
for(let i = 0; i < blocks.size; i++){
try{
const build = blocks.get(i);

if(!build || !build.isValid() || !build.tile){
blocks.remove(i);
continue;
}
  
if(
build.liquids && build.tile && build.tile.floor() == floorBlock && build.team != Team.derelict){
build.liquids.add( Liquids.oil, (15 / 60) * Time.delta);
}

}catch(e){}
}
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
