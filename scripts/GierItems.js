const items = [
"copper",
"lead",
"graphite",
"silicon",
"metaglass",
"titanium",
"beryllium",
"oxide",
"surge-alloy",
"plastanium",
"thorium",
"phase-fabric",
"carbide",
"sand",
"coal",
"gr-depleted-thorium"
];

Events.on(ContentInitEvent, () => {
try {

let lastItem = Vars.content.statusEffect("gr-gier").techNode;
  
for (let i = 0; i < items.length; i++){
const item = Vars.content.item(items[i]);
item.shownPlanets.add(Planets.gier);
item.shownPlanets.add(Vars.content.planet("gr-kela"));
item.databaseTabs = item.shownPlanets;

let node = new TechTree.TechNode(lastItem , item, ItemStack.empty);
if (!lastItem.content.hardness || item.hardness > lastItem.content.hardness) lastItem = item.techNode;
  
}
  
} catch(e){
Vars.ui.showText("GierItems Issue", e);
}});
