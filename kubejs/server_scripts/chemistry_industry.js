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


    //大气分离
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"air",500),"minecraft:sponge"],["minecraft:sponge"]).secondaryFluidOutput(0).processingTime(100)
    thermal_plant(null,null,MODID+"air",1000,null,null,MODID+"liquid_air",500,8.0,-200,-180,1,1,false)
    event.recipes.createdieselgenerators.distillation(
        [
            Fluid.of(MODID+"oxygen",200),
            Fluid.of(MODID+"nitrogen",800)
        ],
        Fluid.of(MODID+"liquid_air")
    )

    //水煤气
    event.recipes.createdieselgenerators.basin_fermenting(
        [
            Fluid.of(MODID + "carbon_monoxide", 100),
            Fluid.of(MODID + "hydrogen", 100)
        ],[
            Fluid.of("minecraft:water", 100),
            Fluid.of(MODID+"carbon_dioxide",100)
        ], 20
    ).superheated()
    
    //硝酸
    event.remove({id:"create:milling/sandstone"})
    event.remove({id:"immersiveengineering:crusher/sandstone"})
    event.remove({id:"immersiveengineering:crusher/red_sandstone"})
    event.recipes.create.crushing(["2x minecraft:sand",CreateItem.of('immersiveengineering:dust_saltpeter',0.5)],Ingredient.of('#c:sandstone/uncolored_blocks'))
    event.recipes.create.crushing(["2x minecraft:red_sand",CreateItem.of('immersiveengineering:dust_saltpeter',0.5)],Ingredient.of('#c:sandstone/red_blocks'))
    event.custom({
        "type": "immersiveengineering:crusher",
        "energy": 3200,
        "input": {
            "tag": "c:sandstone/red_blocks"
        },
        "result": {
            "count": 2,
            "id": "minecraft:red_sand"
        },
        "secondaries": [
            {
              "output": {
                "tag": "c:dusts/saltpeter"
              }
            }
        ]
    })
    event.custom({
        "type": "immersiveengineering:crusher",
        "energy": 3200,
        "input": {
            "tag": "c:sandstone/uncolored_blocks"
        },
        "result": {
            "count": 2,
            "id": "minecraft:sand"
        },
        "secondaries": [
            {
              "output": {
                "tag": "c:dusts/saltpeter"
              }
            }
        ]
    })
    event.recipes.createdieselgenerators.bulk_fermenting(
        [Fluid.of(MODID+"nitric_acid",100),Fluid.of(MODID+"sodium_hydrogen_sulfate",100)],
        [Ingredient.of("#c:dusts/saltpeter"),Fluid.of(MODID+"sulfuric_acid",100)]
    ).heated()

    //硫酸
    event.recipes.vintageimprovements.pressurizing(Fluid.of(MODID+"sulfur_dioxide",100),[Ingredient.of("#c:dusts/sulfur"),Fluid.of(MODID+"oxygen",100)]).heated().secondaryFluidOutput(0).processingTime(200)
    event.recipes.vintageimprovements.pressurizing([Fluid.of(MODID+"sulfur_trioxide",100),CreateItem.of("alltheores:platinum_dust",0.9999)],[Fluid.of(MODID+"sulfur_dioxide",100),"alltheores:platinum_dust",Fluid.of(MODID+"oxygen",100)]).superheated().secondaryFluidOutput(0).processingTime(100)
    event.recipes.createdieselgenerators.bulk_fermenting(Fluid.of(MODID+"sulfuric_acid",100),[Fluid.of(MODID+"sulfur_trioxide",100),Fluid.of("minecraft:water",100)]).processingTime(500).heated()
    event.recipes.createdieselgenerators.bulk_fermenting(Fluid.of(MODID+"oleum",100),[Fluid.of(MODID+"sulfur_trioxide",10),Fluid.of(MODID+"sulfuric_acid",100)]).processingTime(50)
    event.recipes.create.mixing(Fluid.of(MODID+"sulfuric_acid",150),[Fluid.of(MODID+"oleum",100),Fluid.of("minecraft:water",100)])

    //盐酸
    event.recipes.create.mixing([Fluid.of(MODID+"hydrochloric_acid",100),Fluid.of(MODID+"sodium_hydrogen_sulfate",100)],[Fluid.of(MODID+"sulfuric_acid",100),"alltheores:salt"])
    event.recipes.createdieselgenerators.bulk_fermenting([MODID+"sodium_sulfate",Fluid.of(MODID+"hydrochloric_acid",100)],["alltheores:salt",Fluid.of(MODID+"sodium_hydrogen_sulfate",100)]).heated()
    
    //次氯酸钠
    thermal_plant(null,null,MODID+"sodium_hydroxide",100,null,null,MODID+"cold_sodium_hydroxide",100,null,-10,10,1,1,false)
    event.recipes.create.mixing([Fluid.of(MODID+"sodium_hypochlorite",100),"alltheores:salt"],[Fluid.of(MODID+"chlorine",100),Fluid.of(MODID+"cold_sodium_hydroxide",200)])

    //氯气
    event.recipes.create.mixing(MODID+"lead_monoxide","alltheores:lead_dust").heated()
    event.recipes.createdieselgenerators.bulk_fermenting(MODID+"red_lead",["3x "+MODID+"lead_monoxide",Fluid.of(MODID+"oxygen",100)]).heated()
    event.recipes.createdieselgenerators.bulk_fermenting(
        [MODID+"lead_dioxide",Fluid.of("minecraft:water",200),Fluid.of(MODID+"lead_nitrate",200)],
        [MODID+"red_lead",Fluid.of(MODID+"nitric_acid",400)]
    )
    event.recipes.createdieselgenerators.bulk_fermenting(
        [Fluid.of(MODID + "chlorine", 100),Fluid.of(MODID+"lead_chloride",100)],
        [MODID+"lead_dioxide",Fluid.of(MODID+"hydrochloric_acid",400)]
    ).heated()
    
    //制碱
    event.recipes.create.mixing([Fluid.of(MODID+"carbon_dioxide",200),MODID+"sodium_sulfide"],[MODID+"sodium_sulfate",Ingredient.of("#minecraft:coals",2)]).superheated()
    event.recipes.create.mixing([Item.of(MODID+"sodium_carbonate"),MODID+"calcium_sulfide"],[MODID+"sodium_sulfide","create:limestone"]).superheated()
    event.recipes.createdieselgenerators.bulk_fermenting(["create:limestone",Fluid.of(MODID+"hydrogen_sulfide",100)],[MODID+"calcium_sulfide",Fluid.of(MODID+"carbon_dioxide",100),Fluid.of("minecraft:water",100)]).heated()
    event.recipes.createdieselgenerators.bulk_fermenting(["2x alltheores:sulfur",Fluid.of("minecraft:water",200)],[Fluid.of(MODID+"hydrogen_sulfide",200),Fluid.of(MODID+"oxygen",100)]).heated()
    event.recipes.create.mixing(Fluid.of(MODID+"sodium_carbonate",100),[Fluid.of("minecraft:water",100),Item.of(MODID+"sodium_carbonate")])
    thermal_plant(MODID+"calcium_hydroxide",1,MODID+"sodium_carbonate",100,"create:limestone",1,MODID+"sodium_hydroxide",100,3,-20,10,1,1,true)

    //铅回收
    event.recipes.create.mixing([MODID+"lead_carbonate",Item.of('immersiveengineering:dust_saltpeter',2)],[MODID+"sodium_carbonate",Fluid.of(MODID+"lead_nitrate",100)])
    event.recipes.createdieselgenerators.basin_fermenting([MODID+"lead_monoxide",Fluid.of(MODID+"carbon_dioxide",100)],MODID+"lead_carbonate").superheated().processingTime(20)
    event.recipes.vintageimprovements.vacuumizing(Item.of(MODID+"lead_chloride"),Fluid.of(MODID+"lead_chloride",100)).processingTime(50)
    event.recipes.createdieselgenerators.bulk_fermenting([MODID+"lead_dioxide","3x alltheores:salt",Fluid.of("minecraft:water",100)],[Fluid.of(MODID+"sodium_hypochlorite",100),Fluid.of(MODID+"sodium_hydroxide",200),Item.of(MODID+"lead_chloride")]).processingTime(20)


})