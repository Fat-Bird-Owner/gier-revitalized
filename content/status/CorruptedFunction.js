Events.on(UnitDamageEvent, event => {
try{
const {unit, bullet} = event;
const effect = Vars.content.statusEffect("gr-corrupted")
  
if (!unit || !bullet || !unit.hasEffect(effect))return;

const {type} = unit.type;
const chance = ((type.health /  unit.health) - 1) * -100) - 25;

if (Mathf.random(0, 100) <= chance) {
unit.team = bullet.team;
unit.unapply(effect);
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
