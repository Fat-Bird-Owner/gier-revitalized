const pastes = [
{
from: "gr-export-silo",
to: "gr-landing-silo"
}
]

Events.on(ClientLoadEvent, () => {
try {

for (let i = 0; i < pastes.length; i++){
let {from, to} = pastes[i]

from = Vars.content.blocks(from)
to = Vars.content.blocks(to)

to.region = from.region;
to.customShadowRegion = from.customShadowRegion;
to.uiIcon = from.uiIcon;

if (to instanceof LandingPad) to.podRegion = from.podRegion
  
}
  
} catch(e){
Vars.ui.showErrorMessage(e) 
}});
