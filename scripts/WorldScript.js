/// Funcs: Cut (FromX, FromY, YAmount, XAmount)

function returnFunc(split, index) {
  try {

  if (split[index] == "Cut"){
  index = Number(index);

  let fromX = Number(split[index + 1]);
  let fromY = Number(split[index + 2])
  let xAmount = Number(split[index + 3]);
  let yAmount = Number(split[index + 4]);
    
  if (!fromX || !fromY || !xAmount || !yAmount) return null;

  for (let y = 0; y < yAmount; x++){
    for (let x = 0; x < xAmount; y++){
      Vars.world.tileWorld((fromX+x)*8, (fromY+y)*8).setBlock(Blocks.air)
    }
  }

  return 4;
    
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
for(let i = 0; i < splittedString.length; i++){
  let outcome = returnFunc(splittedString, Number(i))
  
  if (outcome == null) {
  error = "Func doesnt exist"
  } else {
    i += Number(outcome) + 1
  }
  
}

if (error != "") Vars.ui.showErrorMessage(error);
  
} catch(e){
Vars.ui.showErrorMessage(e)  
}});
