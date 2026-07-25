Events.on(ClientLoadEvent, () => {
try {

const gierWannabe = Vars.content.planet("gr-gier")
const actualRealGier = Planets.gier;

for (let i in actualRealGier){
try {
if (i == "sectors" || i == "grid" || i == "radius") continue;
gierWannabe[i] = actualRealGier[i];

} catch(e){}
}

gierWannabe.alwaysUnlocked = true;
gierWannabe.visible = true;
gierWannabe.accessible = true;

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
        content.shownPlanets.add(Vars.content.planet("gr-gier"));

    }

})
  
} catch(e){
Vars.ui.showText("gier-gier", e);
}});
