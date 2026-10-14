Events.on(UnitCreateEvent, e => {
try {

const unit = e.unit;
const spawner = e.spawner;
if (spawner == null) return;

const type = spawner.block;
const target =  Vars.content.block("gr-imprinter-assembler");

if (type == target && spawner.liquids != null){
const liquids = spawner.liquids;

if (liquids.get(Liquids.cryofluid) >= 25){
unit.apply(StatusEffects.overdrive,Infinity);
liquids.remove(Liquids.cryofluid,25);
}

let steam = Vars.content.liquid("gr-liquid-steam")
if (liquids.get(steam) >= 25){
unit.apply(StatusEffects.overclock,Infinity);
liquids.remove(steam,25);
}

let overdriveFluid = Vars.content.liquid("gr-overdrive-fluid");
if (liquids.get(overdriveFluid) >= 25){
unit.apply(Vars.content.statusEffect("gr-overclock-bound"),Infinity);
liquids.remove(overdriveFluid,25);
}
  
}
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
