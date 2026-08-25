ServerEvents.recipes(event => {
    //// Stage 0
    ////修改绳子配方
    ////event.remove({ output: "farmersdelight:rope", input: "farmersdelight:straw" })
    ////event.shaped("farmersdelight:rope", [" A ", " A ", "   "], { A: "farmersdelight:straw" })
    ////添加工作台和燧石工具配方
    ////event.shaped("minecraft:crafting_table", ["AA ", "BB ", "   "], { A: "minecraft:flint", B: "#minecraft:logs" })
    ////event.shaped(MODID + "flint_hatchet", ["FR ", " S ", "   "], { F: "minecraft:flint", R: "farmersdelight:rope", S: "minecraft:stick" })
    ////event.shaped(MODID + "flint_pickaxe", ["FRF", " S ", " S "], { F: "minecraft:flint", R: "farmersdelight:rope", S: "minecraft:stick" })
    ////event.shaped(MODID + "flint_axe", ["FR ", "FS ", " S "], { F: "minecraft:flint", R: "farmersdelight:rope", S: "minecraft:stick" })
    ////更改木板配方
    ////const woods = ["oak", "birch", "acacia", "cherry", "jungle", "spruce", "dark_oak", "mangrove"]
    ////for (var i = 0; i < 8; i++) {
    ////    event.remove({ output: "minecraft:" + woods[i] + "_planks", input: "#minecraft:" + woods[i] + "_logs" })
    ////    event.shaped(Item.of("minecraft:" + woods[i] + "_planks", 2), ["A  ", "B  ", "   "], { B: "#minecraft:" + woods[i] + "_logs", A: "#minecraft:axes" }).damageIngredient({ item: "#minecraft:axes" })
    ////}
    //////添加晒架配方
    //////event.shaped(MODID + "drying_rack", ["AAA", "B B", "B B"], { A: "farmersdelight:rope", B: "minecraft:stick" })
    //////添加干海带配方
    //////event.recipes.custommachinery.custom_machine(MODID + "drying_rack", 6000)
    //////    .requireItem("minecraft:kelp")
    //////    .requireWeather("clear")
    //////    .requireTime("(0,12000)")
    //////    .mustSeeSky()
    //////    .produceItem("minecraft:dried_kelp")
    ////更改石质工具配方
    ////event.replaceInput({ output: "minecraft:stone_axe" }, "minecraft:cobblestone", MODID + "reforged_stone")
    ////event.replaceInput({ output: "minecraft:stone_sword" }, "minecraft:cobblestone", MODID + "reforged_stone")
    ////event.replaceInput({ output: "minecraft:stone_hoe" }, "minecraft:cobblestone", MODID + "reforged_stone")
    ////event.replaceInput({ output: "minecraft:stone_pickaxe" }, "minecraft:cobblestone", MODID + "reforged_stone")
    ////event.replaceInput({ output: "minecraft:stone_shovel" }, "minecraft:cobblestone", MODID + "reforged_stone")
    //////添加重铸石配方
    //////event.recipes.custommachinery.custom_machine(MODID + "solar_reforge_pot", 400)
    //////    .requireItem(MODID + "flint_dust")
    //////    .requireItem(Item.of(MODID + "granite_dust", 2))
    //////    .requireWeather("clear")
    //////    .requireTime("(0,12000)")
    //////    .mustSeeSky()
    //////    .produceItem(MODID + "reforged_stone")
    ////添加(简陋)高炉砖块配方
    ////event.shaped(MODID + "primitive_blast_furnace_bricks", ["AA ", "AA ", "   "], { A: MODID + "primitive_blast_furnace_brick" })
    ////event.shaped(MODID + "blast_furnace_bricks", ["AA ", "AA ", "   "], { A: MODID + "blast_furnace_brick" })
    ////添加燧石粉,花岗岩粉配方
    ////event.shaped(MODID + "flint_dust", ["A  ", "B  ", "   "], { A: "minecraft:flint", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped(MODID + "granite_dust", ["A  ", "B  ", "   "], { A: "minecraft:granite", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped(MODID + "flint_dust", ["A  ", "B  ", "   "], { A: "minecraft:flint", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shaped(MODID + "granite_dust", ["A  ", "B  ", "   "], { A: "minecraft:granite", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////添加太阳能重铸锅配方
    ////event.shaped(MODID + "solar_reforge_pot", ["A A", "BAB", "CCC"], { A: "minecraft:glass_pane", B: MODID + "primitive_blast_furnace_bricks", C: "minecraft:cobblestone" })
    ////添加(简陋)土高炉控制器配方
    ////event.shaped(MODID + "primitive_blast_furnace_controller", ["AAA", "A A", "AAA"], { A: MODID + "primitive_blast_furnace_brick" })
    //// event.shaped(MODID + "blast_furnace_controller", ["AAA", "A A", "AAA"], { A: MODID + "blast_furnace_brick" })
    ////添加粗制粘土砖配方
    ////event.shapeless(MODID + "clay_brick", [Item.of("minecraft:clay_ball", 2)])
    ////添加简陋高炉砖配方
    ////event.smelting(MODID + "primitive_blast_furnace_brick", MODID + "clay_brick", 5, 200)
    ////添加研钵配方
    ////event.shaped(MODID + "mortar", [" A ", "BAB", "BBB"], { A: "minecraft:flint", B: "minecraft:granite" })
    ////添加待炼生铁配方
    ////event.shaped("create:crushed_raw_iron", [" A ", " B ", "   "], { A: "minecraft:raw_iron", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped(MODID + "coal_dust", [" A ", " B ", "   "], { A: "minecraft:coal", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped("create:crushed_raw_iron", [" A ", " B ", "   "], { A: "minecraft:raw_iron", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shaped(MODID + "coal_dust", [" A ", " B ", "   "], { A: "minecraft:coal", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shapeless(Item.of(MODID + "unfired_pig_iron", 3), [Item.of("create:crushed_raw_iron", 3), Item.of(MODID + "coal_dust", 2)])
    //////添加生铁配方
    //////event.recipes.custommachinery.custom_machine(MODID + "primitive_blast_furnace_controller", 800)
    //////    .requireItem(Item.of(MODID + "unfired_pig_iron", 3))
    //////    .requireItem(MODID + "limestone_dust")
    //////    .produceItem(Item.of(MODID + "pig_iron_ingot", 2))
    //////    .produceItem(Item.of("immersiveengineering:slag", 2))
    //////    .requireFuel()
    //////    .requireStructure([["aaa", "aaa", "bmb"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "primitive_blast_furnace_bricks", b: "minecraft:barrel" })
    //////event.recipes.custommachinery.custom_machine(MODID + "blast_furnace_controller", 400)
    //////    .requireItem(Item.of(MODID + "unfired_pig_iron", 3))
    //////    .requireItem(MODID + "limestone_dust")
    //////    .produceItem(Item.of(MODID + "pig_iron_ingot", 2))
    //////    .produceItem(Item.of("immersiveengineering:slag", 2))
    //////    .requireFuel()
    //////    .requireStructure([["aba", "aaa", "aaa"], ["aaa", "a a", "cmc"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "blast_furnace_bricks", b: MODID + "blast_furnace_vent", c: "minecraft:barrel" })
    ////添加玻璃板配方
    ////event.shaped(Item.of("minecraft:glass_pane", 4), ["AB ", "   ", "   "], { A: "minecraft:glass", B: "#farmersdelight:tools/knives" }).damageIngredient({ item: "#farmersdelight:tools/knives" }, 1)
    ////添加生铁工具配方
    ////event.shaped(MODID + "pig_iron_pickaxe", ["AAA", " B ", " B "], { A: MODID + "pig_iron_ingot", B: "minecraft:stick" })
    ////event.shaped(MODID + "pig_iron_hammer", [" A ", " BA", "B  "], { A: MODID + "pig_iron_ingot", B: "minecraft:stick" })
    ////添加传动杆配方
    ////event.shaped(Item.of("create:shaft", 2), ["A  ", "A  ", "   "], { A: MODID + "reforged_stone" })
    //////添加硬砖配方
    //////event.recipes.custommachinery.custom_machine(MODID + "solar_reforge_pot", 400)
    //////    .requireItem(Item.of(MODID + "primitive_blast_furnace_brick", 3))
    //////    .requireItem("immersiveengineering:slag")
    //////    .requireWeather("clear")
    //////    .requireTime("(0,12000)")
    //////    .mustSeeSky()
    //////    .produceItem(Item.of(MODID + "hard_brick", 2))
    ////添加硬砖粉配方
    ////event.shapeless(MODID + "hard_brick_dust", [MODID + "hard_brick", MODID + "pig_iron_hammer"]).keepIngredient(MODID + "mortar")
    ////添加复合粘土配方
    ////event.shapeless(Item.of(MODID + "compound_clay_ball", 3), ["minecraft:sand", Item.of("minecraft:clay_ball", 2), MODID + "hard_brick_dust"])
    //////添加土高炉砖配方
    //////event.recipes.custommachinery.custom_machine(MODID + "solar_reforge_pot", 400)
    //////    .requireItem(Item.of(MODID + "compound_clay_ball", 3))
    //////    .requireItem(MODID + "flint_dust")
    //////    .requireWeather("clear")
    //////    .requireTime("(0,12000)")
    //////    .mustSeeSky()
    //////    .produceItem(Item.of(MODID + "blast_furnace_brick", 2))
    //////添加渣锌锭配方
    //////event.recipes.custommachinery.custom_machine(MODID + "primitive_blast_furnace_controller", 800)
    //////    .requireItem("create:raw_zinc")
    //////    .requireItem(MODID + "coal_dust")
    //////    .requireFuel()
    //////    .produceItem(MODID + "bastard_zinc_ingot")
    //////    .requireStructure([["aaa", "aaa", "bmb"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "primitive_blast_furnace_bricks", b: "minecraft:barrel" })
    //////event.recipes.custommachinery.custom_machine(MODID + "blast_furnace_controller", 400)
    //////    .requireItem("create:raw_zinc")
    //////    .requireItem(MODID + "coal_dust")
    //////    .requireFuel()
    //////    .produceItem(MODID + "bastard_zinc_ingot")
    //////    .requireStructure([["aba", "aaa", "aaa"], ["aaa", "a a", "cmc"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "blast_furnace_bricks", b: MODID + "blast_furnace_vent", c: "minecraft:barrel" })
    ////添加待炼含杂铜锭配方
    ////event.shaped("create:crushed_raw_copper", [" A ", " B ", "   "], { A: "minecraft:raw_copper", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped("create:crushed_raw_copper", [" A ", " B ", "   "], { A: "minecraft:raw_copper", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shapeless(Item.of(MODID + "unfired_pig_iron", 3), [Item.of("create:crushed_raw_iron", 3), Item.of(MODID + "coal_dust", 2)])
    //////添加含杂铜锭配方
    //////event.recipes.custommachinery.custom_machine(MODID + "primitive_blast_furnace_controller", 800)
    //////    .requireItem(Item.of(MODID + "unfired_copper", 3))
    //////    .requireItem(MODID + "limestone_dust")
    //////    .produceItem(Item.of(MODID + "bastard_copper_ingot", 2))
    //////    .produceItem(Item.of("immersiveengineering:slag", 2))
    //////    .requireFuel()
    //////    .requireStructure([["aaa", "aaa", "bmb"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "primitive_blast_furnace_bricks", b: "minecraft:barrel" })
    //////event.recipes.custommachinery.custom_machine(MODID + "blast_furnace_controller", 400)
    //////    .requireItem(Item.of(MODID + "unfired_copper", 3))
    //////    .requireItem(MODID + "limestone_dust")
    //////    .produceItem(Item.of(MODID + "bastard_copper_ingot", 2))
    //////    .produceItem(Item.of("immersiveengineering:slag", 2))
    //////    .requireFuel()
    //////    .requireStructure([["aba", "aaa", "aaa"], ["aaa", "a a", "cmc"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "blast_furnace_bricks", b: MODID + "blast_furnace_vent", c: "minecraft:barrel" })
    ////添加石灰岩粉配方
    ////event.shaped(MODID + "limestone_dust", ["A  ", "B  ", "   "], { A: "create:limestone", B: MODID + "mortar" }).keepIngredient(MODID + "mortar")
    ////event.shaped(MODID + "limestone_dust", ["A  ", "B  ", "   "], { A: "create:limestone", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    //////添加粗制黄铜配方
    //////event.recipes.custommachinery.custom_machine(MODID + "blast_furnace_controller", 400)
    //////    .requireItem(Item.of(MODID + "bastard_copper_ingot", 3))
    //////    .requireItem(MODID + "bastard_zinc_ingot")
    //////    .produceItem(MODID + "bastard_brass_ingot")
    //////    .requireFuel()
    //////    .requireStructure([["aba", "aaa", "aaa"], ["aaa", "a a", "cmc"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "blast_furnace_bricks", b: MODID + "blast_furnace_vent", c: "minecraft:barrel" })
    ////添加土高炉通风口配方
    ////event.shaped(MODID + "blast_furnace_vent", ["ABA", "B B", "ABA"], { A: MODID + "pig_iron_sheet", B: MODID + "blast_furnace_bricks" })
    ////更改水车配方
    ////event.replaceInput({ output: "create:water_wheel" }, "create:shaft", MODID + "pig_iron_ingot")
    ////添加耐火粘土配方
    ////event.shaped(MODID + "terracotta_dust", ["A  ", "B  ", "   "], { A: "#minecraft:terracotta", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shaped(MODID + "nether_brick_dust", ["A  ", "B  ", "   "], { A: "minecraft:nether_brick", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shapeless(Item.of(MODID + "fireclay", 6), ["create:powdered_obsidian", MODID + "terracotta_dust", Item.of(MODID + "nether_brick_dust", 2), Item.of(MODID + "compound_clay_ball", 5)])
    ////添加高炉砖配方
    ////event.smelting(MODID + "advanced_blast_furnace_brick", MODID + "fireclay", 5, 200)
    ////添加高炉砖块配方
    ////event.shaped("immersiveengineering:blastbrick", ["AA ", "AA ", "   "], { A: MODID + "advanced_blast_furnace_brick" })
    //////添加高炉控制器配方
    //////event.shaped(MODID + "advanced_blast_furnace_controller", ["AAA", "A A", "AAA"], { A: MODID + "advanced_blast_furnace_brick" })
    ////添加生铁板配方
    ////event.shaped(MODID + "pig_iron_sheet", ["A  ", "B  ", "B  "], { A: MODID + "pig_iron_hammer", B: MODID + "pig_iron_ingot" }).keepIngredient(MODID + "pigiron_hammer")
    ////添加生铁混合物配方
    ////event.shapeless(Item.of(MODID + "raw_iron_mixture", 3), [Item.of(MODID + "raw_iron_dust", 3), Item.of(MODID + "coal_dust", 2), MODID + "lime_dust"])
    //////添加石灰岩粉配方
    //////event.recipes.custommachinery.custom_machine(MODID + "blast_furnace_controller", 400)
    //////    .requireItem(MODID + "limestone_dust")
    //////    .produceItem(MODID + "lime_dust")
    //////    .requireFuel()
    //////    .requireStructure([["aba", "aaa", "aaa"], ["aaa", "a a", "cmc"], [" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: MODID + "blast_furnace_bricks", b: MODID + "blast_furnace_vent", c: "minecraft:barrel" })
    ////添加粗铁粉配方
    ////event.shaped(MODID + "raw_iron_dust", ["A  ", "B  ", "   "], { A: "minecraft:raw_iron", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////添加铁锭配方
    ////event.recipes.custommachinery.custom_machine(MODID + "advanced_blast_furnace_controller",400)
    ////    .requireItem(MODID + "raw_iron_mixture")
    ////    .produceItem("minecraft:iron_ingot")
    ////    .requireFuel()
    ////    .requireStructure([["aba","aaa","aaa"],["aaa","a a","cmc"],["aaa","a a","aaa"],[" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: "immersiveengineering:blastbrick", b: MODID + "advanced_blast_furnace_vent", c: "minecraft:barrel" })
    ////添加安山合金配方
    ////event.recipes.custommachinery.custom_machine(MODID + "advanced_blast_furnace_controller",400)
    ////    .requireItem(Item.of("minecraft:andesite",18))
    ////    .requireItem("minecraft:iron_ingot")
    ////    .produceItem("create:andesite_alloy")
    ////    .requireFuel()
    ////    .requireStructure([["aba","aaa","aaa"],["aaa","a a","cmc"],["aaa","a a","aaa"],[" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: "immersiveengineering:blastbrick", b: MODID + "advanced_blast_furnace_vent", c: "minecraft:barrel" })
    ////添加铜锌配方
    ////event.recipes.custommachinery.custom_machine(MODID + "advanced_blast_furnace_controller",400)
    ////    .requireItem("minecraft:raw_copper")
    ////    .produceItem("minecraft:copper_ingot")
    ////    .requireFuel()
    ////    .requireStructure([["aba","aaa","aaa"],["aaa","a a","cmc"],["aaa","a a","aaa"],[" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: "immersiveengineering:blastbrick", b: MODID + "advanced_blast_furnace_vent", c: "minecraft:barrel" })
    ////event.recipes.custommachinery.custom_machine(MODID + "advanced_blast_furnace_controller",400)
    ////    .requireItem("create:raw_zinc")
    ////    .produceItem("create:zinc_ingot")
    ////    .requireFuel()
    ////    .requireStructure([["aba","aaa","aaa"],["aaa","a a","cmc"],["aaa","a a","aaa"],[" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: "immersiveengineering:blastbrick", b: MODID + "advanced_blast_furnace_vent", c: "minecraft:barrel" })
    ////添加铜粉,锌粉配方
    ////event.shaped("immersiveengineering:dust_copper", ["A  ", "B  ", "   "], { A: "minecraft:copper_ingot", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////event.shaped(MODID + "zinc_dust", ["A  ", "B  ", "   "], { A: "create:zinc_ingot", B: MODID + "brass_mortar" }).keepIngredient(MODID + "brass_mortar")
    ////添加黄铜粉配方
    ////event.shapeless(Item.of(MODID + "brass_dust", 4), [MODID + "zinc_dust", Item.of("immersiveengineering:dust_copper", 3)])
    ////添加黄铜配方
    ////event.recipes.custommachinery.custom_machine(MODID + "advanced_blast_furnace_controller",400)
    ////    .requireItem(MODID + "brass_dust")
    ////    .produceItem("create:brass_ingot")
    ////    .requireFuel()
    ////    .requireStructure([["aba","aaa","aaa"],["aaa","a a","cmc"],["aaa","a a","aaa"],[" a ", "a a", " a "], [" a ", "a a", " a "], [" a ", "a a", " a "]], { a: "immersiveengineering:blastbrick", b: MODID + "advanced_blast_furnace_vent", c: "minecraft:barrel" })
})
