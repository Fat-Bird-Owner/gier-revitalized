Events.on(ClientLoadEvent, () => {
try {

const gierWannabe = Vars.content.planet("gr-gier")
const actualRealGier = Planets.gier;

for (let i in actualRealGier){
try {
if (i == "sectors" || i == "grid" || i == "radius" || i == "startSector" || i == "minZoom" || i == "gridMesh" || i == "gridMeshLoader") continue;
gierWannabe[i] = actualRealGier[i];

} catch(e){}
}
    
gierWannabe.alwaysUnlocked = true;
gierWannabe.visible = true;
gierWannabe.accessible = true;
gierWannabe.allowLaunchSchematics  = true;
gierWannabe.allowLaunchLoadout = true;
gierWannabe.prebuildBase = false;
gierWannabe.allowLaunchToNumbered = false;

actualRealGier.techTree.each(node => {

    let content = node.content;

    if(content == null) return;

    let remove = null;

    content.shownPlanets.each(p => {
        if(p.name == "gier"){

            remove = p;

        }
    });

    if(remove != null){

        content.shownPlanets.remove(remove);
        content.databaseTabs.remove(remove);
        
        content.shownPlanets.add(Vars.content.planet("gr-gier"));
        content.databaseTabs.add(Vars.content.planet("gr-gier"));

        if (content instanceof Block) {
        content.envEnabled = -1
        content.buildVisibility = BuildVisibility.shown
        }
    }

})

actualRealGier.techTree.planet = gierWannabe
  
} catch(e){
Vars.ui.showText("gier-gier", e);
}});
