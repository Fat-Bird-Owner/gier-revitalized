var extraIcons = new StringMap();

function load(){
    try{
        Log.info("Loading icons");

        addIcon("copper-fort", "gr-copper-fort");
        addIcon("kela", "gr-techtree-kela");
        addIcon("gier", "gr-gier");

    }catch(err){
        Log.err("Icons.load failed: " + err);
    }
}

function addIcon(iconName, regionName){
    try{
        extraIcons.put(iconName, regionName);
    }catch(err){
        Log.err("Icons.addIcon failed: " + err);
    }
}

function packIcons(){
    try{
        var page = UI.packer.getPages().first();

        for(var entry of extraIcons.entries()){
            try{
                var region = Core.atlas.find(entry.value);

                if(!region.found()){
                    Log.warn("Icon region not found: " + entry.value);
                    continue;
                }

                Log.info(
                    "Packing icon: " +
                    entry.key +
                    " -> " +
                    entry.value +
                    " (" +
                    region.width +
                    "x" +
                    region.height +
                    ")"
                );

                var pixmapRegion = Core.atlas.getPixmap(region);

                if(pixmapRegion == null || pixmapRegion.pixmap == null){
                    Log.err("No pixmap for: " + entry.value);
                    continue;
                }

                var rect = UI.packer.pack(
                    region.name,
                    pixmapRegion,
                    region.splits,
                    region.pads
                );

                Log.info(
                    "Packed " +
                    entry.key +
                    " at " +
                    rect.x +
                    "," +
                    rect.y +
                    " size " +
                    rect.width +
                    "x" +
                    rect.height
                );

                region.texture = page.getTexture();

                region.set(
                Math.floor(rect.x),
                Math.floor(rect.y),
                Math.floor(rect.width),
                Math.floor(rect.height)
                );

                Core.atlas.getTextures().add(region.texture);

                region.pixmapRegion = null;

            }catch(err){
                Log.err(
                    "Failed packing icon '" +
                    entry.key +
                    "': " +
                    err
                );
            }
        }

        page.setDirty(true);

        page.updateTexture(
            TextureFilter.linear,
            TextureFilter.linear,
            false
        );

    }catch(err){
        Log.err("Icons.packIcons failed: " + err);
    }
}

function registerIcons(){
    try{
        var ch = 0xE001;

        for(var entry of extraIcons.entries()){
            try{
                var region = Core.atlas.find(entry.value);

                if(!region.found()){
                    Log.err(
                        "Cannot register missing icon: " +
                        entry.value
                    );
                    continue;
                }

                Fonts.registerIcon(
                    entry.key,
                    entry.value,
                    ch++,
                    region
                );

                Log.info(
                    "Registered icon: " +
                    entry.key +
                    " using " +
                    entry.value
                );

            }catch(err){
                Log.err(
                    "Failed registering icon '" +
                    entry.key +
                    "': " +
                    err
                );
            }
        }

    }catch(err){
        Log.err("Icons.registerIcons failed: " + err);
    }
}

Events.on(AtlasPackEvent, function(e){
    try{
        load();
        packIcons();

    }catch(err){
        Log.err("AtlasPackEvent error: " + err);
    }
});

Events.on(ClientLoadEvent, function(e){
    try{
        registerIcons();

    }catch(err){
        Log.err("ClientLoadEvent error: " + err);
    }
});
