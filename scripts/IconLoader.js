const textures = [
"gr-techtree-kela",
"gr-gier",
"gr-copper-fort",
"gr-mass-launcher-base"
]

Events.on(AtlasPackEvent, () => {
try {

let code = 0xE000;
	
for (let i = 0; i < textures.length; i++){
let texture = Core.atlas.find(textures[i]);
	
if (!texture) {
Log.err("Cant find[accent] " + textures[i] + " might not exist (Yet)");
continue;
}

Fonts.registerIcon(textures[i], texture.name, code + i, texture)
	
}
	
} catch(e){
Log.err("AtlasPackEvent - " + e)
}});
