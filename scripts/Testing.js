var extraIcons = {};

function addIcon(name, regionName){
    try{
        extraIcons[name] = regionName;
        log("Added " + name + " to icon queue");
    }catch(err){
        log("Failed to add icon '" + name + "': " + err);
    }
}

function registerIcons(){
    try{
        var ch = 0xE001;

        for(var name in extraIcons){
            try{
                var regionName = extraIcons[name];
                var region = Core.atlas.find(regionName);

                if(region == null || !region.found()){
                    log("Could not find icon region: " + regionName);
                    continue;
                }

                Fonts.registerIcon(
                    name,
                    regionName,
                    ch++,
                    region
                );

                log("Registered icon: " + name);
            }catch(err){
                log("Failed to register icon '" + name + "': " + err);
            }
        }
    }catch(err){
        log("Failed to register custom icons: " + err);
    }
}

Events.on(AtlasPackEvent, function(e){
    try{
        addIcon("copper-fort", "gr-copper-fort");
        addIcon("kela", "gr-techtree-kela");
        addIcon("gier", "gr-gier");
    }catch(err){
        log("AtlasPackEvent error: " + err);
    }
});

Events.on(ClientLoadEvent, function(e){
    try{
        registerIcons();
    }catch(err){
        log("ClientLoadEvent error: " + err);
    }
});
