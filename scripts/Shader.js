function loadShader(string){

let g 

try {
  
g = new Shaders.SurfaceShader(string);
  
} catch(e){
return null;
}

if (g != null){
  
let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(0, newLay)
return newLay;
  
} else{
return null;
}}

let waterTest = loadShader("test-water");
let heatedOil = loadShader("heated-oil");

Events.on(ClientLoadEvent, () => {
try {

if (waterTest != null && Core.settings.getBool("water-shader") == true){ 
Blocks.water.cacheLayer = waterTest;
Blocks.deepwater.cacheLayer = waterTest;
Blocks.sandWater.cacheLayer = waterTest;
Blocks.taintedWater.cacheLayer = waterTest;
Blocks.darksandWater.cacheLayer = waterTest;
Blocks.deepTainedWater.cacheLayer = waterTest;
Blocks.darksandTaintedWater.cacheLayer = waterTest;
}

if (heatedOil != null) Vars.content.block("gr-oil-tile").cacheLayer = heatedOil;
  
} catch(e){
log(e)
}});
