Events.on(ClientLoadEvent, () => {
try {

Blocks.basaltVent.attributes.set(Attribute.get("geothermal-source"), 1/12.5);
Blocks.stoneVent.attributes.set(Attribute.get("geothermal-source"), 1/12.5);
  
Blocks.hotRock.attributes.set(Attribute.get("geothermal-source"), 0.5);
Blocks.magmaRock.attributes.set(Attribute.get("geothermal-source"), 0.75);
  
} catch(e){

}});
