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
        var teams = Seq.with(Team.all);

        for(var entry of extraIcons.entries()){
            try{
                var region = Core.atlas.find(entry.value);

                if(!region.found()){
                    Log.warn("Could not find icon region: \"" + entry.value + "\"");
                    continue;
                }

                page.setDirty(false);

                var pixmapRegion = Core.atlas.getPixmap(region);

                var team = teams.find(function(t){
                    return t.name == entry.key;
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

                var rect = UI.packer.pack(
                    region.name,
                    pixmapRegion,
                    region.splits,
                    region.pads
                );

                region.texture = page.getTexture();

                region.set(
                    (int)rect.x,
                    (int)rect.y,
                    (int)rect.width,
                    (int)rect.height
                );

                Core.atlas.getTextures().add(region.texture);
                region.pixmapRegion = null;

            }catch(err){
                Log.err("Icons.packIcons entry failed: " + err);
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
                Fonts.registerIcon(
                    entry.key,
                    entry.value,
                    ch++,
                    Core.atlas.find(entry.value)
                );
            }catch(err){
                Log.err("Icons.registerIcons entry failed: " + err);
            }
        }

    }catch(err){
        Log.err("Icons.registerIcons failed: " + err);
    }
}

Events.on(AtlasPackEvent, function(e){
    try{

    load()
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
