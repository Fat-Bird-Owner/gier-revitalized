let g 

try {

g = new Shaders.SurfaceShader("test-water");

} catch(e){}

if (g != null){

let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(1, newLay)

Events.on(ClientLoadEvent, () => {
try {

if (Core.settings.getBool("water-shader") == true){ 
Blocks.sand.cacheLayer = newLay;
}
  
} catch(e){
log(e)
}});

}
