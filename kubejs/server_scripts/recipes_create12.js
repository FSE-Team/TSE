ServerEvents.recipes(event => {
    const MODID = "tse:"
    /*
    ! 若没有对应的内容请填null
    inputItem 输入物品
    inputFluid 输入流体
    inputFluidAmount 输入流体数量
    outputItem 输出物品
    outputItemAmount 输出物品数量
    outputFluid 输出流体
    outputFluidAmount 输出流体数量
    pressure 压力
    minTemperature 最低温度
    maxTemperature 最高温度
    */
    const thermal_plant = (inputItem, inputItemAmount, inputFluid, inputFluidAmount, outputItem, outputItemAmount, outputFluid, outputFluidAmount, pressure, minTemperature, maxTemperature, airUseMultiplier, speed, isExothermic) => {
        var obj = { type: "pneumaticcraft:thermo_plant", exothermic: isExothermic, air_use_multiplier: airUseMultiplier, speed: speed, inputs: {}, outputs: {} }
        if (inputItem != null) 
            if(inputItem[0] == "#") obj.inputs.item = { tag: inputItem.slice(1), count: inputItemAmount }
            else obj.inputs.item = { item: inputItem, count: inputItemAmount }
        if (inputFluid != null) 
            if(inputFluid[0] == "#") obj.inputs.fluid = { tag: inputFluid.slice(1), amount: inputFluidAmount }
            else obj.inputs.fluid = { fluid: inputFluid, amount: inputFluidAmount }
        if (outputItem != null) obj.outputs.item_output = { id: outputItem, count: outputItemAmount }
        if (outputFluid != null) obj.outputs.fluid_output = { id: outputFluid, amount: outputFluidAmount }
        if (pressure != null) obj.pressure = pressure
        if (minTemperature != null && maxTemperature == null) obj.temperature = { min: minTemperature + 273 }
        else if (minTemperature == null && maxTemperature != null) obj.temperature = { max: maxTemperature + 273 }
        else if (maxTemperature != null && minTemperature != null) obj.temperature = { min: minTemperature + 273, max: maxTemperature + 273 }
        event.custom(JSON.stringify(obj))
    }

    const pressure_chamber = (inputsArr, outputsArr, pressure) => {
        var inputsObjArr = []
        var outputsObjArr = []
        inputsArr.forEach(array => {
            if (array[0][0] == "#") inputsObjArr.push({tag: array[0].slice(1), count: array[1]})
            else inputsObjArr.push({item: array[0], count: array[1]})
        })
        outputsArr.forEach(array => {
            outputsObjArr.push({id: array[0], count: array[1]})
        })
        var obj = {type: "pneumaticcraft:pressure_chamber", inputs: inputsObjArr, results: outputsObjArr, pressure: pressure}
        event.custom(JSON.stringify(obj))
    }

    // const alchemy = (inputItemArr, aspectsArr, tablet, output) => {
    //     var obj = { type: "embers:alchemy", inputs: [], aspects: [], tablet: { item: "" }, output: { item: "" } }
    //     var input = new Array()
    //     inputItemArr.forEach(element => { input.push({ item: element }) })
    //     obj.inputs = input
    //     var aspects = new Array()
    //     aspectsArr.forEach(element => { aspects.push({ tag: "embers:aspectus/" + element }) })
    //     obj.aspects = aspects
    //     obj.tablet.item = tablet
    //     obj.output.item = output
    //     event.custom(JSON.stringify(obj))
    // }

    const hydrotreater = (energy, inputFluid1Amount, inputFluid1Tag, outputFluidAmount, outputFluid, inputFluid2Amount, inputFluid2Tag, outputItemAmount, outputItem, outputItemChance, time) => {
        var obj = { type: "immersivepetroleum:hydrotreater", energy: energy, input: { amount: inputFluid1Amount, tag: inputFluid1Tag }, result: { amount: outputFluidAmount, id: outputFluid }, time: time }
        if (inputFluid2Tag != null) obj.secondary_input = { amount: inputFluid2Amount, tag: inputFluid2Tag }
        if (outputItem != null) obj.secondary_result = { output: { count: outputItemAmount, id: outputItem, chance: outputItemChance } }
        event.custom(JSON.stringify(obj))
    }

    const stamping = (inputFluid, inputFluidAmount, inputItem, inputItemAmount, outputItem, outputItemAmount, mould) => {
        var obj = { type: "embers:stamping", output: { item: outputItem, count: outputItemAmount }, stamp: { item: mould } }
        if (inputFluid != null) obj.fluid = { fluid: inputFluid, amount: inputFluidAmount }
        if (inputItem != null) obj.input = { item: inputItem, count: inputItemAmount }
        event.custom(JSON.stringify(obj))
    }
    //* 删除配方
    //移除原有炼金配方
    event.remove({ type: "embers:alchemy" })
    event.remove({ output: "embers:dynamic_crystal_seed"})
    //删除原有塑料配方
    event.remove({ output: "pneumaticcraft:plastic_sheet" })
    event.remove({ id: "pneumaticcraft:thermo_plant/plastic_from_biodiesel" })
    event.remove({ id: "pneumaticcraft:thermo_plant/plastic_from_lpg" })
    //* 化工
    //水热解(懒得写固液电解)
    event.recipes.createdieselgenerators.basin_fermenting(
        [
            Fluid.of(MODID + "oxygen", 100),
            Fluid.of(MODID + "hydrogen", 200)
        ],
        Fluid.of("minecraft:water", 100), 10
    ).superheated()
    //* 石化
    const PPJA = "createdieselgenerators:pumpjack_"
    const PPJB = ["hole", "bearing", "crank", "head"]
    for (var a = 0; a < 4; a++) {
        event.remove({ output: PPJA + PPJB[a] })
    }
    //添加压缩铁锭板配方
    event.recipes.create.pressing(MODID + "plate_iron_compressed", "pneumaticcraft:ingot_iron_compressed")
    //初级分馏
    event.remove({ type: "immersivepetroleum:distillation" })
    event.remove({ type: "createdieselgenerators:distillation" })
    event.remove({ type: "pneumaticcraft:refinery" })
    const crude = ['immersivepetroleum:crudeoil', 'pneumaticcraft:oil', 'createdieselgenerators:crude_oil']
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of("embers:soul_crude", 75),
            Fluid.of("immersivepetroleum:lubricant", 50),
            Fluid.of("immersivepetroleum:diesel_sulfur", 100),
            Fluid.of("immersivepetroleum:kerosene", 100),
            Fluid.of("industrialforegoing:ether_gas", 100),
            Fluid.of(MODID + "processed_crude", 100)
        ],
        "800x #c:crude_oil"
    ).processingTime(20).superheated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID + "bitumen", 10),
            Fluid.of(MODID + "sulfuric_heavy_oil", 100),
            Fluid.of(MODID + "dirty_steam", 25),
            Fluid.of(MODID + "sulfuric_light_oil", 50),
            Fluid.of(MODID + "sulfuric_naphtha", 100),
            Fluid.of(MODID + "sulfuric_refinery_gas", 100)
        ],
        Fluid.of(MODID + "processed_crude", 100)
    ).processingTime(20).superheated()
    //脱硫
    const IPHT = "immersivepetroleum:hydrotreater"
    event.remove({ id: IPHT + "/sulfur_recovery" })
    event.remove({ id: IPHT + "/pneumaticcraft_plastic" })
    event.remove({ id: IPHT + "/naphtha_cracking" })
    const soliq = [MODID + "sulfuric_refinery_gas",
    MODID + "sulfuric_naphtha",
    MODID + "sulfuric_light_oil",
    MODID + "sulfuric_heavy_oil",
        "immersivepetroleum:diesel_sulfur"]
    const liq = [MODID + "refinery_gas",
        "immersivepetroleum:naphtha",
    MODID + "light_oil",
    MODID + "heavy_oil",
        "immersivepetroleum:diesel"]
    for (var a = 0; a < 5; a++) {
        event.recipes.createdieselgenerators.bulk_fermenting(
            [
                Fluid.of(MODID + "sulfuric_acid", 200),
                Fluid.of(liq[a], 100)
            ], [
            Fluid.of(MODID + "hydrogen", 400),
            Fluid.of(soliq[a], 200)
        ]
        ).processingTime(400)
    }
    const sliq = [MODID + "sulfuric_refinery_gas",
    MODID + "sulfuric_naphtha",
    MODID + "sulfuric_light_oil",
    MODID + "sulfuric_heavy_oil",
        "immersivepetroleum:diesel_sulfur"]
    for (var a = 0; a < 5; a++) {
        hydrotreater(20480,
            1000, sliq[a],
            1000, liq[a],
            500, MODID + "hydrogen",
            5, "immersiveengineering:dust_sulfur", 1.0,
            20)
    }
    //* Stage 1
    //移除烈焰人燃烧室及添加替代
    event.remove({ output: "create:empty_blaze_burner" })
    event.replaceInput(
        { output: "moreburners:electric_burner" },
        "create:empty_blaze_burner",
        "create:precision_mechanism"
    )
    event.replaceInput(
        { output: "createdieselgenerators:burner" },
        "create:empty_blaze_burner",
        "create:precision_mechanism"
    )
    event.remove({ output: "morecreateburnerswithemberburner:ember_burner" })
    event.shaped("morecreateburnerswithemberburner:ember_burner", ["AAA", "BCB", " D "], { A: "embers:dawnstone_plate", B: "minecraft:iron_ingot", C: MODID + "ember_mechanism", D: "embers:mechanical_core" })
    //添加安山构件原始配方
    event.shapeless(MODID + "andesite_mechanism", ["2x minecraft:comparator", "create:andesite_alloy_block", "3x create:cogwheel", "3x create:large_cogwheel"]).id("andesite_mechanism_manual_only")
    //添加安山合金板配方
    event.recipes.create.pressing(MODID + "andesite_alloy_plate", "create:andesite_alloy")
    //添加安山构件配方
    event.recipes.create.sequenced_assembly([
        MODID + "andesite_mechanism"
    ], MODID + "andesite_alloy_plate", [
        event.recipes.create.deploying(MODID + "incomplete_andesite_mechanism", [MODID + "incomplete_andesite_mechanism", "create:cogwheel"]),
        event.recipes.create.deploying(MODID + "incomplete_andesite_mechanism", [MODID + "incomplete_andesite_mechanism", "create:electron_tube"]),
        event.recipes.create.deploying(MODID + "incomplete_andesite_mechanism", [MODID + "incomplete_andesite_mechanism", "create:large_cogwheel"])
    ]).transitionalItem(MODID + "incomplete_andesite_mechanism").loops(3)
    //修改精密构件配方
    event.remove({ output: "create:precision_mechanism" })
    event.recipes.create.sequenced_assembly([
        "create:precision_mechanism"
    ], "alltheores:gold_plate", [
        event.recipes.create.deploying("create:incomplete_precision_mechanism", ["create:incomplete_precision_mechanism", "create:electron_tube"]),
        event.recipes.create.deploying("create:incomplete_precision_mechanism", ["create:incomplete_precision_mechanism", MODID + "andesite_mechanism"])
    ]).transitionalItem("create:incomplete_precision_mechanism").loops(3)
    //添加安山机械箱配方
    event.recipes.create.item_application(MODID + "andesite_machine", ["create:andesite_casing", MODID + "andesite_mechanism"])
    //修改玫瑰石英配方
    event.remove({ output: "create:rose_quartz" })
    event.recipes.create.mixing("create:rose_quartz", [Fluid.of("immersiveengineering:redstone_acid", 250), "minecraft:quartz"])
    //修改电子管配方
    event.remove({ output: "create:electron_tube" })
    event.shaped("create:electron_tube", [" A ", " A ", " B "], { A: "create:polished_rose_quartz", B: "alltheores:iron_plate" }).id("electron_tube_manual_only")
    //修改机器配方
    const machines = ["encased_fan", "millstone", "mechanical_press", "mechanical_mixer", "mechanical_piston", "mechanical_bearing", "rope_pulley", "mechanical_drill", "mechanical_saw", "deployer"]
    machines.forEach(machine => {
        event.replaceInput({ output: "create:" + machine }, "create:andesite_casing", MODID + "andesite_machine")
    })
    event.replaceInput({ output: "createaddition:rolling_mill" }, "create:andesite_casing", MODID + "andesite_machine")
    //替换余烬燃烧室配方
    event.replaceInput({ output: 'embers:ember_burner' }, "create:empty_blaze_burner", MODID + "ember_parts")
    //石英增生配方
    event.recipes.create.crushing("4x tse:amethyst_dust", "minecraft:amethyst_shard")
    event.recipes.create.crushing("4x tse:quartz_dust", "minecraft:quartz")
    event.recipes.createdieselgenerators.bulk_fermenting(
        ["8x minecraft:quartz"],
        [Ingredient.of("#c:dusts/quartz"), Fluid.of("minecraft:water", 1000),Ingredient.of("#c:dusts/amethyst",8)]
    ).superheated()

    //* Stage 2
    //分馏塔控制器配方替换
    event.remove({ output: "createdieselgenerators:distillation_controller" })
    event.shaped("3x createdieselgenerators:distillation_controller", [
        'ABA',
        'CDC'
    ], {
        A: "create:fluid_tank",
        B: "create:precision_mechanism",
        C: MODID + "plate_iron_compressed",
        D: MODID + "andesite_alloy_plate"
    })
    //添加雕琢石英玫瑰配方
    event.recipes.create.sequenced_assembly([
        "16x " + MODID + "carved_rose_quartz"
    ], "create:polished_rose_quartz", [
        event.recipes.create.filling(MODID + "incomplete_carved_rose_quartz", [MODID + "incomplete_carved_rose_quartz", Fluid.of('immersiveengineering:redstone_acid', 1000)]),
        event.recipes.create.cutting(MODID + "incomplete_carved_rose_quartz", MODID + "incomplete_carved_rose_quartz"),
        event.recipes.create.deploying(MODID + "incomplete_carved_rose_quartz", [MODID + "incomplete_carved_rose_quartz", "create:polished_rose_quartz"]),
        event.recipes.create.deploying(MODID + "incomplete_carved_rose_quartz", [MODID + "incomplete_carved_rose_quartz", "embers:wildfire_core"]),
        event.recipes.create.pressing(MODID + "incomplete_carved_rose_quartz", MODID + "incomplete_carved_rose_quartz")
    ]).transitionalItem(MODID + "incomplete_carved_rose_quartz").loops(1)
    //添加电子管进阶配方
    event.recipes.create.deploying("create:electron_tube", ["alltheores:iron_plate", MODID + "carved_rose_quartz"])
    //修改蒸汽引擎配方
    event.remove({ output: "create:steam_engine" })
    event.shaped("create:steam_engine", [" A ", "BCB", "DDD",], { "A": "alltheores:brass_plate", "B": "create:andesite_alloy", "C": MODID + "sealed_mechanism", "D": "alltheores:copper_plate" })
    //添加气密构件配方
    event.recipes.create.sequenced_assembly([
        MODID + "sealed_mechanism"
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_sealed_mechanism", [MODID + "incomplete_sealed_mechanism", "pneumaticcraft:ingot_iron_compressed"]),
        event.recipes.create.deploying(MODID + "incomplete_sealed_mechanism", [MODID + "incomplete_sealed_mechanism", "pneumaticcraft:reinforced_stone"]),
        event.recipes.create.deploying(MODID + "incomplete_sealed_mechanism", [MODID + "incomplete_sealed_mechanism", "create:cogwheel"]),
        event.recipes.create.filling(MODID + "incomplete_sealed_mechanism", [MODID + "incomplete_sealed_mechanism", Fluid.of(MODID + "liquid_unprocessed_sulfurated_rubber", 1000)]),
        event.recipes.create.pressing(MODID + "incomplete_sealed_mechanism", MODID + "incomplete_sealed_mechanism")
    ]).transitionalItem(MODID + "incomplete_sealed_mechanism").loops(1)
    //添加余烬构件配方
    event.recipes.create.sequenced_assembly([
        MODID + "ember_mechanism"
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_ember_mechanism", [MODID + "incomplete_ember_mechanism", "embers:caminite_plate"]),
        event.recipes.create.deploying(MODID + "incomplete_ember_mechanism", [MODID + "incomplete_ember_mechanism", "immersiveengineering:plate_silver"]),
        event.recipes.create.deploying(MODID + "incomplete_ember_mechanism", [MODID + "incomplete_ember_mechanism", "immersiveengineering:plate_lead"]),
        event.recipes.create.cutting(MODID + "incomplete_ember_mechanism", MODID + "incomplete_ember_mechanism")
    ]).transitionalItem(MODID + "incomplete_ember_mechanism").loops(1)
    //修改太古动力核心配方
    event.remove({ output: "embers:ancient_motive_core" })
    event.recipes.create.deploying("embers:ancient_motive_core", [MODID + "ember_mechanism", "embers:ember_crystal"])
    //添加古代砖块配方
    event.recipes.create.compacting(["4x embers:archaic_brick", MODID + "ineffective_echo_catalyst"], ["immersiveengineering:blastbrick", MODID + "echo_catalyst"])
    //修改机械核心配方
    event.remove({ output: "embers:mechanical_core" })
    event.shaped("embers:mechanical_core", ["ABA", " C ", "D D"], { A: "embers:caminite_brick", B: MODID + "ember_mechanism", C: "immersiveengineering:plate_lead", D: "minecraft:iron_ingot" })
    //修改野火核心配方
    event.recipes.advalchemy.alchemy({
        result:'embers:wildfire_core',
        tablet:MODID+'andesite_mechanism',
        inputs:[
            "embers:dawnstone_plate",
            "integrateddynamics:logic_director",
            "embers:ember_crystal_cluster",
            "integrateddynamics:logic_director",
            "embers:dawnstone_plate"
        ],
        input_aspects:["copper","iron","dawnstone","iron","copper"],
        aspects:{copper:[16,16],iron:[8,8],dawnstone:[9,9]}
    })
    //添加余烬晶簇配方
    event.recipes.createdieselgenerators.basin_fermenting(
        ["embers:ember_crystal_cluster"],
        ["embers:ember_crystal","embers:ember_grit",Fluid.of("minecraft:lava", 100)],
    ).heated()
    event.recipes.createdieselgenerators.basin_fermenting(
        ["3x embers:ember_shard"],
        ["4x embers:ember_grit","500x #c:ethanol"],
    ).heated()
    //高级炼金
    event.stonecutting('advalchemy:exchange_tablet', 'embers:alchemy_tablet')
    event.stonecutting('advalchemy:alchemy_pedestal', 'embers:alchemy_pedestal')
    //移除余烬电力转换器
    event.remove({ output: "embers:ember_energy_converter"})
    //修改催化剂插头配方
    event.recipes.advalchemy.alchemy({
        result:"embers:catalytic_plug",
        tablet:MODID+'ember_mechanism',
        inputs:[
            "minecraft:glass",
            "alltheores:silver_plate",
            "embers:ember_crystal",
            "create:sturdy_sheet"
        ],
        input_aspects:["dawnstone","silver","lead","copper"],
        aspects:{dawnstone:[2,2],silver:[10,10],lead:[8,8],copper:[16,16]},
    })

    

    //修改余烬晶体开采机配方
    event.remove({ output: "embers:ember_bore" })
    event.shaped("embers:ember_bore", ["ABA", "ACA", "DED"], { A: "embers:caminite_bricks", B: "embers:mechanical_core", C: "create:precision_mechanism", D: "create:brass_ingot", E: "create:mechanical_drill" })
    //修改余烬能量激发器配方
    event.remove({ output: "embers:ember_activator" })
    event.shaped("embers:ember_activator", ["AAA", "ABA", "CDC"], { A: "alltheores:copper_plate", B: MODID + "ember_mechanism", C: "embers:caminite_brick", D: "createdieselgenerators:burner" })
    //修改压印锤配方
    event.remove({ output: "embers:stamper" })
    event.shaped("embers:stamper", ["ABA", "ACA", "A A"], { A: "embers:caminite_brick", B: MODID + "ember_mechanism", C: "minecraft:iron_block" })
    //添加高级余烬构件配方
    event.recipes.create.sequenced_assembly([
        MODID + "advanced_ember_mechanism"
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_advanced_ember_mechanism", [MODID + "incomplete_advanced_ember_mechanism", "embers:caminite_plate"]),
        event.recipes.create.deploying(MODID + "incomplete_advanced_ember_mechanism", [MODID + "incomplete_advanced_ember_mechanism", "embers:ember_crystal"]),
        event.recipes.create.deploying(MODID + "incomplete_advanced_ember_mechanism", [MODID + "incomplete_advanced_ember_mechanism", "embers:dawnstone_plate"]),
        event.recipes.create.pressing(MODID + "incomplete_advanced_ember_mechanism", MODID + "incomplete_advanced_ember_mechanism")
    ]).transitionalItem(MODID + "incomplete_advanced_ember_mechanism").loops(1)
    //修改余烬能量漏斗配方
    event.remove({ output: "embers:ember_funnel" })
    event.shaped("embers:ember_funnel", ["ABA", "CDC", " A "], { A: "embers:dawnstone_plate", B: "embers:ember_receiver", C: "minecraft:copper_ingot", D: MODID + "advanced_ember_mechanism" })
    //修改余烬能量喷发器配方
    event.remove({ output: "embers:ember_ejector" })
    event.shaped("embers:ember_ejector", [" A ", " B ", " C "], { A: "embers:ember_emitter", B: "embers:dawnstone_plate", C: MODID + "advanced_ember_mechanism" })
    //修改高压能量激发器配方
    event.remove({ output: "embers:pressure_refinery" })
    event.shaped("embers:pressure_refinery", ["AAA", "BCB", "BDB"], { A: "embers:dawnstone_ingot", B: "minecraft:iron_ingot", C: MODID + "advanced_ember_mechanism", D: "minecraft:copper_block" })
    //修改炼金台配方
    event.remove({ output: "embers:alchemy_tablet" })
    event.shaped("embers:alchemy_tablet", [" A ", "BCB", "BDB"], { A: "embers:dawnstone_plate", B: "embers:caminite_bricks", C: MODID + "advanced_ember_mechanism", D: "alltheores:copper_plate" })
    //修改炼金基座配方
    event.remove({ output: "embers:alchemy_pedestal" })
    event.shaped("embers:alchemy_pedestal", ["A A", "BCB", "DED"], { A: "embers:dawnstone_plate", B: "embers:dawnstone_ingot", C: MODID + "advanced_ember_mechanism", D: "embers:caminite_bricks", E: "minecraft:copper_block" })
    //修改光束炮配方
    event.remove({ output: "embers:beam_cannon" })
    event.shaped("embers:beam_cannon", ["ABA", "ACA", "DED"], { A: "alltheores:copper_plate", B: "embers:ember_crystal", C: MODID + "advanced_ember_mechanism", D: "embers:dawnstone_ingot", E: "embers:caminite_bricks" })
    //修改压缩铁锭配方
    event.remove({ id: "pneumaticcraft:explosion_crafting/compressed_iron_ingot" })
    event.recipes.create.compacting(["16x pneumaticcraft:ingot_iron_compressed", MODID + "ineffective_echo_catalyst"], ["16x minecraft:iron_ingot", MODID + "echo_catalyst"]).heated()
    //修改强化石配方
    event.remove({ id: "pneumaticcraft:reinforced_stone" })
    event.shaped("4x pneumaticcraft:reinforced_stone", ["AB ", "BA ", "   "], { A: "minecraft:stone", B: "pneumaticcraft:ingot_iron_compressed" })
    //修改压力室墙壁配方
    event.remove({ output: "pneumaticcraft:pressure_chamber_wall" })
    event.shaped("8x pneumaticcraft:pressure_chamber_wall", ["AAA", "ABA", "AAA"], { A: "pneumaticcraft:reinforced_stone", B: MODID + "sealed_mechanism" })
    //修改压力室气阀配方
    event.remove({ output: "pneumaticcraft:pressure_chamber_valve" })
    event.shapeless("pneumaticcraft:pressure_chamber_valve", ["pneumaticcraft:pressure_chamber_wall", MODID + "sealed_mechanism", "pneumaticcraft:pressure_tube"])
    //修改压力室玻璃配方
    event.remove({ output: "pneumaticcraft:pressure_chamber_glass" })
    event.shaped("8x pneumaticcraft:pressure_chamber_glass", ["AAA", "ABA", "AAA"], { A: "minecraft:glass", B: MODID + "sealed_mechanism" })
    //修改压力室接口配方
    event.remove({ output: "pneumaticcraft:pressure_chamber_interface" })
    event.shapeless("pneumaticcraft:pressure_chamber_interface", ["pneumaticcraft:pressure_chamber_wall", MODID + "sealed_mechanism", "minecraft:hopper"])
    //修改空气压缩机配方
    event.remove({ output: "pneumaticcraft:air_compressor" })
    event.shaped("pneumaticcraft:air_compressor", ["AAA", "ABC", "ADA"], { A: "pneumaticcraft:reinforced_stone", B: MODID + "sealed_mechanism", C: "pneumaticcraft:pressure_tube", D: "minecraft:furnace" })
    //修改液体压缩机配方
    event.remove({ output: "pneumaticcraft:liquid_compressor" })
    event.shaped("pneumaticcraft:liquid_compressor", ["ABA", "CDC", "   "], { A: "pneumaticcraft:pressure_tube", B: "pneumaticcraft:small_tank", C: MODID + "sealed_mechanism", D: "pneumaticcraft:air_compressor" })
    //修改空气炮配方
    event.remove({ output: "pneumaticcraft:air_cannon" })
    event.shaped("pneumaticcraft:air_cannon", [" A ", "BCD", "EEE"], { A: "pneumaticcraft:cannon_barrel", B: MODID + "sealed_mechanism", C: "pneumaticcraft:stone_base", D: "pneumaticcraft:pressure_tube", E: "pneumaticcraft:reinforced_stone_slab" })
    //修改充气站炮配方
    event.remove({ output: "pneumaticcraft:charging_station" })
    event.shaped("pneumaticcraft:charging_station", [" A ", "BBC", "DDD"], { A: "pneumaticcraft:pressure_tube", B: "pneumaticcraft:ingot_iron_compressed", C: MODID + "sealed_mechanism", D: "pneumaticcraft:reinforced_stone_slab" })
    //修改气举配方
    event.remove({ output: "pneumaticcraft:gas_lift" })
    event.shaped("pneumaticcraft:gas_lift", [" A ", "BCB", "DDD"], { A: MODID + "sealed_mechanism", B: "pneumaticcraft:pressure_tube", C: "pneumaticcraft:small_tank", D: "pneumaticcraft:reinforced_stone_slab" })
    //修改紫外线灯箱配方
    event.remove({ output: "pneumaticcraft:uv_light_box" })
    event.shaped("pneumaticcraft:uv_light_box", ["ABA", "CDE", "CFC"], { A: "minecraft:tinted_glass", B: "minecraft:redstone_lamp", C: "pneumaticcraft:ingot_iron_compressed", D: "pneumaticcraft:pcb_blueprint", E: "pneumaticcraft:pressure_tube", F: MODID + "sealed_mechanism" })
    //修改热气动加工机配方
    event.remove({ output: "pneumaticcraft:thermopneumatic_processing_plant" })
    event.shaped("pneumaticcraft:thermopneumatic_processing_plant", ["AAA", "BCB", "AAA"], { A: "pneumaticcraft:reinforced_stone_slab", B: "pneumaticcraft:small_tank", C: MODID + "sealed_mechanism" })
    //修改涡流管配方
    event.remove({ output: "pneumaticcraft:vortex_tube" })
    event.shaped("pneumaticcraft:vortex_tube", ["ABA", "CDC", "AAA"], { A: "pneumaticcraft:ingot_iron_compressed", B: "pneumaticcraft:pressure_tube", C: "minecraft:copper_ingot", D: MODID + "sealed_mechanism" })
    //修改装配控制器配方
    event.remove({ output: "pneumaticcraft:assembly_controller" })
    event.shaped("pneumaticcraft:assembly_controller", [" A ", "BAA", "CDC"], { A: "pneumaticcraft:printed_circuit_board", B: "pneumaticcraft:pressure_tube", C: "pneumaticcraft:ingot_iron_compressed", D: MODID + "sealed_mechanism" })
    //修改其他装配设备配方
    event.remove({ output: "pneumaticcraft:assembly_drill" })
    event.shaped("pneumaticcraft:assembly_drill", ["ABB", " CB", "DED"], { A: "minecraft:diamond", B: "pneumaticcraft:pneumatic_cylinder", C: MODID + "sealed_mechanism", D: "pneumaticcraft:ingot_iron_compressed", E: "pneumaticcraft:printed_circuit_board" })
    event.remove({ id: "pneumaticcraft:assembly_io_unit_import" })
    event.shaped("pneumaticcraft:assembly_io_unit_import", ["ABB", " CB", "DED"], { A: "minecraft:hopper", B: "pneumaticcraft:pneumatic_cylinder", C: MODID + "sealed_mechanism", D: "pneumaticcraft:ingot_iron_compressed", E: "pneumaticcraft:printed_circuit_board" })
    event.remove({ id: "pneumaticcraft:assembly_io_unit_export" })
    event.shaped("pneumaticcraft:assembly_io_unit_export", ["BBA", "BC ", "DED"], { A: "minecraft:hopper", B: "pneumaticcraft:pneumatic_cylinder", C: MODID + "sealed_mechanism", D: "pneumaticcraft:ingot_iron_compressed", E: "pneumaticcraft:printed_circuit_board" })
    event.remove({ output: "pneumaticcraft:assembly_laser" })
    event.shaped("pneumaticcraft:assembly_laser", ["ABB", " CB", "DED"], { A: "minecraft:red_stained_glass", B: "pneumaticcraft:pneumatic_cylinder", C: MODID + "sealed_mechanism", D: "pneumaticcraft:ingot_iron_compressed", E: "pneumaticcraft:printed_circuit_board" })
    //修改流体混合器配方
    event.remove({ output: "pneumaticcraft:fluid_mixer" })
    event.shaped("pneumaticcraft:fluid_mixer", [" A ", "BCB", "ADA"], { A: "pneumaticcraft:small_tank", B: "pneumaticcraft:turbine_rotor", C: MODID + "sealed_mechanism", D: "pneumaticcraft:pressure_tube" })
    //修改电梯呼叫器配方
    event.replaceInput({ output: "pneumaticcraft:elevator_caller" }, "#forge:stone", "pneumaticcraft:printed_circuit_board")
    //修改压力表配方
    event.replaceInput({ output: "pneumaticcraft:pressure_gauge" }, "pneumaticcraft:ingot_iron_compressed", MODID + "sealed_mechanism")
    //添加高级气密构件配方
    event.recipes.create.sequenced_assembly([
        MODID + "advanced_sealed_mechanism"
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_advanced_sealed_mechanism", [MODID + "incomplete_advanced_sealed_mechanism", "pneumaticcraft:heat_pipe"]),
        event.recipes.create.deploying(MODID + "incomplete_advanced_sealed_mechanism", [MODID + "incomplete_advanced_sealed_mechanism", "pneumaticcraft:printed_circuit_board"]),
        event.recipes.create.deploying(MODID + "incomplete_advanced_sealed_mechanism", [MODID + "incomplete_advanced_sealed_mechanism", "pneumaticcraft:pneumatic_cylinder"]),
        event.recipes.create.filling(MODID + "incomplete_advanced_sealed_mechanism", [MODID + "incomplete_advanced_sealed_mechanism", Fluid.of("pneumaticcraft:plastic", 500)]),
        event.recipes.create.cutting(MODID + "incomplete_advanced_sealed_mechanism", MODID + "incomplete_advanced_sealed_mechanism")
    ]).transitionalItem(MODID + "incomplete_advanced_sealed_mechanism").loops(1)
    //修改高级空气压缩机配方
    event.remove({ output: "pneumaticcraft:advanced_air_compressor" })
    event.shaped("pneumaticcraft:advanced_air_compressor", ["AAA", "ABC", "ADA"], { A: "pneumaticcraft:ingot_iron_compressed", B: MODID + "advanced_sealed_mechanism", C: "pneumaticcraft:advanced_pressure_tube", D: "pneumaticcraft:air_compressor" })
    //修改高级液体压缩机配方
    event.remove({ output: "pneumaticcraft:advanced_liquid_compressor" })
    event.shaped("pneumaticcraft:advanced_liquid_compressor", ["AAA", "ABC", "ADA"], { A: "pneumaticcraft:ingot_iron_compressed", B: MODID + "advanced_sealed_mechanism", C: "pneumaticcraft:advanced_pressure_tube", D: "pneumaticcraft:liquid_compressor" })
    //修改通量压缩机配方
    event.replaceInput({ output: "pneumaticcraft:flux_compressor" }, "pneumaticcraft:compressed_iron_gear", MODID + "advanced_sealed_mechanism")
    //修改气动能源炉配方
    event.remove({ output: "pneumaticcraft:pneumatic_dynamo" })
    event.shaped("pneumaticcraft:pneumatic_dynamo", [" A ", "BCB", "DED"], { A: "pneumaticcraft:advanced_pressure_tube", B: "pneumaticcraft:compressed_iron_gear", C: MODID + "advanced_sealed_mechanism", D: "pneumaticcraft:ingot_iron_compressed", E: "createaddition:alternator" })
    //添加回响构件配方
    event.recipes.create.sequenced_assembly([
        CreateItem.of(MODID + "echo_mechanism", 0.96),
        CreateItem.of("minecraft:echo_shard", 0.01),
        CreateItem.of(MODID + "ember_mechanism", 0.01),
        CreateItem.of(MODID + "advanced_sealed_mechanism", 0.01),
        CreateItem.of(MODID + "echo_catalyst", 0.01)
    ], "create:precision_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_echo_mechanism", [MODID + "incomplete_echo_mechanism", MODID + "advanced_sealed_mechanism"]),
        event.recipes.create.deploying(MODID + "incomplete_echo_mechanism", [MODID + "incomplete_echo_mechanism", "minecraft:echo_shard"]),
        event.recipes.create.deploying(MODID + "incomplete_echo_mechanism", [MODID + "incomplete_echo_mechanism", MODID + "ember_mechanism"]),
        event.recipes.create.deploying(MODID + "incomplete_echo_mechanism", [MODID + "incomplete_echo_mechanism", MODID + "echo_catalyst"])
    ]).transitionalItem(MODID + "incomplete_echo_mechanism").loops(3)
    //添加灵魂醇配方
    event.recipes.createdieselgenerators.basin_fermenting(Fluid.of(MODID + "soul_alcohol", 250), ["minecraft:soul_sand", Fluid.of("minecraft:water", 250)]).heated().processingTime(50)
    //添加回响催化剂配方
    event.recipes.create.mixing([MODID + "echo_catalyst", MODID + "iron_ingot_with_echo_impurity"], ["minecraft:echo_shard", "minecraft:iron_ingot", Fluid.of(MODID + "soul_alcohol", 250)]).heated()
    //添加液态粗制硫化橡胶配方
    event.recipes.create.mixing([Fluid.of("industrialforegoing:latex", 1000), MODID + "echo_catalyst"], [Fluid.of("integrateddynamics:menril_resin", 1000), MODID + "echo_catalyst"]).heated()
    event.recipes.create.mixing(Fluid.of(MODID + "liquid_unprocessed_sulfurated_rubber", 1000), [Fluid.of("industrialforegoing:latex", 1000), "immersiveengineering:dust_sulfur"]).heated()
    //添加回响回收液配方
    event.recipes.create.mixing(["minecraft:iron_ingot", Fluid.of(MODID + "recycled_echo_liquid", 500)], [Fluid.of("minecraft:water", 500), MODID + "ineffective_echo_catalyst", MODID + "iron_ingot_with_echo_impurity"]).heated()
    //添加回响碎片增生配方
    event.recipes.create.sequenced_assembly([
        "2x minecraft:echo_shard"
    ], "minecraft:echo_shard", [
        event.recipes.create.filling(MODID + "duplicating_echo_shard", [MODID + "duplicating_echo_shard", Fluid.of(MODID + "recycled_echo_liquid", 250)]),
        event.recipes.create.cutting(MODID + "duplicating_echo_shard", MODID + "duplicating_echo_shard")
    ]).transitionalItem(MODID + "duplicating_echo_shard")

    //* 集成动力
    //添加门瑞欧树脂配方
    event.recipes.create.compacting(Fluid.of("integrateddynamics:menril_resin", 1000), "integrateddynamics:menril_log")
    event.recipes.create.compacting(Fluid.of("integrateddynamics:menril_resin", 250), "integrateddynamics:menril_planks")
    //添加门瑞欧结晶方块融化配方
    event.recipes.create.mixing(Fluid.of("integrateddynamics:menril_resin", 1000), "integrateddynamics:crystalized_menril_block").heated()
    //修改变量卡配方
    event.remove({ output: "integrateddynamics:variable", input: "minecraft:paper" })
    event.recipes.create.filling("4x integrateddynamics:variable", [Fluid.of("integrateddynamics:menril_resin", 100), "minecraft:paper"])
    //添加门瑞欧构件配方
    event.recipes.create.sequenced_assembly([MODID + "menril_mechanism"], MODID + "andesite_mechanism", [
        event.recipes.create.filling(MODID + "incomplete_menril_mechanism", [MODID + "incomplete_menril_mechanism", Fluid.of("integrateddynamics:menril_resin", 250)]),
        event.recipes.create.deploying(MODID + "incomplete_menril_mechanism", [MODID + "incomplete_menril_mechanism", "integrateddynamics:crystalized_menril_chunk"])
    ]).loops(3).transitionalItem(MODID + "incomplete_menril_mechanism")
    //修改逻辑线缆配方
    event.remove({ output: "integrateddynamics:cable" })
    event.recipes.create.filling("integrateddynamics:cable", ["immersiveengineering:wire_copper", Fluid.of("integrateddynamics:menril_resin", 100)])
    //删除发电机配方
    event.remove({ output: "integrateddynamics:coal_generator" })
    //添加紫颂果浆配方
    event.recipes.create.compacting(Fluid.of("integrateddynamics:liquid_chorus", 125), "minecraft:popped_chorus_fruit")
    event.recipes.create.compacting(Fluid.of("integrateddynamics:liquid_chorus", 125), "integrateddynamics:proto_chorus")
    //添加紫颂果结晶方块融化配方
    event.recipes.create.mixing(Fluid.of("integrateddynamics:liquid_chorus", 1000), "integrateddynamics:crystalized_chorus_block").heated()
    //修改变量输出配方
    event.remove({ output: "integrateddynamics:variable_transformer_output" })
    event.recipes.create.sequenced_assembly("4x integrateddynamics:variable_transformer_output", MODID + "menril_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_output", [MODID + "incomplete_variable_transformer_output", "minecraft:piston"]),
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_output", [MODID + "incomplete_variable_transformer_output", "integrateddynamics:variable"]),
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_output", [MODID + "incomplete_variable_transformer_output", "integrateddynamics:variable"]),
        event.recipes.create.cutting(MODID + "incomplete_variable_transformer_output", MODID + "incomplete_variable_transformer_output")
    ]).transitionalItem(MODID + "incomplete_variable_transformer_output")
    //修改变量输入配方
    event.remove({ output: "integrateddynamics:variable_transformer_input" })
    event.recipes.create.sequenced_assembly("4x integrateddynamics:variable_transformer_input", MODID + "menril_mechanism", [
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_input", [MODID + "incomplete_variable_transformer_input", "minecraft:sticky_piston"]),
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_input", [MODID + "incomplete_variable_transformer_input", "integrateddynamics:variable"]),
        event.recipes.create.deploying(MODID + "incomplete_variable_transformer_input", [MODID + "incomplete_variable_transformer_input", "integrateddynamics:variable"]),
        event.recipes.create.cutting(MODID + "incomplete_variable_transformer_input", MODID + "incomplete_variable_transformer_input")
    ]).transitionalItem(MODID + "incomplete_variable_transformer_input")
    //修改物品接口配方
    event.replaceInput({ output: "integratedtunnels:part_interface_item" }, "minecraft:chest", "create:item_vault")
    //修改流体接口配方
    event.replaceInput({ output: "integratedtunnels:part_interface_fluid" }, "minecraft:bucket", "create:fluid_tank")

    //*液体燃料
    //修改原生物柴油配方
    event.remove({ output: "createdieselgenerators:biodiesel" })
    event.remove({ output: "pneumaticcraft:biodiesel" })

    //*内燃机
    //修改柴油机配方
    event.remove({ output: "createdieselgenerators:diesel_engine" })
    event.recipes.create.sequenced_assembly("createdieselgenerators:diesel_engine", MODID+"plate_iron_compressed", [
        event.recipes.create.deploying(MODID + "incomplete_diesel_engine", [MODID + "incomplete_diesel_engine", "createdieselgenerators:engine_piston"]),
        event.recipes.create.deploying(MODID + "incomplete_diesel_engine", [MODID + "incomplete_diesel_engine", "create:shaft"]),
        event.recipes.create.deploying(MODID + "incomplete_diesel_engine", [MODID + "incomplete_diesel_engine", "create:precision_mechanism"]),
        event.recipes.create.filling(MODID + "incomplete_diesel_engine", [MODID + "incomplete_diesel_engine", "100x #c:lubricant"]),
        event.recipes.create.deploying(MODID + "incomplete_diesel_engine", [MODID + "incomplete_diesel_engine", "alltheores:brass_plate"]),
        event.recipes.create.pressing(MODID + "incomplete_diesel_engine", MODID + "incomplete_diesel_engine")
    ]).transitionalItem(MODID + "incomplete_diesel_engine").loops(2)
    //修改模块化柴油机配方
    event.remove({ output: "createdieselgenerators:large_diesel_engine" })
    event.recipes.advalchemy.alchemy({
        result: 'createdieselgenerators:large_diesel_engine',
        tablet: 'createdieselgenerators:diesel_engine',
        inputs: [
            'createdieselgenerators:engine_piston',
            'create:fluid_pipe',
            'alltheores:brass_plate',
            'integrateddynamics:crystalized_menril_chunk',
            'pneumaticcraft:heat_sink'
        ],        
        input_aspects: ['copper', 'copper', 'dawnstone', 'iron', 'iron'],
        aspects: { copper: [24, 24], dawnstone: [7, 7], iron: [14, 14] }
    })

    //* PCB合成
    //纸基材制备
    event.remove({ output: "minecraft:paper" })
    event.remove({ output: "create:pulp" })
    event.remove({ output: "create:cardboard" })
    event.shaped("minecraft:paper", ["   ", "AAA", "   "], { A: "farmersdelight:tree_bark" })
    event.recipes.createdieselgenerators.bulk_fermenting(
        [
            "4x create:pulp"
        ], [
        "createdieselgenerators:wood_chip",
        Fluid.of("minecraft:water", 250)
    ]
    ).processingTime(500).superheated()
    event.recipes.createMixing(
        Fluid.of(MODID + "pulp", 250), [
        Fluid.of("minecraft:water", 250),
        "4x create:pulp"
    ]
    ).heated()
    event.recipes.createdieselgenerators.bulk_fermenting(
        [
            "16x create:pulp"
        ], [
        "create:cardboard",
        Fluid.of("minecraft:water", 1000)
    ]
    ).processingTime(500).superheated()
    event.recipes.createdieselgenerators.basin_fermenting(Fluid.of(MODID + "purified_creosote", 250), Fluid.of("immersiveengineering:creosote", 1000), 20).heated().processingTime(50)
    event.recipes.create.mixing([Fluid.of("immersiveengineering:phenolic_resin", 100), MODID + "ineffective_echo_catalyst"], [Fluid.of(MODID + "purified_creosote", 250), MODID + "echo_catalyst"]).heated()
    stamping(MODID + "pulp", 1000, null, null, "create:cardboard", 1, "embers:plate_stamp")
    stamping(MODID + "pulp", 1000, null, null, "minecraft:paper", 1, "embers:flat_stamp")
    stamping("immersiveengineering:phenolic_resin", 500, "create:cardboard", 1, MODID + "paper_circuit_base", 1, "embers:flat_stamp")
    //空印刷电路板制作
    event.remove({ id: "pneumaticcraft:pressure_chamber/empty_pcb" })
    event.recipes.create.sequenced_assembly(
        ['pneumaticcraft:empty_pcb'],
        MODID + 'paper_circuit_base', [
        event.recipes.create.deploying(MODID + "incomplete_empty_pcb", [MODID + "incomplete_empty_pcb", "alltheores:copper_plate"]),
        event.recipes.create.pressing(MODID + "incomplete_empty_pcb", MODID + "incomplete_empty_pcb"),
        event.recipes.create.filling(MODID + "incomplete_empty_pcb", [MODID + "incomplete_empty_pcb", Fluid.of(MODID + "bitumen", 100)]),
        event.recipes.create.pressing(MODID + "incomplete_empty_pcb", MODID + "incomplete_empty_pcb"),
        event.recipes.create.cutting(MODID + "incomplete_empty_pcb", MODID + "incomplete_empty_pcb")
    ]
    ).transitionalItem(MODID + "incomplete_empty_pcb")
    //添加电阻配方
    pressure_chamber([["#pneumaticcraft:wiring",2],["moreburners:nickel_coil",1],["pneumaticcraft:plastic",1]],[[MODID+"resistor",1]],3.0)
    //修改晶体管配方
    event.replaceInput({ output: "pneumaticcraft:transistor" }, "minecraft:redstone", "create:polished_rose_quartz")
    //修改电容配方
    event.recipes.create.mixing([Fluid.of(MODID + "caminite",1000)],[Fluid.of("minecraft:water",1000),"4x embers:caminite_blend"])
    thermal_plant(MODID+"carbon_rod",1,MODID+"caminite",500,MODID+"caminite_capacitor_packet",1,null,null,5,100,250,3,0.3,false)
    event.replaceInput({ output: "pneumaticcraft:capacitor"}, "#c:slimeballs",MODID+"caminite_capacitor_packet")

    //蒸汽裂化炼油气
    event.recipes.createdieselgenerators.bulk_fermenting(Fluid.of(MODID + "steam_cracked_refinery_gas", 200), [Fluid.of("embers:steam", 50), Fluid.of(MODID + "refinery_gas", 200)], 20).heated().processingTime(50)
    //蒸馏蒸汽裂化炼油气
    event.recipes.createdieselgenerators.basin_fermenting(Fluid.of(MODID + "ethylene", 250), Fluid.of(MODID + "steam_cracked_refinery_gas", 500)).heated().processingTime(50)
    //加聚乙烯
    event.recipes.create.mixing([Fluid.of("pneumaticcraft:plastic", 1000), MODID + "ineffective_echo_catalyst"], [Fluid.of(MODID + "ethylene", 1000), MODID + "echo_catalyst"]).heated()
    //氯
    event.recipes.create.mixing([Fluid.of(MODID + "chlorine", 100), MODID + "echo_catalyst"], ["alltheores:salt", MODID + "ineffective_echo_catalyst"]).heated()
    //电路板制作+蚀刻液
    event.remove({ id: "pneumaticcraft:printed_circuit_board" })
    event.recipes.create.sequenced_assembly(
        'pneumaticcraft:printed_circuit_board',
        'pneumaticcraft:unassembled_pcb', [
        event.recipes.create.deploying(MODID + "incomplete_pcb", [MODID + "incomplete_pcb", "create:electron_tube"]),
        event.recipes.create.deploying(MODID + "incomplete_pcb", [MODID + "incomplete_pcb", "pneumaticcraft:capacitor"]),
        event.recipes.create.deploying(MODID + "incomplete_pcb", [MODID + "incomplete_pcb", MODID + "resistor"]),
        event.recipes.create.filling(MODID + "incomplete_pcb", [MODID + "incomplete_pcb", Fluid.of("immersivepetroleum:lubricant", 100)])
    ]
    ).transitionalItem(MODID + "incomplete_pcb").loops(3)
    event.remove({ id: "pneumaticcraft:pressure_chamber/etching_acid" })
    event.recipes.createdieselgenerators.bulk_fermenting(Fluid.of("pneumaticcraft:etching_acid", 100), [Fluid.of(MODID + "chlorine", 150), "alltheores:copper_dust", Fluid.of("minecraft:water", 100)]).superheated().processingTime(10)
})