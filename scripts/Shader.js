let index = 0;

function loadSurfaceShader(string){
try {
  
let s = new Shaders.SurfaceShader(string);
return s;
  
} catch(e){
Log.err(e);
return null;
}}

function loadShader(string, index){

let g 
try {
  
g = new Shaders.SurfaceShader(string);
  
} catch(e){
Log.err(e);
return null;
}

if (g != null){
  
let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(index, newLay)
  
Log.info("[accent]" + string + " shader[] loaded");
return newLay;
  
} else{
return null;
}}

let waterTest = loadShader("test-water", 0);
let heatedOil = loadShader("oil-tile", 0);
let moltenSlag = loadSurfaceShader("molten-slag");
//let exogenTile = loadShader("exogen-tile", 8);

Events.on(ClientLoadEvent, () => {
try {

if (waterTest != null && Core.settings.getBool("water-shader") == true){ 
Blocks.water.cacheLayer = waterTest;
Blocks.deepwater.cacheLayer = waterTest;
Blocks.sandWater.cacheLayer = waterTest;
Blocks.taintedWater.cacheLayer = waterTest;
Blocks.darksandWater.cacheLayer = waterTest;
Blocks.deepTaintedWater.cacheLayer = waterTest;
Blocks.darksandTaintedWater.cacheLayer = waterTest;
//if (moltenSlag != null) Blocks.slag.cacheLayer = moltenSlag;
}
  
if (heatedOil != null) Vars.content.block("gr-oil-tile").cacheLayer = heatedOil;
//if (exogenTile != null) Vars.content.block("gr-reinforced-exogen-tile").cacheLayer = exogenTile;
  
} catch(e){
log(e)
}});

let failSave = false;
Events.run(Trigger.draw, () => {
    try {
      
Draw.drawRange(
    71,
    () => Draw.shader(moltenSlag, true),
    () => Draw.shader()
);
      
    } catch(e) {
        Log.err("layer shader - " + e);
    }
});
