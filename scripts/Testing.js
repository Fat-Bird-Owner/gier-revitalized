var extraIcons = {
    "copper-fort": "copper-fort"
};

function addIcon(name, regionName){
    try{
        extraIcons[name] = regionName;
    }catch(err){
        Log.err("Failed to add icon: " + err);
    }
}

function packIcons(){
    try{
        var names = Object.keys(extraIcons);

        for(var i = 0; i < names.length; i++){
            var name = names[i];
            var regionName = extraIcons[name];
            var region = Core.atlas.find(regionName);

            if(region == null || !region.found()){
                Log.warn("Could not find icon region: " + regionName);
                continue;
            }

            // Your atlas-packing code goes here.
            // This part must run during AtlasPackEvent.
        }
    }catch(err){
        Log.err("Failed to pack icons: " + err);
    }
}

function tryRegisterIcons(){
    try{
        if(Fonts.def == null)
            return false;

        var names = Object.keys(extraIcons);
        var ch = 0xE001;

        for(var i = 0; i < names.length; i++){
            try{
                var name = names[i];
                var regionName = extraIcons[name];
                var region = Core.atlas.find(regionName);

                if(region == null || !region.found()){
                    Log.warn("Icon region not found: " + regionName);
                    continue;
                }

                Fonts.registerIcon(
                    name,
                    regionName,
                    ch++,
                    region
                );
            }catch(err){
                Log.err("Failed to register icon '" + name + "': " + err);
            }
        }

        return true;
    }catch(err){
        Log.err("Icon registration error: " + err);
        return false;
    }
}
// Loading
addIcon("copper-fort", "gr-copper-fort");

Events.on(ClientLoadEvent, e => {
    try{
        if(!tryRegisterIcons()){
            Time.run(60, () => {
                tryRegisterIcons();
                log("packed icons")
            });
        }
        
    }catch(err){
        Log.err("Delayed icon registration failed: " + err);
    }
});
