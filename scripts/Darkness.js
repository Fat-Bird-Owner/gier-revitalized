Events.on(ClientLoadEvent, () => {
try {

const darkness = Vars.content.block("gr-darkness");
darkness.region = Core.atlas.find("window-empty");
darkness.hasShadow = false;

} catch(e){
Vars.ui.showText("e - Darkness", e);  
}});
