let g 

try {

g = new Shaders.SurfaceShader("test-water");

} catch(e){}

if (g != null){

let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(newLay)

Events.on(ClientLoadEvent, () => {
try {

if (Core.settings.getBool("command-block-texture") == true){ 
Blocks.water.cacheLayer = newLay;
Blocks.deepwater.cacheLayer = newLay;
}
  
} catch(e){
log(e)
}});

}
