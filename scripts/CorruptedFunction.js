Events.on(UnitDamageEvent, event => {
try{
const {unit, bullet} = event;
const effect = Vars.content.statusEffect("gr-corrupted");
  
if (!unit || !bullet || !unit.hasEffect(effect)) return;

const {type} = unit;
const mul = Mathf.clamp(
(bullet.damage / 50),
0,
1
);

const chance = Mathf.clamp(
(100 - unit.health / type.health * 100 - 75) * mul,
0,
100
);

if (Mathf.random(1, 100) <= chance && !unit.hasEffect(StatusEffects.boss)) {
unit.team = bullet.team;
unit.unapply(effect);
  
unit.controller(!type.playerControllable || (unit.team.isAI() && !unit.team.rules().rtsAi) ? type.aiController.get() : new CommandAI());
  
Fx.teleport.at(unit.x, unit.y);
}

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
