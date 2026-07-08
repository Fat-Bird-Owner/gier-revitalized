Events.on(ClientLoadEvent, () => {
try {

const sec = Planets.gier.sectors.get(0)
if (sec.info.attempts < 10) return;

sec.preset.difficulty = SectorDifficulty.unreasonable;
  
} catch(e){
Vars.ui.showInfoToast(e,5);  
}});
