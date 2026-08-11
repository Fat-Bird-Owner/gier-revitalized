Events.on(ClientLoadEvent, () => {
try {

Blocks.basaltVent.attributes.set(Attribute.get("geothermal-source"), 1/9);
Blocks.stoneVent.attributes.set(Attribute.get("geothermal-source"), 1/9);
Block.hotRock.attributes.set(Attribute.get("geothermal-source"), 0.5);

} catch(e){

}});
