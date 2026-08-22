let extraIcons = {};

function addIcon(name, regionName){
    try{
        extraIcons[name] = regionName;
    }catch(err){
        Log.err("Failed to add icon: " + name);
    }
}

function registerIcons(){
    try{
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

            }catch(err){
                Log.err("Failed to register icon: " + err);
            }
        }
    }catch(err){
        Log.err("Failed to register custom icons: " + err);
    }
}

Events.on(AtlasPackEvent, () => {
try {
  
addIcon("copper-fort", "gr-copper-fort");

registerIcons()
log("Packing - Successful");

} catch(e){
log("packing error:" + e);
}});
