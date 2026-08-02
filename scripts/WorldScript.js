Events.on(BlockDestroyEvent, e => {
try {
const tile = e.tile
if (!Vars.state.isPlaying()) return;
if (tile.block() != Vars.content.block("gr-world-script") || tile.team == Team.derelict) return;

const string = tile.build.message.toString();
let error = "[grey]No Errors"

try { 

let illegal = false
  
if (
string.indexOf("planet") != -1 || 
string.indexOf("extend") != -1 || 
string.indexOf("shown") != -1 || 
string.indexOf("control") != -1
) {
error = "[red]Illegal use of scripts"
illegal = true;
}
  
if (!illegal) { (new Function(string))() }
  
} catch(err) { 
error = "[red]Error:[] " + err 
}

Vars.ui.showErrorMessage(error);
  
} catch(e){
Vars.ui.showErrorMessage(e)  
}});
