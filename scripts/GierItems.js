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
"carbide"
];

Events.on(ContentInitEvent, () => {
try {

for (let i = 0; i < items.length; i++){
const item = Vars.content.item(items[i]);
item.shownPlanets.add(Planets.gier);
}
  
} catch(e){
Vars.ui.showText("GierItems Issue", e);
}});
