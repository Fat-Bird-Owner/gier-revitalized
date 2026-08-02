Events.on(TapEvent, e => {
try {
const { player, tile } = e;

if (!player || tile.block() != Vars.content.block("gr-manual-override")) return;
if (!tile.team() || tile.team() != player.team()) return;

const build = tile.build
build.enabled = !build.enabled

if (!build.front() || build.front.team != player.team()) return;
build.front().enabled = build.enabled
tile.block().clickSound.at(build.x, build.y)

} catch(e){
Vars.ui.showErrorMessage(e)
}});
