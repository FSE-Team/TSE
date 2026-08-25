ServerEvents.recipes(event => {
    const MODID = "tse:"
    event.replaceInput({output: "explorerscompass:explorerscompass"}, "minecraft:cobweb", "alltheores:brass_ingot")
    const types = ["oak", "spruce", "birch", "jungle", "dark_oak", "crimson", "warped", "mangrove", "cherry", "framed"]
    event.replaceInput({output: "#functionalstorage:drawer"}, "minecraft:chest", "create:item_vault")
    event.replaceInput({output: "#functionalstorage:fluid_drawer"}, "minecraft:bucket", "create:fluid_tank")
    event.replaceInput({output: "trashcans:item_trash_can"}, "minecraft:chest", "create:item_vault")
    event.replaceInput({output: "trashcans:liquid_trash_can"}, "minecraft:bucket", "create:fluid_tank")
    // Coins
    event.shaped(MODID + "compressed_iron_coin", ["AAA", "A A", "AAA"], {A: MODID + "copper_coin"})
    event.shapeless("8x " + MODID + "copper_coin", [MODID + "compressed_iron_coin"])
    event.shaped(MODID + "gold_coin", ["AAA", "A A", "AAA"], {A: MODID + "compressed_iron_coin"})
    event.shapeless("8x " + MODID + "compressed_iron_coin", [MODID + "gold_coin"])
})