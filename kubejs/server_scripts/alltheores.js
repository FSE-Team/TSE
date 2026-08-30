ServerEvents.recipes(event => {
    const atoMaterials = ["aluminum", "lead", "nickel", "osmium", "platinum", "silver", "tin", "uranium", "zinc", "iridium"]
    const vanillaMaterials = ["iron", "gold", "copper"]
    const alloyMaterials = ["steel", "invar", "electrum", "bronze", "brass", "enderium", "lumium", "signalum", "constantan"]
    event.remove({mod: "alltheores"})
    event.remove({input: "immersiveengineering:hammer", output: "#c:dusts"})
    event.remove({input: "immersiveengineering:hammer", output: "#c:plates"})
    atoMaterials.forEach((material) => {
        event.remove({output: "#c:plates/" + material, type: "create:pressing"})
        event.recipes.create.pressing("alltheores:" + material + "_plate", "alltheores:" + material + "_ingot")
        event.recipes.create.crushing("alltheores:" + material + "_dust","alltheores:" + material + "_ingot")
    })
    vanillaMaterials.forEach((material) => {
        event.remove({output: "#c:plates/" + material, type: "create:pressing"})
        event.recipes.create.pressing("alltheores:" + material + "_plate", "minecraft:" + material + "_ingot")
        event.recipes.create.crushing("alltheores:" + material + "_dust","minecraft:" + material + "_ingot")
    })
    alloyMaterials.forEach((material) => {
        event.remove({output: "#c:plates/" + material, type: "create:pressing"})
        event.recipes.create.pressing("alltheores:" + material + "_plate", "alltheores:" + material + "_ingot")
        event.recipes.create.crushing("alltheores:" + material + "_dust","alltheores:" + material + "_ingot")
    })
    event.recipes.create.crushing("immersiveengineering:dust_sulfur", "alltheores:sulfur")
})