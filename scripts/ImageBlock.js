Events.on(TapEvent, event => {
try {

    const {tile, player} = event;
    const {content} = Vars;
    const {atlas} = Core;
    const block = content.block("gr-encrypted-note");
    
    if(!tile || !tile.build || !player) return;
    if(player.team() != tile.team()) return;
    if(player.selectedBlock != null) return;
    if(tile.build.block != block) return;

    const message = String(tile.build.message || "").trim();
    if(message.length <= 0) return;

    const slice = message.split(" ");
    const imageName = slice[0];
    let sentence = "";

    if(slice.length > 1){
        sentence = slice.slice(1).join(" ");
    }

    const contImage = atlas.find(imageName);
    const dialog = new BaseDialog(block.localizedName);

    if(contImage && contImage.found()){
        dialog.cont.image(contImage).image.setScaling(Scaling.fit).center();
    }else{
        dialog.cont.add(imageName).center();
    }

    if(sentence.length > 0){
        dialog.cont.row();
        dialog.cont.add(sentence).width(800).wrap().get().setAlignment(Align.center);
    }

    dialog.addCloseButton();
    dialog.show();

} catch(e){
    Vars.ui.showInfoToast(e + "[red] - ImageBlock", 5);
}
});
