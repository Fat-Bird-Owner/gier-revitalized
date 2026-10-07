let baseThreshold = 25;

Events.on(BuildDamageEvent, event => {
try{
const build = event.build;
const source = event.source;
const target = Vars.content.block("gr-regen-barracade");
    
if (!build || !source || !target) return;
if (build.block != target) return;

let scale = Mathf.clamp(( source.damage - build.block.armor )/baseThreshold, 0.05, 1.25);
if (scale >= 1) build.applyBoost(scale);
else build.applySlowdown(scale);

} catch(e) {
Vars.ui.showInfoToast(e,5);
}
})
