ServerEvents.recipes(event => {
    event.replaceInput({output: "explorerscompass:explorerscompass"}, "minecraft:cobweb", "alltheores:brass_ingot")
    const types = ["oak", "spruce", "birch", "jungle", "dark_oak", "crimson", "warped", "mangrove", "cherry", "framed"]
    event.replaceInput({output: "#functionalstorage:drawer"}, "minecraft:chest", "create:item_vault")
    event.replaceInput({output: "#functionalstorage:fluid_drawer"}, "minecraft:bucket", "create:fluid_tank")
    event.replaceInput({output: "trashcans:item_trash_can"}, "minecraft:chest", "create:item_vault")
    event.replaceInput({output: "trashcans:liquid_trash_can"}, "minecraft:bucket", "create:fluid_tank")
})