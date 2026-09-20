Events.on(ClientLoadEvent, () => {
try { 

let dialog = new BaseDialog("Files");
dialog.addCloseButton()

function getPlanet(){
if (Vars.ui.research.isShown()) return Vars.ui.research.lastNode.planet
return Vars.ui.planet.isShown() ? Vars.ui.planet.state.planet : Vars.state.rules.planet
}

function canUnlock(node){

for (let i = 0; i < node.requirements.length; i++){
   if (node.finishedRequirements[i].amount < node.requirements[i].amount) return false;
}

node.content.unlock()

}

function rebuild(){

dialog.cont.clear()

let planet = getPlanet()
if (!planet.techTree) return;
  
function getResearchItems() { 

let items = new ItemSeq();

        planet.sectors.each(sector => {
        if (sector.hasBase() && !sector.isFrozen()) {
            sector.items().each((item, amount) => {
                items.add(item, Math.max(amount, 0));
                
            });
        }

})

return items;
}

dialog.cont.pane(p => {

p.clear()

let display = new ItemsDisplay()
display.rebuild(getResearchItems())
p.add(display).row()

planet.techTree.each(n => {

let table = new Table();
let image = new Image(n.content.uiIcon);
image.setScaling(Scaling.fit)

let typeImg = n.content instanceof Block ? Icon.effect : n.content instanceof UnitType ? Icon.units : Icon.sitemap

let research = new Button()
research.add( new Image(Icon.tree) )

table.background(Tex.whiteui)
table.setColor(Pal.darkerGray)

let bool = (!n.parent || n.parent.content.unlocked())
if (bool) {

table.add(new Image(typeImg)).pad(150)
table.add(image).pad(20)
table.add(n.content.localizedName).pad(20);
table.add(research).size(50).padRight(350)

if (!n.content.unlocked()) {
image.setColor(Pal.gray)
table.setColor(Pal.darkestGray)
}

research.clicked(() => {
try {

canUnlock(n)

if (!n.content.unlocked()){

let research = new BaseDialog("@item")
research.addCloseButton()

research.cont.pane(p => {

let display = new ItemsDisplay()
display.rebuild(getResearchItems())
p.add(display).row()

for (let i = 0; i < n.requirements.length; i++){
let table = new Table();
let itemR = n.requirements[i].item;
let amount = n.requirements[i].amount;
let label = new Label(
"[grey](" + String(n.finishedRequirements[i].amount) + ")"
)

let add = new Button()
add.add(new Image(Icon.add))

let index = i;

table.add(new Image(itemR.uiIcon))
table.add(itemR.localizedName)
table.add(String(amount)).pad(25)
table.add(label).padRight(25)
if (amount > n.finishedRequirements[i].amount) table.add(add)

add.clicked(() => {
try {

planet.sectors.each(sector => {

   let am = sector.items().get(itemR)
   if (n.finishedRequirements[index].amount >= amount) return;
   if (am > 0){
     let reduction = am - amount
     let reductTo = Mathf.clamp(reduction, 0 , reduction)

       log(sector == Vars.state.sector)
       if (sector == Vars.state.sector) Vars.state.rules.defaultTeam.items().set(itemR, reductTo)
       sector.info.items.set(itemR, reductTo)
       sector.info.update()

       display.rebuild(getResearchItems())
       n.finishedRequirements[index].amount += Mathf.clamp(am, 0 , amount-n.finishedRequirements[index].amount);

       label.setText(
       "[grey](" + String(n.finishedRequirements[index].amount) + ")"
       )
   
     canUnlock(n)
     rebuild();
     if (n.finishedRequirements[index].amount >= amount) add.remove()
     if (reduction >= 0) return;
   }

})

} catch(e){
log(e)
}})

table.background(Tex.whiteui)
table.setColor(Pal.darkerGray)
p.add(table).pad(5).grow().row();
}

}).grow();

research.show()
return;
}

Vars.ui.content.show(n.content)

} catch(e) {
log(e)
}})

} else {

table.setColor(Pal.darkestestGray) 
table.add(new Image(Icon.tree))

}

p.add(table).pad(5).size(0, 150).growX().row()
})

}).grow();

}

Vars.ui.research.update(() => {
if (!Core.settings.getBool("research-custom")) return;
if (!Vars.ui.research.isShown()) return;
if (Vars.ui.research.lastNode != Vars.content.planet("gr-gier").techTree) return;

rebuild();
dialog.show()
Time.runTask(1, () => Vars.ui.research.hide())

})

} catch(e){
log(e)
}});
