/// Funcs: Cut (FromX, FromY, YAmount, XAmount)

function returnFunc(split, index) {
  try {

  if (split[index] == "Cut"){
  let fromX = split[index++]
  let fromY = split[index+2]
  let xAmount = split[index+3]
  let yAmount = split[index+4]
    
  if (!fromX || !fromY || !xAmount || !yAmount) return null;

  for (let y = 0; y < yAmount; i++){
    for (let x = 0; x < xAmount; i++){
      Vars.world.tileWorld((fromX+x)*8, (fromY+y)*8).setBlock(Blocks.air)
    }
  }
  
  }

  return null;
    
  } catch(e) {
    return null;
  }
}

Events.on(BlockDestroyEvent, e => {
try {
const tile = e.tile
if (!Vars.state.isPlaying()) return;
if (tile.block() != Vars.content.block("gr-world-script") || tile.team == Team.derelict) return;

const string = tile.build.message.toString();
let error = ""

let splittedString = string.split(" ");
for (let i in splittedString) {
  let outcome = returnFunc(splittedString, i)
  
  if (outcome == null) {
  error = "Func doesnt exist"
  }
  
}

if (error != "") Vars.ui.showErrorMessage(error);
  
} catch(e){
Vars.ui.showErrorMessage(e)  
}});
