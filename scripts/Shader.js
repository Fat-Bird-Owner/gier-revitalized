let g 

try {

g = new Shaders.SurfaceShader("test-water");

} catch(e){}

if (g != null){

let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(0, newLay)

Events.on(ClientLoadEvent, () => {
try {

if (Core.settings.getBool("water-shader") == true){ 
Blocks.water.cacheLayer = newLay;
Blocks.deepwater.cacheLayer = newLay;
Blocks.sandWater.cacheLayer = newLay;
Blocks.taintedWater.cacheLayer = newLay;
Blocks.darksandWater.cacheLayer = newLay;
Blocks.deepTainedWater.cacheLayer = newLay;
Blocks.darksandTaintedWater.cacheLayer = newLay;
}
  
} catch(e){
log(e)
}});

}
