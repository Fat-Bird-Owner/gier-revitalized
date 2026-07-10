Events.on(ClientLoadEvent, () => {
try {

const sec = Planets.gier.sectors.get(0);
/*
if (sec.info.attempts < 15) {
sec.preset.difficulty = Mathf.clamp(sec.info.wave / 2.5, 10, 1);
return;
}
*/
  
if (sec.info.attempts >= 15) sec.preset.difficulty = SectorDifficulty.unreasonable;
  
} catch(e){
Vars.ui.showInfoToast(e,5);  
}});
