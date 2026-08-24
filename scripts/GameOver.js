function getScore() {
try {

const gameStats =  Vars.state.stats
return Mathf.round(((gameStats.enemyUnitsDestroyed * 2.5) + (gameStats.buildingsBuilt * 1.75)) * (1 + ((gameStats.wavesLasted-1)/10)));
  
} catch(e){
return 0
}}

function getRank() {
try {

const score = getScore();

if (score >= 3000) return "rank-a"
else if (score >= 2500) return "rank-b"
else if (score >= 2000) return "rank-c"
else if (score >= 1500) return "rank-d"
else if (score >= 1000) return "rank-e"
else return "rank-f"
  
} catch(e){
return "rank-f"
}}

function formatTime(seconds){
try {
  
    seconds = Math.floor(seconds);

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    return (
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0")
    );

} catch(e){}
}

Events.on(LoseEvent, () => {
try {

if (Vars.state.planet == Vars.content.planet("gr-gier")) {

let times = 1

let enemyKill = "[accent]Enemy units destroyed: "
let builtCount = "[accent]Buildings built: "
let wavesLasted = "[accent]Waves lasted: "
let gameStats =  Vars.state.stats

let dialogB = new BaseDialog("Summary")
dialogB.addCloseButton();

dialogB.cont.add("[red]Sector Compromised").row()

let img = new Image(Core.atlas.find("gr-gier"))
let outerStack = new Stack()

outerStack.add(img)

dialogB.cont.add(outerStack).size(Core.graphics.getWidth()/7.5).pad(35)
.row()

let text;

try {
    text = Vars.control.saves.getCurrent().getPlayTime();
} catch(e) {
    text = null;
}

if (!text) text = "[grey]null";
  
dialogB.cont.add(new Label(text)).row()
dialogB.cont.add(new Label("[accent]score:[] " + getScore())).row()
  
function addTab(str){

let t = new Table();
t.background(Styles.grayPanelDark);

let id = times
times++

let i = 1
let played = false
let stack = new Stack()
let image = new Image(Tex.whiteui)

image.setColor(Pal.accent)
image.update(() => {
try {

i -= (1.5/60)*(1/(id*1.4))
image.color.a = i

if (i <= 0.2 && played == false) {

played = true
Sounds.blockBreak2.play()

stack.add(lab)

emp.remove()

} else if (i <= 0) image.remove()

} catch(e){
log(e)
}})

let lab = new Label(str)
lab.setAlignment(Align.center)

let emp = new Label("...")
emp.setAlignment(Align.center)

stack.add(emp)
stack.add(image)

t.add(stack).grow()

return t
}

let kills = addTab(enemyKill + gameStats.enemyUnitsDestroyed)

dialogB.cont.add(kills).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9.3)
dialogB.cont.row()

let built = addTab(builtCount + gameStats.buildingsBuilt)

dialogB.cont.add(built).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9.3)
dialogB.cont.row()

let wavel = addTab(wavesLasted + gameStats.wavesLasted)

dialogB.cont.add(wavel).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9.3)
dialogB.cont.row()

if (Vars.state.sector) Vars.state.sector.save = null;

Vars.ui.restart.hide();

dialogB.show();
Sounds.blockBreak3.play()

Time.runTask(3 * 60, () => {
try {

let image = new Image(Core.atlas.find("gr-" + getRank()))

outerStack.add(image)

image.addAction(Actions.moveBy(
0,
Core.graphics.getWidth()/-15,
0.05,
Interp.smooth
))

image.addAction(Actions.scaleTo(0.6, 0.6, 0.05))

image.addAction(Actions.moveBy(Core.graphics.getWidth()/15, 0, 1, Interp.sineOut))

} catch(e) {
log(e)
}})

dialogB.hidden(() => {
try {
Vars.state.gameOver = true
Vars.logic.updateGameOver(Vars.player.team())
log.info("ok")
}catch(e){}});

}
  
} catch(e){
Vars.ui.showErrorMessage(e) 
}});

Events.on(TapEvent, e => {
try {

const {player, tile} = e;
if (!player || !tile) return;
if (tile.block() != Vars.content.block("gr-terminal")) return;
if (tile.team() != player.team()) return;
  
let dialog = new BaseDialog("");
dialog.addCloseButton();

let width = Core.graphics.getWidth()
let height = Core.graphics.getHeight()
  
dialog.cont.pane(p => {

let scoreCheck = new Button()
scoreCheck.add(Core.bundle.get("terminal.score"));

scoreCheck.clicked(() => {

p.clear();
p.add(new Image( Core.atlas.find("gr-gier")).setScaling(Scaling.fit) ).size(((width+height)/2)*0.15).pad(height*0.05).row();
p.add(Core.bundle.get("terminal.ui.score") + getScore()).pad(height*0.05).row();
p.add(Core.bundle.get("terminal.ui.rank") + getRank())

});
  
p.add(scoreCheck).size(width * 0.2, height * 0.15).row();
  
});

dialog.show();
  
} catch(e){
Log.err("GameOver - " + e);
}});
