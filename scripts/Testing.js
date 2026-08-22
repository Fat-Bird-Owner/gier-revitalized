var extraIcons = {};

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
// Loading
addIcon("copper-fort", "gr-copper-fort");

Events.on(AtlasPackEvent, e => {
    try{
        packIcons();
    }catch(err){
        Log.err("AtlasPackEvent error: " + err);
    }
});

Events.on(ClientLoadEvent, e => {
    try{
        registerIcons();

        Team.blue.name = "sentinels";
        Team.blue.emoji = Fonts.getUnicodeStr("sentinels");
    }catch(err){
        Log.err("ClientLoadEvent error: " + err);
    }
});
