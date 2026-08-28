var lastUnit = "";
var lastCommand = "";

Events.on(EventType.TapEvent, e => {
    try {
        if (!e || !e.tile || !e.player || !e.player.team()) return;

        const tile = e.tile;
        const player = e.player;

        if (!tile.block() || player.selectedBlock != null) return;

        const block = tile.block();
        const build = tile.build;

        if (!build) return;
        const buildTeam = build.team;

        const target = Vars.content.block("gr-command-block");

        if (block != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showMenu(
            Core.bundle.format("commandblock.title"),
            Core.bundle.format("commandblock.description"),
            [
                [Core.bundle.format("commandblock.commands.clear-units")],
                [Core.bundle.format("commandblock.commands.stop-player")],
                [Core.bundle.format("commandblock.commands.change-team")],
                [Core.bundle.format("commandblock.commands.toggle-cancanover")],
                [Core.bundle.format("commandblock.commands.toggle-editor")],
                [Core.bundle.format("commandblock.commands.toggle-disable-unitcap")],
                [Core.bundle.format("commandblock.commands.spawn-unit")],
                [Core.bundle.format("commandblock.commands.get-current-unit")],
                [Core.bundle.format("commandblock.commands.unit-library")],
                [Core.bundle.format("commandblock.commands.fill-core")],
                [Core.bundle.format("commandblock.commands.run-javascript")],
                [Core.bundle.format("close")]
            ],
            i => {

                if (i == 0) {

                    Sounds.uiButton.play();
                    Groups.unit.clear();
                    Vars.ui.hudfrag.showToast(Icon.tree, Core.bundle.format("commandblock.showtoast.clear-units"));

                } else if (i == 1) {
                    try {

                        Sounds.uiButton.play();

                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Player does not exist.");
                            return;
                        }
                        const unit = p.unit();
                        if (!unit) {
                            Vars.ui.hudfrag.showToast(Icon.tree, "[grey]No unit found");
                            return;
                        }

                        unit.apply(StatusEffects.unmoving, 9999 * 60);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Stopped player unit");

                    } catch (err) {
                        Vars.ui.showInfoToast("err: " + err, 5);
                    }

                } else if (i == 2) {
                    try {

                        Vars.ui.showTextInput(Core.bundle.format("commandblock.commands.change-team"), Core.bundle.format("commandblock.showtoast.change-team-1"), 100, lastUnit, true, text => {
                        try{

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.showInfoToast(Core.bundle.format("commandblock.showtoast.change-team-2"), 3);
                            return;
                        }

                        const currentTeam = p.team();
                        const newTeam = Team.get(text);

                        p.team(newTeam);
                        Vars.ui.hudfrag.showToast(Icon.tree, Core.bundle.format("commandblock.showtoast.change-team-3"));

                        } catch(e){
                        Vars.ui.showInfoToast(e,10);
                        }});

                    } catch (err) {
                        Vars.ui.showInfoToast(String(err), 15);
                    }} else if (i == 3){
                        try{

                    Sounds.uiButton.play();
                    const gameOver = Vars.state.rules.canGameOver;
                    Vars.state.rules.canGameOver = !gameOver;

                    Vars.ui.hudfrag.showToast(Icon.tree, Core.bundle.format("commandblock.showtoast.toggle-cancanover") + "[lightgrey]" + !gameOver);
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);    
                    }} else if (i == 4){
                        try {

                    const editor = Vars.state.rules.editor;
                    Vars.state.rules.editor = !editor;

                    Vars.ui.hudfrag.showToast(Icon.tree, Core.bundle.format("commandblock.showtoast.toggle-editor") + "[lightgrey]" + !editor);
                             
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);  
                    }} else if (i == 5){
                        try{

                    Sounds.uiButton.play();
                    const disableUnitCap = Vars.state.rules.disableUnitCap;
                    Vars.state.rules.disableUnitCap = !disableUnitCap;

                    Vars.ui.hudfrag.showToast(Icon.tree, Core.bundle.format("commandblock.showtoast.toggle-disable-unitcap") + "[lightgrey]" + !disableUnitCap);
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if (i == 6){
                        try{

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput(Core.bundle.format("commandblock.commands.spawn-unit"), Core.bundle.format("commandblock.showtoast.spawn-unit-1"), 100, lastUnit, false, text => {
                        try{
                    lastUnit = text;
                    const unit = Vars.content.getByName(ContentType.unit, text);

                    if (unit == null){
                    Vars.ui.hudfrag.showToast(Icon.chat, Core.bundle.format("commandblock.showtoast.spawn-unit-2"));
                    return;
                    }
                        
                    unit.spawn(buildTeam,build.x,build.y,90);
                    Sounds.waveSpawn.at(build.x,build.y);
                    Fx.spawn.at(build.x,build.y);
                            
                    Vars.ui.hudfrag.showToast(Icon.chat, Core.bundle.format("commandblock.showtoast.spawn-unit-3") + unit.localizedName);

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }});

                            

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if (i == 7){
                        try{

                    Sounds.uiButton.play();
                    const unit = Vars.player.unit();
                    if (!unit) return;
                    const type = unit.type.name;
                    lastUnit = type;
                    Vars.ui.hudfrag.showToast(Icon.eye, Core.bundle.format("commandblock.showtoast.get-current-unit"));
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if(i == 8){
                    try{

                    Sounds.uiButton.play();
                    var units = [];
                        
                   Object.keys(UnitTypes).forEach(unit => {
                    try{
                    if (unit != null || unit != "load"){
                    units.push(unit);
                    }} catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }});

                    Vars.ui.showStartupInfo(units.join(" "));
                    
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if(i == 9){

                    Sounds.uiButton.play();
                    let core = Vars.player.core();
                    let amount = 0;
                    
                    Vars.content.items().each(item => {
                    try{
                        
                    core.items.set(item, core.storageCapacity);
                    amount++;
                    } catch(e){
                    Vars.ui.showInfoToast(e,15);
                    }});

                    Vars.ui.hudfrag.showToast(Icon.effect, Core.bundle.format("commandblock.showtoast.fill-core-1") + amount + Core.bundle.format("commandblock.showtoast.fill-core-2"));
                    
                    } else if (i == 10){
                    try{

                    if (!player.admin){
                    Vars.ui.showInfoToast(Core.bundle.format("commandblock.showtoast.run-javascript-4"), 5);
                    return;
                    }

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput("<" + Core.bundle.format("commandblock.commands.run-javascript") + ">", Core.bundle.format("commandblock.showtoast.run-javascript-1"), 100, lastCommand, false, text => {
                    try{      

                    const error = Core.bundle.format("commandblock.showtoast.run-javascript-2");
                    lastCommand = text;
                    try { (new Function(text))(); } catch(e) { Vars.ui.showText(error, e); }
                    
                    Sounds.waveSpawn.play();
                    Vars.ui.hudfrag.showToast(Icon.chat, Core.bundle.format("commandblock.showtoast.run-javascript-3") + text);
                    
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }});
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);       
                    }}
            }
        );

    } catch (err) {
        Vars.ui.showInfoToast(String(err), 5);
    }
});




Events.on(BlockInfoEvent, () => {
try{

const block = Vars.content.block("gr-command-block");
const cont = Vars.ui.content.cont;

if (Vars.player.selectedBlock != block) return;

cont.row()
cont.add(Core.bundle.format("commandblock.info.title") + "[lightgrey]").left().row();
cont.add().height(3).row()
cont.image().color(Pal.accent).height(3).width(400).left().row();

cont.add(Core.bundle.format("commandblock.info.clear-units")).left().row();
cont.add(Core.bundle.format("commandblock.info.stop-player")).left().row();
cont.add(Core.bundle.format("commandblock.info.change-team")).left().row();
cont.add(Core.bundle.format("commandblock.info.toggle-cancanover")).left().row();
cont.add(Core.bundle.format("commandblock.info.toggle-editor")).left().row();
cont.add(Core.bundle.format("commandblock.info.toggle-disable-unitcap")).left().row();
cont.add(Core.bundle.format("commandblock.info.spawn-unit")).left().row();
cont.add(Core.bundle.format("commandblock.info.get-current-unit")).left().row();
cont.add(Core.bundle.format("commandblock.info.unit-library")).left().row();
cont.add(Core.bundle.format("commandblock.info.fill-core")).left().row();
cont.add(Core.bundle.format("commandblock.info.run-javascript")).left().row();
        
} catch(e){
Vars.ui.showText("vruh",e);    
}});
