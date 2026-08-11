Events.on(ClientLoadEvent, () => {
try {

Blocks.basaltVent.attributes.set(Attribute.get("geothermal-source"), 1/5);
Blocks.stoneVent.attributes.set(Attribute.get("geothermal-source"), 1/5);
  
Block.hotRock.attributes.set(Attribute.get("geothermal-source"), 0.5);
Block.magmaRock.attributes.set(Attribute.get("geothermal-source"), 0.75);
  
} catch(e){

}});
