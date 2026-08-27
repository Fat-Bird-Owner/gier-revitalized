let g 

try {

g = new Shaders.SurfaceShader("test-water");

} catch(e){}

if (g != null){

let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(newLay)

Events.on(ClientLoadEvent, () => {
Blocks.water.cacheLayer = newLay;
Blocks.deepWater.cacheLayer = newLay;
});

}
