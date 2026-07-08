const blocks = [
"primary-cartridge"
];

const copyBlock = "fundamental-cartridge"

Events.on(ModContentLoadEvent , () => {
try {

for (let i = 0; i < blocks.length; i++){
const assembler = Vars.content.block(blocks[i])

const blockCopy = Vars.content.block(copyBlock)
  
for (let i in blockCopy){
if (i == "buildVisibility" || i == "name") continue;
assembler[i] = blockCopy[i];
}

assembler.tier = i + 1;
  
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
