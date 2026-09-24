function worldGenerator(seed, fallOff, scale, octawaves, min){
let seed = seed;
let fallOff = fallOff;
let scale = scale;
let octawaves = octawaves;
let min = min;

// Sets seeds
this.setSeed = function(value){
seed = value;
}

// Set scale
this.setScale = function(value){
scale = value;
}


// Noise stuff
this.simplexNoise = function(x, y){
let depth = Simplex.noise2d(
seed,
octawaves,
fallOff,
1/scale,
x,
y
)

return depth;
};

// Preset for walls
this.noiseTerrian = function(onBlock, offBlock, x, y, minf){
let depth = this.simplexNoise(x, y)
if (depth >= minf) Vars.world.tile(x, y).setBlock(onBlock);
else Vars.world.tile(x, y).setBlock(offBlock);
}

// Preset for floors
this.noiseFloor = function(onFloor, offFloor, x, y, minf){
let depth = this.simplexNoise(x, y)
if (depth >= minf) Vars.world.tile(x, y).setFloor(onFloor);
else Vars.world.tile(x, y).setFloor(offFloor);
}

// Presets for mainly ores. median doesn't do anything yet
this.noiseOverlay = function(onFloor, offFloor, x, y, minf, clear, median){
let depth = this.simplexNoise(x, y)

if (depth >= minf && Vars.world.tile(x, y).floor() != Blocks.empty) Vars.world.tile(x, y).setOverlay(onFloor);
else if (clear) Vars.world.tile(x, y).setOverlay(offFloor);
}

// Overrides floor and walls with another
this.noiseBiome = function(floor, wall, x, y, minf){
let depth = this.simplexNoise(x, y)

if (depth >= minf && Vars.world.tile(x, y).floor() != Blocks.empty){Vars.world.tile(x, y).setFloor(floor);
if (Vars.world.tile(x, y).block() instanceof StaticWall) {
Vars.world.tile(x, y).setBlock(wall);
}}}

}

Events.on(PlayEvent, () => {
try {
if (Vars.state.planet == Vars.content.planet("gr-gier") && !Vars.state.isEditor() && Vars.state.sector == Vars.content.planet("gr-gier").sectors.get(0)) {
let date = new Date();
let seed = (date.getDate()) + ((date.getMonth() + 1)*100) + ((date.getYear())*10000)
let wg = new worldGenerator(seed, 0.5, 150, 8, 5);
let width = Vars.world.width();
let height = Vars.world.height();

let val = 1;
let x = null;
let y = null;

for (let w = 0; w < width; w++){
for (let h = 0; h < height; h++){
wg.noiseTerrian(Blocks.duneWall, Blocks.air, w, h, 0.64)
wg.noiseFloor(Blocks.stone, Blocks.empty, w, h, 0.55)

if (wg.simplexNoise(w, h) <= val && wg.simplexNoise(w, h) >= 0.59){
if (Vars.world.tile(w, h).floor() == Blocks.empty) continue;
if (w <= width/3 || w >= width*0.66|| h <= width/3 || h >= width*0.66) continue;
val = wg.simplexNoise(w, h);
x = w;
y = h;
}

wg.setSeed(seed+1)
wg.setScale(65)
wg.noiseOverlay(Blocks.oreCopper, Blocks.air, w, h, 0.75, true, true)


wg.setSeed(seed+11)
wg.setScale(55)
wg.noiseOverlay(Blocks.oreLead, Blocks.air, w, h, 0.75, false, true,)

wg.setSeed(seed+22)
wg.setScale(64)
wg.noiseOverlay(Blocks.oreBeryllium, Blocks.air, w, h, 0.765, false, true)

wg.setSeed(seed+12)
wg.setScale(66)
wg.noiseOverlay(Blocks.oreTitanium, Blocks.air, w, h, 0.765, false, true)

wg.setSeed(seed+17)
wg.setScale(68)
wg.noiseOverlay(Vars.content.block("gr-depleted-thorium-ore"), Blocks.air, w, h, 0.8, false, true)

wg.setSeed(seed+12)
wg.setScale(66)
wg.noiseBiome(Blocks.carbonStone, Blocks.carbonWall, w, h, 0.6, true)

wg.setSeed(seed+22)
wg.setScale(64)
wg.noiseBiome(Blocks.beryllicStone, Blocks.beryllicStoneWall, w, h, 0.6, true)

wg.setSeed(seed+17)
wg.setScale(68)
wg.noiseBiome(Blocks.dacite, Blocks.daciteWall, w, h, 0.73, true)

wg.setScale(150)
wg.setSeed(seed)

}
}

Vars.world.tile(x, y).setBlock(Vars.content.block("gr-core-satellite"), Team.sharded)

Vars.world.tile(0, height-1).setOverlay(Blocks.spawn)
Vars.world.tile(width-1, 0).setOverlay(Blocks.spawn)
Vars.world.tile(0, 0).setOverlay(Blocks.spawn)
Vars.world.tile(width-1, height-1).setOverlay(Blocks.spawn)

let it = Vars.world.tile(x, y).build.items
it.set(Items.lead, 500);
it.set(Items.copper, 500);
it.set(Items.graphite, 500);
  
}} catch(e){
log(e)
}});
