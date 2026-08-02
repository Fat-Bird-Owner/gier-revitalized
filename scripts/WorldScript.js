Events.on(BlockDestroyEvent, e => {
try {
const tile = e.tile
if (!Vars.state.isPlaying()) return;
if (tile.block() != Vars.content.block("gr-world-script") || tile.team == Team.derelict) return;

const string = tile.build.message.toString();
let error = ""

try { 

let illegal = false
  
if (
string.indexOf("planet") != -1 || 
string.indexOf("extend") != -1 || 
string.indexOf("shown") != -1 || 
string.indexOf("control") != -1 ||
string.indexOf("Core") != -1 ||
string.indexOf("saves") != -1 ||
string.indexOf("setting") != -1 ||
string.indexOf("eval") != -1
) {
error = "Illegal use of scripts detected"
illegal = true;
}
  
if (!illegal) { (new Function(string))() }
  
} catch(err) { 
error = "[red]Error:[] " + err 
}

if (error != "") Vars.ui.showErrorMessage(error);
  
} catch(e){
Vars.ui.showErrorMessage(e)  
}});
