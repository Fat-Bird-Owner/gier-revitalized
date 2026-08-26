try {

function compile(txt){
try {

require(txt)
Log.info("[accent]" + txt + "[] - Loaded in")
  
} catch(e){
Log.err("[red]" + txt + "[] - Failed to compile")
}}
  
// Team changes, showing gier and other stuff
//require("EventRunnable"); Unreliable
compile("Transcripts");
compile("Startup");
compile("Deranged");
compile("WreckFX");
compile("Attributes");
compile("GierItems");
compile("CorruptedFunction");
compile("gier-to-gier");
compile("Pasting");
compile("GameOver");
compile("AttributeVanilla")
compile("effects"); // fancy effects
//require("BreakBlock"); didnt have the needed event type
//require("gierTroll");

//    ### Class Overrides ###
// Subclass: Block
compile("PowerButton"); // Requires to atleast have powerProduction
compile("DamageBattery"); // Requires to atleast be able to have consumeBuffered
compile("BrittleDrill"); // Could actually be anything lol
compile("LaunchSilo"); // Required to shootConne on 180 and needs to be a turret that can shoot
compile("CompactCore"); // Adapted to CoreBlocl but could be used for anything. Spawner is a turret that kills itself
compile("Fabricator");
compile("DummyBlock");
compile("TheStem");
compile("CommandBlock"); // Command Block from minecraft or something
compile("MeltingPort");
compile("AttributeConstructor");
compile("MechPad");
compile("AssemblyRig");
compile("AddBar");
compile("InfoBlock");
//require("PerformanceConsole");
compile("DestructibleGen");
compile("FragileHeater");
compile("Multicrafter");
compile("SealentChamber");
compile("StructureBlock");
compile("ImageBlock");
compile("CircuitLogic");
compile("CombustionBarrel");
compile("WorldScript");
compile("InstantStorage");
compile("SporeoplasmaReactor");
//require("GeothermalTurbine");
compile("PowerGrid");
compile("damageShiftWall");
compile("ProjectorBlock");
compile("DisableSwitch"); // Switchblock extension
//require("MixDistributor");
//require("ReflectWall");
//require("DroneBay")

// Subclass: Units
compile("IFrameUnit");
compile("EnrageUnit");
compile("ZapUnit");
compile("ResilientUnit");

// Mods
//require("Modifiers");

} catch(e){
log(e)
}
