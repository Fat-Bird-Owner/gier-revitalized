Events.on(BlockBuildEndEvent, e => {
try {

const {tile} = e;
const build = tile.build

if (!build || build.block != Vars.content.block("gr-spatial-container")) return;

build.linkedCore = build.team.core()
  
} catch (e) {
log(e)
}});

Events.on(WorldLoadEvent, () => {
try {

Groups.build.each(b => {
try {

if (b.block == Vars.content.block("gr-spatial-container")){
b.linkedCore = build.team.core();
}
  
} catch(e){
Log.err(e)
}});
  
} catch(e) {
Log.err(e)
}});
