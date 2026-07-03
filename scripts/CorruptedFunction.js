Events.on(UnitDamageEvent, event => {
try{
const {unit, bullet} = event;
const effect = Vars.content.statusEffect("gr-corrupted")
  
if (!unit || !bullet || !unit.hasEffect(effect)) return;

Vars.ui.showInfoToast("Dam", 5);

const {type} = unit;
const chance = Mathf.clamp(
100 - unit.health / type.health * 100 - 25,
0,
100
);

if (Mathf.random(1, 100) <= chance) {
unit.team = bullet.team;
unit.unapply(effect);
Fx.teleport.at(unit.x, unit.y);
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
