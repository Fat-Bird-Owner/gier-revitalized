const blocks = [
"primary-cartridge"
];

const copyBlock = "fundamental-cartridge"

Events.on(ModContentLoadEvent , () => {
try {

for (let i = 0; i < blocks.length; i++){
const assembler = new UnitAssembler(blocks[i])

const blockCopy = Vars.content.block(copyBlock)
  
for (let i in blockCopy){
assembler[i] = blockCopy[i];
}

assembler.tier = i + 1;
  
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
