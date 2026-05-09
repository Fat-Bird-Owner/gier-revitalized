function transcript(base, ref, prop){
try{

if(prop === ""){
for(let k in ref){
try{
base[k] = ref[k];
}catch(e){}
}
return;
}

if(Array.isArray(prop)){
for(let i = 0; i < prop.length; i++){
const key = prop[i];
base[key] = ref[key];
}
return;
}

base[prop] = ref[prop];

}catch(e){
Vars.ui.showText("Transcript Error", e);
}
}

module.exports = transcript;
