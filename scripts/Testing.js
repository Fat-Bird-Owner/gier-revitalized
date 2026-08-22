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
        // Atlas manipulation goes here.
        Log.info("Packing custom icons...");
    }catch(err){
        Log.err("Failed to pack icons: " + err);
    }
}

function registerIcons(){
    try{
        if(Fonts.def == null){
            Log.warn("Fonts.def is null, cannot register icons.");
            return;
        }

        var ch = 0xE001;
        var names = Object.keys(extraIcons);

        for(var i = 0; i < names.length; i++){
            try{
                var name = names[i];
                var regionName = extraIcons[name];
                var region = Core.atlas.find(regionName);

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
                Log.err("Failed to register icon '" + names[i] + "': " + err);
            }
        }
    }catch(err){
        Log.err("Failed to register custom icons: " + err);
    }
}

Events.on(AtlasPackEvent, e => {
    try{
        addIcon("copper-fort", "gr-copper-fort");
        packIcons();
    }catch(err){
        Log.err("AtlasPackEvent error: " + err);
    }
});

Events.on(ClientLoadEvent, e => {
    try{
        registerIcons();
    }catch(err){
        Log.err("ClientLoadEvent error: " + err);
    }
});
