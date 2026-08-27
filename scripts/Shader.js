let index = 0;

function loadShader(string){

let g 
try {
  
g = new Shaders.SurfaceShader(string);
  
} catch(e){
Log.err(e);
return null;
}

if (g != null){
  
let newLay = new CacheLayer.ShaderLayer(g)
CacheLayer.add(0, newLay)
  
Log.info("[accent]" + string + " shader[] loaded");
return newLay;
  
} else{
return null;
}}

let waterTest = loadShader("test-water");
let heatedOil = loadShader("oil-tile");

Events.on(ClientLoadEvent, () => {
try {

if (heatedOil != null) Vars.content.block("gr-oil-tile").cacheLayer = heatedOil;
  
} catch(e){
log(e)
}});
