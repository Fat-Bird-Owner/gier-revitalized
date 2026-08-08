const myStats = {
Recipe: new Stat("recipes", StatCat.crafting),
HealPercent: new Stat("healPerc", StatCat.function),
CircuitRate: new Stat("circuitRate", StatCat.function),
CircuitHeatDamage: new Stat("circuitHeatDamage", StatCat.function),
CircuitRange: new Stat("circuitRange", StatCat.function),
PistonPushLength: new Stat("pistonPushLength", StatCat.function),
blastPower: new Stat("blastPower", StatCat.function),
blastTier: new Stat("blastTier", StatCat.function),
netIn: new Stat("netIn", StatCat.power),
DistanceIncrease: new Stat("distanceIncrease", StatCat.function)
};

module.exports = myStats;
