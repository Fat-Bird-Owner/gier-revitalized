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
        var teams = Seq.with(Team.all);

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

                page.setDirty(false);

                var pixmapRegion = Core.atlas.getPixmap(region);

                // Apply team color and outline
                var team = teams.find(function(t){
                    return t.name == iconName;
                });

                if(team != null){
                    var px = pixmapRegion.pixmap;

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

                // Repack the modified pixmap
                var rect = UI.packer.pack(
                    region.name,
                    pixmapRegion,
                    region.splits,
                    region.pads
                );

                // Update atlas region
                region.texture = page.getTexture();

                region.set(
                    parseInt(rect.x),
                    parseInt(rect.y),
                    parseInt(rect.width),
                    parseInt(rect.height)
                );

                Core.atlas.getTextures().add(region.texture);
                region.pixmapRegion = null;

            }catch(err){
                Log.err("Failed to pack icon '" + names[i] + "': " + err);
            }
        }

        page.setDirty(true);
        page.updateTexture(
            TextureFilter.linear,
            TextureFilter.linear,
            false
        );

    }catch(err){
        Log.err("Failed to pack custom icons: " + err);
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
