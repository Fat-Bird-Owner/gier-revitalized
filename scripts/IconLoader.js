const extraIcons = {};


function load(){
    try{
        Log.info("Loading icons");

        addIcon("gier", "gr-gier");

        Log.info("Icons: Loaded");
    }catch(e){
        Log.err("Icons: Failed to load");
        Log.err(e);
    }
}


function addIcon(iconName, regionName){
    try{
        if(!iconName || !regionName){
            Log.warn("Icons: Invalid icon definition");
            return;
        }

        extraIcons[iconName] = regionName;
    }catch(e){
        Log.err("Icons: Failed to add icon: " + iconName);
        Log.err(e);
    }
}


function packIcons(){
    try{
        Log.info("Packing custom icons");

        const page = UI.packer.getPages().first();

        Object.keys(extraIcons).forEach(function(iconName){
            try{
                const regionName = extraIcons[iconName];
                const region = Core.atlas.find(regionName);

                if(!region.found()){
                    Log.warn(
                        "Could not find icon region: \"" +
                        regionName +
                        "\""
                    );
                    return;
                }

                page.setDirty(false);

                let pixmapRegion = Core.atlas.getPixmap(region);

                const team = Team.all.find(function(t){
                    return t.name == iconName;
                });

                if(team != null){
                    let px = pixmapRegion.pixmap;

                    px.each(function(x, y){
                        px.setRaw(
                            x,
                            y,
                            Color.muli(
                                px.getRaw(x, y),
                                team.color.rgba()
                            )
                        );
                    });

                    pixmapRegion.pixmap = px.outline(Pal.gray, 3);
                }

                const rect = UI.packer.pack(
                    region.name,
                    pixmapRegion,
                    region.splits,
                    region.pads
                );

                region.texture = page.getTexture();

                region.set(
                    parseInt(rect.x),
                    parseInt(rect.y),
                    parseInt(rect.width),
                    parseInt(rect.height)
                );

                Core.atlas.getTextures().add(region.texture);
                region.pixmapRegion = null;

                Log.info("Icons: Packed \"" + iconName + "\"");
            }catch(e){
                Log.err(
                    "Icons: Failed to pack \"" +
                    iconName +
                    "\""
                );
                Log.err(e);
            }
        });

        page.setDirty(true);

        page.updateTexture(
            TextureFilter.linear,
            TextureFilter.linear,
            false
        );

        Log.info("Icons: Packed");
    }catch(e){
        Log.err("Icons: Failed to pack icons");
        Log.err(e);
    }
}


function registerIcons(){
    try{
        Log.info("Registering custom icons");

        let ch = 0xE001;

        Object.keys(extraIcons).forEach(function(iconName){
            try{
                const regionName = extraIcons[iconName];
                const region = Core.atlas.find(regionName);

                if(!region.found()){
                    Log.warn(
                        "Could not register icon; region not found: \"" +
                        regionName +
                        "\""
                    );
                    return;
                }

                Fonts.registerIcon(
                    iconName,
                    regionName,
                    ch++,
                    region
                );

                Log.info(
                    "Icons: Registered \"" +
                    iconName +
                    "\""
                );
            }catch(e){
                Log.err(
                    "Icons: Failed to register \"" +
                    iconName +
                    "\""
                );
                Log.err(e);
            }
        });

        Log.info("Icons: Registered");
    }catch(e){
        Log.err("Icons: Failed to register icons");
        Log.err(e);
    }
}


try{
    load();
}catch(e){
    Log.err("Icons: Initialization failed");
    Log.err(e);
}


Events.on(AtlasPackEvent, () => {
    try{
        packIcons();
    }catch(e){
        Log.err("Icons: AtlasPackEvent failed");
        Log.err(e);
    }
});


Events.on(ClientLoadEvent, () => {
    try{
        registerIcons();
    }catch(e){
        Log.err("Icons: ClientLoadEvent failed");
        Log.err(e);
    }
});
