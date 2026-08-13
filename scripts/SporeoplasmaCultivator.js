function spreadSporeoplasm(tile, radius){
    try {

        let block = Vars.content.block("gr-sporeoplasma")
        let item = Vars.content.item("gr-depleted-thorium")

        // Bias the random offset toward the center
        let x = Mathf.round((Mathf.random() * 2 - 1) * radius)
        let y = Mathf.round((Mathf.random() * 2 - 1) * radius)

        // Square the values to make the distribution center-heavy
        x = Mathf.round(x * Math.abs(x) / radius) * 8
        y = Mathf.round(y * Math.abs(y) / radius) * 8

        let newTile = Vars.world.tileWorld(tile.getX() + x, tile.getY() + y)

        if (newTile != null && newTile.build == null && !newTile.solid()){
            newTile.setBlock(block, Team.get(4))

            if (newTile.overlay().itemDrop == item){
            newTile.setOverlay(Blocks.oreCrystalThorium)
            }

        }

    } catch(e) {
        log(e)
    }
}

Events.on(GeneratorPressureExplodeEvent, e => {
try {

if (e.block != Vars.content.block("gr-sporeoplasmic-cultivator")) return;
  
for (let i = 0; i < 15*20; i++) {

spreadSporeoplasm(e.build.tile, 15)

}

} catch(e){
log(e)
}})
