const resilientUnit = [
"gr-fort"
];

Events.on(UnitDamageEvent, event => {
try {

const {unit, bullet} = event;
if (!unit || !bullet) return;

let found = false;
for (let i = 0; i < resilientUnit.length; i++){
if (unit.type == Vars.content.unit(resilientUnit[i])){
found = true;
break;
}}

if (found != true) return;

const shieldGain = Mathf.clamp(bullet.damage - unit.armor, 0, unit.armor);
if (shieldGain <= 0) return;

Fx.absorb.at(unit.x, unit.y);
unit.shield += shieldGain;
unit.apply(StatusEffects.overClocked, 0.5 * 30);
  
} catch(e){
Vars.ui.showInfoToast(e + " - resilientUnit", 5);
}});
