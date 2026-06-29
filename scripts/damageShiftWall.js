let target = null;
let transitBlock = null;

Events.on(BuildDamageEvent, event => {
try {
const {build, source} = event;

if target == null || transitBlock = null {
target = Vars.content.block("gr-refined-scrap-barracade");
transitBlock = Vars.content.block("gr-scrap-piled-barracade");
} 

if build.block != target return
  
} catch(e){
Vars.ui.showInfoToast(e + "[red] - damageShiftWall",5);
}});
