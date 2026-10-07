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
compile("IconLoader");
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
compile("AttributeVanilla");
compile("ResearchDialog");
compile("Shader");
//compile("IconLoader");
compile("effects"); // fancy effects
compile("ProceduralGen");
//require("BreakBlock"); didnt have the needed event type
//require("gierTroll");

//    ### Class Overrides ###
// Subclass: Block
compile("PowerButton"); // Requires to atleast have powerProduction
compile("DamageBattery"); // Requires to atleast be able to have consumeBuffered
compile("BrittleDrill"); // Could actually be anything lol
compile("LaunchSilo"); // Required to shootConne on 180 and needs to be a turret that can shoot
compile("CompactCore"); // Adapted to CoreBlocl but could be used for anything. Spawner is a turret that kills itself
compile("Fabricator"); // Anything with a payload config
compile("DummyBlock"); // literally any building
compile("TheStem"); // literally any building
compile("CommandBlock"); // Command Block from minecraft or something
compile("MeltingPort"); // literally any building. Hardcoded
compile("AttributeConstructor"); // constructor extension
compile("MechPad"); // unitCargoLoader. Stats are ruined because of v156...
compile("AssemblyRig"); // test
compile("AddBar"); // literally any building
compile("InfoBlock"); // message block extension 
compile("ConfigAssembler"); // assemblers
//require("PerformanceConsole");
compile("DestructibleGen"); // literally any active building
compile("FragileHeater"); // literally any active building
compile("Multicrafter"); // literally any building
compile("SealentChamber"); // Hardcoded
compile("StructureBlock"); // literally any building
compile("ImageBlock"); // message block extension
compile("CircuitLogic"); // hardcoded
compile("CombustionBarrel"); // literally any active building
compile("WorldScript"); // will be deprecated soon
compile("InstantStorage"); // storageBlock
compile("SporeoplasmaReactor"); // literally any active building
//require("GeothermalTurbine");
compile("PowerGrid"); // literally any active building
compile("damageShiftWall"); // literally any active building
compile("ProjectorBlock");
compile("DisableSwitch"); // Switchblock extension
compile("DamageScaleWall"); // regenProjector
//require("MixDistributor");
//require("ReflectWall");
//require("DroneBay")

// Subclass: Units
compile("IFrameUnit");
compile("EnrageUnit");
compile("ZapUnit");
compile("ResilientUnit");
compile("StealthTemplate");
  
// Mods
//require("Modifiers");

} catch(e){
log(e)
}
