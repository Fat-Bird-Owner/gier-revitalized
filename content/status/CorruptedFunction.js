Events.on(UnitDamageEvent, event => {
try{
const {unit, bullet} = event;
const effect = Vars.content.statusEffect("gr-corrupted")
  
if (!unit || !bullet || !unit.hasEffect(effect)) return;

const {type} = unit;
const chance = (((type.health /  unit.health) - 1) * -100) - 25;

if (Mathf.random(1, 100) <= chance) {
unit.setProp(LAccess.team, bullet.team)
unit.unapply(effect);
Fx.teleport.at(unit.x, unit.y);
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
