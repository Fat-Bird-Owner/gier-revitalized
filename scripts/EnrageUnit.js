
Events.on(UnitDamageEvent, e => {
try{
const unit = e.unit;
const target = [
Vars.content.unit("gr-ash"),
Vars.content.unit("gr-arraign"),
Vars.content.unit("gr-abalone")
];
  
const status = Vars.content.getByName(ContentType.status, "gr-rage");
const maxThres = (unit.maxHealth / 2);
const valid = unit.getDuration(status);
  
if (unit.health >= maxThres || valid != 0) return;
if (unit.type != target[0] && unit.type != target[1]) return;
  
unit.apply(status);

} catch(e){
Vars.ui.showInfoToast(e,3);
}})
