const textures = [
    "gr-techtree-kela",
    "gr-gier",
    "gr-copper-fort",
    "gr-mass-launcher-base"
];

Events.on(ClientLoadEvent, () => {
    let code = 0xE000;

    for(let i = 0; i < textures.length; i++){
        let name = textures[i];
        let region = Core.atlas.find(name);

        if(!region.found()){
            Log.err("Icon texture not found: " + name);
            continue;
        }

        Fonts.registerIcon(
            name,
            region.name,
            code + i,
            region
        );

        Log.info(
            "Registered " + name +
            " -> " + region.name +
            " [" + (code + i) + "]"
        );
    }
});
