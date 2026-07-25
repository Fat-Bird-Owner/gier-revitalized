Events.on(ClientLoadEvent, () => {
try {

const gierWannabe = Vars.content.planet("gr-gier")
const actualRealGier = Planets.gier;

for (let i in actualRealGier){
try {
if (i == "sectors") continue;
gierWannabe[i] = actualRealGier[i];

} catch(e){}
}

gierWannabe.alwaysUnlocked = true;
gierWannabe.visible = true;

} catch(e){
Vars.ui.showText("gier-gier", e);
}});
