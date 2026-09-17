ServerEvents.recipes( event => {
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

    
    //* 矿物处理
    //铝
    event.remove({input:"alltheores:raw_aluminum",output:"alltheores:aluminum_ingot"})
    event.remove({input:"#c:ores/aluminum",output:"alltheores:aluminum_ingot"})
    event.remove({input:"create:crushed_raw_aluminum",output:"alltheores:aluminum_ingot"})
    event.remove({input:"create:crushed_raw_aluminum",output:"alltheores:aluminum_nugget"})
    event.remove({id:"immersiveengineering:crusher/raw_ore_aluminum"})
    event.remove({id:"immersiveengineering:crusher/ore_aluminum"})
    //下界合金
    //event.remove({id:"minecraft:netherite_ingot"})
    //硫-增生
    event.recipes.vintageimprovements.vacuumizing([Fluid.of(MODID+"carbon_dioxide",100),Fluid.of(MODID+"molten_ash_crystal",500)],"embers:ember_crystal_cluster").superheated().secondaryFluidOutput(0).processingTime(20)
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"molten_sulfur",100),
            Fluid.of("embers:dwarven_oil",100),
            Fluid.of(MODID+"carbon_monoxide",100),
            Fluid.of("embers:dwarven_gas",200)
        ],
        Fluid.of(MODID+"molten_ash_crystal",500)
    ).superheated().processingTime(10)
    thermal_plant("alltheores:sulfur",1,MODID+"molten_sulfur",100,"alltheores:sulfur",2,null,null,-0.5,null,100,1,1,true)
    thermal_plant("immersiveengineering:dust_sulfur",1,MODID+"molten_sulfur",100,"alltheores:sulfur",2,null,null,-0.5,null,100,1,1,true)
})