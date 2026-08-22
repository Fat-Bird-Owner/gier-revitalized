function scatterBlocks(block, x, y, radius, amount){
    try{
        for(let i = 0; i < amount; i++){
            const t = Mathf.random();
            const r = radius * t * t;
            const angle = Mathf.random(0, Mathf.PI2);

            const px = x + Mathf.cos(angle) * r;
            const py = y + Mathf.sin(angle) * r;

            const tile = Vars.world.tileWorld(px, py);

            if(tile == null || tile.block() != Blocks.air)
                continue;

            tile.setBlock(block, Team.get(4));

            if(tile.overlay() && tile.overlay().itemDrop == Vars.content.item("gr-depleted-thorium")){
                tile.setOverlay(Blocks.oreCrystalThorium);
            }
        }
    }catch(err){
        log("scatterBlocks error: " + err);
    }
}


Events.on(GeneratorPressureExplodeEvent, event => {
    try{
      
        const build = event.build;

        if(build == null || build.block != Vars.content.block("gr-sporeoplasmic-cultivator")) return;

        scatterBlocks(
            Vars.content.block(Vars.content.block("gr-sporeoplasma")),
            build.x,
            build.y,
            80,
            100
        );
      
    }catch(err){
        log("GeneratorPressureExplodeEvent error: " + err);
    }
});
