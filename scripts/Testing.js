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
