let g 

try {

g = new Shaders.SurfaceShader("slag");

} catch(e){}

if (g != null){

let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(newLay)

Events.on(ClientLoadEvent, () => {
Blocks.sand.cacheLayer = newLay;
});

}
