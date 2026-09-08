Events.on(UnitDamageEvent, e => {
try {

const unit = e.unit;
if (unit == null) return;

const type = unit.type
if (type != Vars.content.unit("gr-electron") && type != Vars.content.unit("gr-arraign") && type != Vars.content.unit("gr-onus") ) return;

Sounds.shootArc.at(unit.x,unit.y);
Lightning.create(
    unit.team,
    Color.valueOf("bccae0ff"),
    35,
    unit.x,
    unit.y,
    Mathf.random(360),
    24 + Mathf.random(24)
);
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
