const blocks = [
    "gr-hulling-rig"
];

Events.on(BlockBuildBeginEvent, event => {
    try {
        const {tile, team, breaking} = event;

        if (!breaking) return;
        log(tile.block())
        
        let valid = false;

        for(let i = 0; i < blocks.length; i++){
            if(tile.block() == Vars.content.block(blocks[i])){
                valid = true;
                break;
            }
        }

        if(!valid) return;

        tile.setBlock(tile.block(), team);

    } catch(e) {
        log(e);
    }
});
