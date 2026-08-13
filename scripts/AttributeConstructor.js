

// Main Logic behind the code will enable it if a block has carbon efficiency doesnt actually work tho
Events.on(BlockBuildEndEvent, e => {
try{

const tile = e.tile;
const building = tile.build;

if(!building) return;

if(tile.block() != Vars.content.block("gr-fissure-amalgam")) return;

let fx = 0, fy = 0;

if(building.rotation == 0) fx = -1;
else if(building.rotation == 1) fy = -1;
else if(building.rotation == 2) fx = 1;
else fy = 1;

const size = building.block.size;
const offset = Math.floor((size - 1) / 2);

let totalAttribute = 0;
let carbon = 0;
let count = 0;

for(let dx = 0; dx < size; dx++){
for(let dy = 0; dy < size; dy++){

    const bx = building.tile.x - offset + dx;
    const by = building.tile.y - offset + dy;

    const tx = bx + fx;
    const ty = by + fy;

    const worldTile = Vars.world.tile(tx, ty);
    if(!worldTile) continue;

    const block = worldTile.block();
    const overlay = worldTile.overlay();
    if(!block) continue;

    const attribute = block.attributes.get(Attribute.get("beryllium"));

    
    if (block != Vars.content.block("gr-fissure-amalgam")){
    if(attribute <= 0){
    Fx.unitEnvKill.at(worldTile.worldx(), worldTile.worldy());
    }else{
    Fx.upgradeCoreBloom.at(worldTile.worldx(), worldTile.worldy(), 1);
    }}

    
    if(attribute == null) continue;
    if (overlay != null){
    const attributeOverlay = overlay.attributes.get(Attribute.get("beryllium"));
    totalAttribute += (attributeOverlay * 2);
    }
    totalAttribute += (attribute * 2);
    carbon += block.attributes.get(Attribute.get("carbon"));
    count++;
}
}

if(count == 0) return;

const attribute = totalAttribute / count;

if (carbon >= attribute){
building.recipe = Vars.content.block("gr-packed-graphite");
} else {
building.recipe = Vars.content.block("gr-packed-beryllium");
}
    
if(attribute >= 1){
    building.applyBoost(attribute, Infinity);
}else{
    building.applySlowdown(attribute, Infinity);
}

if(attribute <= 0) building.enabled = false;
    
} catch(err){
    Vars.ui.showText("bruv", err);
}
});

// Sets stats for the block
Events.on(ClientLoadEvent, () =>{
try{    
const block = Vars.content.block("gr-fissure-amalgam");
Vars.ui.content.show(block);
Vars.ui.content.hide();
    
const list = new Seq();
list.addAll([
    Vars.content.block("gr-packed-graphite"),
    Vars.content.block("gr-packed-beryllium")
]);

block.stats.remove(Stat.buildSpeed);
block.stats.remove(Stat.itemCapacity);
block.stats.remove(Stat.output);
    
block.stats.replace(Stat.tiles, StatValues.blocks(Attribute.get("beryllium"), false, 1, true, false));
block.stats.replace(Stat.output, StatValues.content(list));
    
} catch(e){
Vars.ui.showText("bruv",e);
}});

Events.on(ContentInitEvent, () =>{
try{  
const block = Vars.content.block("gr-fissure-amalgam");
block.addBar("ef", e => new Bar(() => "Efficiency: " + 
Math.floor(e.timeScale() * 100) + "%",() => Pal.lightOrange,() => e.timeScale() > 0 ? e.timeScale() : 0     ) );
    
} catch(e){
Vars.ui.showText("bruv",e);
}});
