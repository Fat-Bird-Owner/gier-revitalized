let time = 0;
let group = null;

Events.run(Trigger.update, () => {
try {

time += Time.delta;
if (time >= 60 || group == null) {
time = 0;
group = Groups.build.copy().select(build => build.block == Vars.content.block("gr-power-grid"));
}

if (group == null) return;
group.each(build => {
try {
const netIn = build.sense(LAccess.powerNetIn) - build.sense(LAccess.powerNetOut);
if (netIn >= build.block.attributes.get(Attributes.get("netIn"))) build.kill();

  
} catch(e){}
});
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
