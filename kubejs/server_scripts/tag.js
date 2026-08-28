ServerEvents.tags("item", event => {
    event.add("functionalstorage:fluid_drawer", "functionalstorage:framed_fluid_1")
    event.add("functionalstorage:fluid_drawer", "functionalstorage:framed_fluid_2")
    event.add("functionalstorage:fluid_drawer", "functionalstorage:framed_fluid_4")

    event.remove("advalchemy:aspect/netherite", "minecraft:netherite_scrap")
    const a1=["iron","gold","copper"]
    const a2=["redstone","emerald","diamond","quartz","coal"]
    for(let i=0;i<a1.length;i++){
        event.remove("advalchemy:aspect/"+a1[i], "minecraft:"+a1[i]+"_ingot")
    }
    for(let i=0;i<a2.length;i++){
        event.remove("advalchemy:aspect/"+a2[i], "minecraft:"+a2[i])
    }
    event.remove("advalchemy:aspect/silver", "alltheores:silver_ingot")
    event.remove("advalchemy:aspect/dawnstone", "embers:dawnstone_ingot")
    event.remove("advalchemy:aspect/lapis", "minecraft:lapis_lazuli")
    event.remove("advalchemy:aspect/amethyst", "minecraft:amethyst_shard")
})