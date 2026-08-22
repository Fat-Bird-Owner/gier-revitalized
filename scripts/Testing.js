var extraIcons = {};

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

function registerIcons(){
    try{
        var names = Object.keys(extraIcons);
        var ch = 0xE001;

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
            }catch(err){
                Log.err("Failed to register icon '" + names[i] + "': " + err);
            }
        }
    }catch(err){
        Log.err("Failed to register icons: " + err);
    }
}

// Loading
addIcon("copper-fort", "gr-copper-fort");

Events.on(AtlasPackEvent, () => {
try {

registerIcons()
log("Packing - Successful");

} catch(e){
log("packing error:" + e);
}});
