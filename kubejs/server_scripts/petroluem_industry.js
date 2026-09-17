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

    //* 石化-create 1/2
    const PPJA = "createdieselgenerators:pumpjack_"
    const PPJB = ["hole", "bearing", "crank", "head"]
    for (var a = 0; a < 4; a++) {
        event.remove({ output: PPJA + PPJB[a] })
    }

    //初级分馏
    event.remove({ type: "immersivepetroleum:distillation" })
    event.remove({ type: "createdieselgenerators:distillation" })
    event.remove({ type: "pneumaticcraft:refinery" })
    const crude = ['immersivepetroleum:crudeoil', 'pneumaticcraft:oil', 'createdieselgenerators:crude_oil']
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID + "processed_crude", 100),
            Fluid.of("embers:soul_crude", 75),
            Fluid.of("immersivepetroleum:lubricant", 50),
            Fluid.of("immersivepetroleum:diesel_sulfur", 100),
            Fluid.of("immersivepetroleum:kerosene", 100),
            Fluid.of("industrialforegoing:ether_gas", 100)
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

    //裂化
    //蒸汽裂化炼油气
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"steam_cracked_refinery_gas",200),"alltheores:copper_dust"],[Fluid.of("embers:steam",100),Fluid.of(MODID+"refinery_gas",100),"alltheores:copper_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(200)
    //裂化重燃油
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"steam_cracked_heavy_oil",500),"alltheores:platinum_dust"],[Fluid.of("embers:steam",500),Fluid.of(MODID+"heavy_oil",500),"alltheores:platinum_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(500)
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"hydro_cracked_heavy_oil",500),"alltheores:platinum_dust"],[Fluid.of(MODID+"hydrogen",500),Fluid.of(MODID+"heavy_oil",500),"alltheores:platinum_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(500)
    //裂化轻燃油
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"steam_cracked_light_oil",500),"alltheores:iron_dust"],[Fluid.of("embers:steam",500),Fluid.of(MODID+"light_oil",500),"alltheores:iron_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(300)
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"hydro_cracked_light_oil",500),"alltheores:iron_dust"],[Fluid.of(MODID+"hydrogen",500),Fluid.of(MODID+"light_oil",500),"alltheores:iron_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(300)
    //蒸汽裂化石脑油
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"steam_cracked_naphtha",500),"alltheores:nickel_dust"],[Fluid.of("embers:steam",500),Fluid.of("immersivepetroleum:naphtha",500),"alltheores:nickel_dust"]).superheated().secondaryFluidInput(0).secondaryFluidOutput(0).processingTime(300)

    //分馏裂化产物
    //分馏蒸汽裂化炼油气
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"propylene",50),
            Fluid.of(MODID+"ethane",50),
            Fluid.of(MODID+"ethylene",100),
            Fluid.of(MODID+"mathane",200)
        ],
        Fluid.of(MODID+"steam_cracked_refinery_gas",500)
    ).heated()
    //分馏裂化轻燃油
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of("immersivepetroleum:naphtha",50),
            Fluid.of(MODID+"methylbenzene",50),
            Fluid.of(MODID+"benzene",150),
            Fluid.of(MODID+"steam_cracked_light_oil_gas",700)
        ],
        Fluid.of(MODID+"steam_cracked_light_oil",1000)
    ).heated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"butene",50),
            Fluid.of(MODID+"propane",50),
            Fluid.of(MODID+"propylene",250),
            Fluid.of(MODID+"ethane",50),
            Fluid.of(MODID+"ethylene",250),
            Fluid.of(MODID+"mathane",250)
        ],
        Fluid.of(MODID+"steam_cracked_light_oil_gas",700)
    ).superheated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of("immersivepetroleum:naphtha",200),
            Fluid.of(MODID+"octane",50),
            Fluid.of(MODID+"butane",100),
            Fluid.of(MODID+"propane",150),
            Fluid.of(MODID+"ethane",1000),
            Fluid.of(MODID+"mathane",1000)
        ],
        Fluid.of(MODID+"hydro_cracked_light_oil",1000)
    ).heated()
    //分馏裂化重燃油
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"light_oil",100),
            Fluid.of("immersivepetroleum:naphtha",150),
            Fluid.of(MODID+"methylbenzene",100),
            Fluid.of(MODID+"benzene",400),
            Fluid.of(MODID+"steam_cracked_heavy_oil_gas",500)
        ],
        Fluid.of(MODID+"steam_cracked_heavy_oil",1000)
    ).heated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"butene",100),
            Fluid.of(MODID+"propane",50),
            Fluid.of(MODID+"propylene",100),
            Fluid.of(MODID+"ethane",50),
            Fluid.of(MODID+"ethylene",150),
            Fluid.of(MODID+"mathane",150)
        ],
        Fluid.of(MODID+"steam_cracked_heavy_oil_gas",500)
    ).superheated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"light_oil",200),
            Fluid.of("immersivepetroleum:naphtha",250),
            Fluid.of(MODID+"butane",300),
            Fluid.of(MODID+"propane",300),
            Fluid.of(MODID+"ethane",200),
            Fluid.of(MODID+"mathane",200)
        ],
        Fluid.of(MODID+"hydro_cracked_heavy_oil",1000)
    ).heated()
    //分馏裂化石脑油
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"methylbenzene",50),
            Fluid.of(MODID+"benzene",100),
            Fluid.of(MODID+"steam_cracked_naphtha_gas",800)
        ],
        Fluid.of(MODID+"steam_cracked_naphtha",1000)
    ).heated()
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"butene",50),
            Fluid.of(MODID+"propane",50),
            Fluid.of(MODID+"propylene",300),
            Fluid.of(MODID+"ethane",50),
            Fluid.of(MODID+"ethylene",50),
            Fluid.of(MODID+"mathane",500)
        ],
        Fluid.of(MODID+"steam_cracked_naphtha_gas",800)
    ).superheated()
})