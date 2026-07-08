const blocks = [
"gr-primary-cartridge"
];

const copyBlock = "gr-fundamental-cartridge"

Events.on(ClientLoadEvent , () => {
try {

for (let i = 0; i < blocks.length; i++){
const assembler = Vars.content.block(blocks[i])

const blockCopy = Vars.content.block(copyBlock)
  
for (let i in blockCopy){
if (i == "buildVisibility" || i == "name" || i == "research") continue;
try {
assembler[i] = blockCopy[i];
} catch(e){}
}

assembler.tier = i + 1;
  
}
  
} catch(e){
Vars.ui.showText("Cartridges", e); 
}});
