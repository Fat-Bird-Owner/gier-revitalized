var extraIcons = {};

function addIcon(iconName, regionName){
    try{
        extraIcons[iconName] = regionName;
    }catch(err){
        Log.err("Failed to add icon '" + iconName + "': " + err);
    }
}

function packIcons(){
    try{
        var page = UI.packer.getPages().first();
        var names = Object.keys(extraIcons);

        for(var i = 0; i < names.length; i++){
            try{
                var regionName = extraIcons[names[i]];
                var region = Core.atlas.find(regionName);

                if(region == null || !region.found()){
                    Log.warn("Missing icon: " + regionName);
                    continue;
                }

                var pixmap = Core.atlas.getPixmap(region);

                if(pixmap == null){
                    Log.warn("No pixmap for: " + regionName);
                    continue;
                }

                page.setDirty(false);

                var rect = UI.packer.pack(
                    region.name,
                    pixmap,
                    region.splits,
                    region.pads
                );

                region.texture = page.getTexture();
                log("Packed icons")
                
                region.set(
                    Math.floor(rect.x),
                    Math.floor(rect.y),
                    Math.floor(rect.width),
                    Math.floor(rect.height)
                );

                region.pixmapRegion = null;

            }catch(err){
                Log.err("Failed packing " + names[i] + ": " + err);
            }
        }

        page.setDirty(true);

        page.updateTexture(
            TextureFilter.linear,
            TextureFilter.linear,
            false
        );

    }catch(err){
        Log.err("packIcons failed: " + err);
    }
}

function registerIcons(){
    try{
        var ch = 0xE001;
        var names = Object.keys(extraIcons);

        for(var i = 0; i < names.length; i++){
            try{
                var iconName = names[i];
                var regionName = extraIcons[iconName];
                var region = Core.atlas.find(regionName);

                if(!region.found()){
                    Log.warn("Could not find icon region: \"" + regionName + "\"");
                    continue;
                }

                Fonts.registerIcon(
                    iconName,
                    regionName,
                    ch++,
                    region
                );

            }catch(err){
                Log.err("Failed to register icon '" + names[i] + "': " + err);
            }
        }
    }catch(err){
        Log.err("Failed to register icons: " + err);
    }
}

Events.on(AtlasPackEvent, function(e){
    try{
        
        addIcon("copper-fort", "gr-copper-fort");
        addIcon("kela", "gr-techtree-kela");
        addIcon("gier", "gr-gier");
        
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
