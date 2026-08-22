const extraIcons = new ObjectMap();

function load(){
try {
  
Log.info("Loading icons");
addIcon("gier", "gr-gier");

} catch(e){
Log.err(e)
}}

function addIcon(iconName, regionName){
try {
  
extraIcons.put(iconName, regionName);

} catch(e){
Log.err(e)
}}

function packIcons(){
    try {
        var page = UI.packer.getPages().first();
        var teams = Seq.with(Team.all);

        extraIcons.each(function(entry){
            var region = Core.atlas.find(entry.value);

            if(!region.found()){
                Log.warn("Could not find icon region: \"" + entry.value + "\"");
                return;
            }

            page.setDirty(false);

            var pixmapRegion = Core.atlas.getPixmap(region);

            var rect = UI.packer.pack(
                region.name,
                pixmapRegion,
                region.splits,
                region.pads
            );

            region.texture = page.getTexture();
            region.set(
                Mathf.int(rect.x),
                Mathf.int(rect.y),
                Mathf.int(rect.width),
                Mathf.int(rect.height)
            );

            Core.atlas.getTextures().add(region.texture);

            Log.info("Added " + entry.key + " (" + entry.value + ") to the pack");

            region.pixmapRegion = null;
        });

        page.setDirty(true);
        page.updateTexture(
            TextureFilter.linear,
            TextureFilter.linear,
            false
        );

    } catch(e) {
        Log.err(e);
    }
}

function registerIcons(){
try {
  
    var ch = 0xE001;

    extraIcons.each(function(entry){
        Fonts.registerIcon(
            entry.key,
            entry.value,
            ch++,
            Core.atlas.find(entry.value)
        );
    });

} catch (e) {
Log.err(e)
}}

Events.on(AtlasPackEvent, () => {
try {

    load();
    packIcons();

} catch(e){
Log.err("AtlasPack - " + e)
}});

Events.on(ClientLoadEvent, () => {
try {
  
	  registerIcons();

} catch(e){
Log.err("Register - " + e)
}});
