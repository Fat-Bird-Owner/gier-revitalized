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

dialogB.cont.add(kills).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9)
dialogB.cont.row()

let built = addTab(builtCount + gameStats.buildingsBuilt)

dialogB.cont.add(built).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9)
dialogB.cont.row()

let wavel = addTab(wavesLasted + gameStats.wavesLasted)

dialogB.cont.add(wavel).size(Core.graphics.getWidth()/3, Core.graphics.getHeight()/9)
dialogB.cont.row()

if (Vars.state.sector) Vars.state.sector.save = null;

Vars.ui.restart.hide();

dialogB.show();
Sounds.blockBreak3.play()

Time.runTask(3 * 60, () => {
try {

let image = new Image(Core.atlas.find("gr-rank-f"))

outerStack.add(image)

image.addAction(Actions.moveBy(
0,
Core.graphics.getWidth()/-17.5,
0.1/2,
Interp.smooth
))

image.addAction(Actions.scaleTo(0.6, 0.6, 0.05))

image.addAction(Actions.moveBy(Core.graphics.getWidth()/17.5, 0, 1, Interp.sineOut))

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
