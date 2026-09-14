StartupEvents.registry("block", event => {
    const MODID = "tse:"
    event.create(MODID + "andesite_machine")
        .hardness(2.0)
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:mineable/axe")
        .fullBlock(false)
        .box(1,0,1,15,12,15,true)
})
