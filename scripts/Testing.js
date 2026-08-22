var extraIcons = {};

function addIcon(name, regionName){
    try{
        extraIcons[name] = regionName;
        log("Added " + name + " to queue");
        
    }catch(err){
        Log.err("Failed to add icon '" + name + "': " + err);
    }
}

function registerIcons(){
    try{
        let ch = 0xE001;

        for(const name in extraIcons){
            try{
                const regionName = extraIcons[name];
                const region = Core.atlas.find(regionName);

                if(region == null || !region.found()){
                    Log.warn("Could not find icon region: " + regionName);
                    continue;
                }

                Fonts.registerIcon(
                    name,
                    regionName,
                    ch++,
                    region
                );

                Log.info("Registered icon: " + name);
            }catch(err){
                Log.err("Failed to register icon '" + name + "': " + err);
            }
        }
    }catch(err){
        Log.err("Failed to register custom icons: " + err);
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
