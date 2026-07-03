Events.on(UnitDamageEvent, event => {
try{
const {unit, bullet} = event;
const effect = Vars.content.statusEffect("gr-corrupted");
  
if (!unit || !bullet || !unit.hasEffect(effect)) return;

const {type} = unit;
const chance = Mathf.clamp(
100 - unit.health / type.health * 100 - 50,
0,
100
);

if (Mathf.random(1, 100) <= chance && !unit.hasEffect(StatusEffects.boss)) {
unit.team = bullet.team;
unit.unapply(effect);
Fx.teleport.at(unit.x, unit.y);
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
