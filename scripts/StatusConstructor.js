Events.on(UnitCreateEvent, e => {
try {

const unit = e.unit;
const spawner = e.spawner;
if (spawner == null) return;

const type = spawner.block;
const target =  Vars.content.block,"gr-imprinter-assembler");

if (type == target && spawner.liquids != null){
const liquids = spawner.liquids;
  
if (liquids.get(Liquids.cyanogen) >= 10){
unit.apply(StatusEffects.overdrive,9999);
spawner.liquids.remove(Liquids.cyanogen,10);
cyanogenFx.at(spawner.x,spawner.y);    
}

if (spawner.liquids.get(Liquids.water) >= 10){
unit.apply(StatusEffects.fast,9999);
spawner.liquids.remove(Liquids.water,10);
waterFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.cryofluid) >= 10){
unit.apply(StatusEffects.overclock,9999);
spawner.liquids.remove(Liquids.cryofluid,10);
cryoFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.gallium) >= 10){
unit.apply(StatusEffects.shielded,9999);
spawner.liquids.remove(Liquids.gallium,10);
galliumFx.at(spawner.x,spawner.y);
}
}
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
