ServerEvents.recipes(event => {
    const MODID = "tse:"
    //铁
    event.remove({ output: "minecraft:iron_nugget", input: "minecraft:gravel" })
    event.recipes.create.splashing(CreateItem.of("minecraft:flint", 0.25), "minecraft:gravel")
    event.recipes.create.mixing(["24x minecraft:iron_ingot", MODID + "ineffective_echo_catalyst"], ["16x minecraft:iron_ingot", MODID + "echo_catalyst"])
    //铜
    event.recipes.create.mixing(["16x minecraft:copper_ingot", MODID + "ineffective_echo_catalyst"], ["12x minecraft:copper_ingot", MODID + "echo_catalyst"])
    //锌
    event.recipes.create.mixing(["16x alltheores:zinc_ingot", MODID + "ineffective_echo_catalyst"], ["12x alltheores:zinc_ingot", MODID + "echo_catalyst"])
    //盐
    event.recipes.create.mixing(["16x alltheores:salt", MODID + "ineffective_echo_catalyst"], ["12x alltheores:salt", MODID + "echo_catalyst"])
    //红石
    event.recipes.create.mixing(["32x minecraft:redstone", MODID + "ineffective_echo_catalyst"], ["24x minecraft:redstone", MODID + "echo_catalyst"])
    //金 石英
    event.remove({input: "minecraft:soul_sand", output: "minecraft:quartz"})
    event.recipes.create.mixing(["8x minecraft:gold_ingot", MODID + "ineffective_echo_catalyst"], ["6x minecraft:gold_ingot", MODID + "echo_catalyst"])
    event.recipes.create.mixing(["10x minecraft:quartz", MODID + "ineffective_echo_catalyst"], ["5x minecraft:quartz", MODID + "echo_catalyst"])
    //钻石
    event.recipes.create.mixing(["minecraft:diamond", MODID + "ineffective_echo_catalyst"], ["2x minecraft:diamond", MODID + "echo_catalyst"])
})