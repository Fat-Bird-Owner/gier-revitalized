Events.on(ClientLoadEvent, () => {
try {

Blocks.basaltVent.attributes.set(Attribute.get("geothermal-source"), 1/2);
Blocks.stoneVent.attributes.set(Attribute.get("geothermal-source"), 1/2);
  
Blocks.hotrock.attributes.set(Attribute.get("geothermal-source"), 0.5);
Blocks.magmarock.attributes.set(Attribute.get("geothermal-source"), 0.75);

Blocks.carbonWall.attributes.set(Attribute.get("carbon"), 1);
Blocks.stoneWall.attributes.set(Attribute.get("beryllium"), 0.5);
  
} catch(e){

}});
