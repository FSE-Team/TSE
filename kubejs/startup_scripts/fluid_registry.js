const $SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')

StartupEvents.registry("fluid", event => {
    const MODID = "tse:"
    const reg = (id, type, color) => {
        if(type == "thin") {
            event.create(MODID + id, "thin")
                //.translationKey("fluid.tse." + id)
                //.formattedDisplayName("Test")
                .noBlock()
                .tint(color)
                .type(type => type
                    .renderType(3)
                    .stillTexture('kubejs:block/thin_fluid_still')
                    .flowingTexture('kubejs:block/thin_fluid_flow')
                    .fallDistanceModifier(0)
                    .addDripstoneDripping(1, $ParticleTypes.DRIPPING_DRIPSTONE_WATER, 'minecraft:water_cauldron', $SoundEvents.POINTED_DRIPSTONE_DRIP_WATER)
                )
        } else {
            event.create(MODID + id, "thick")
                //.translationKey("fluid.tse." + id)
                //.formattedDisplayName("Test")
                .noBlock()
                .tint(color)
                .slopeFindDistance(2)
                .type(type => type
                    .renderType(0)
                    .stillTexture('kubejs:block/thick_fluid_still')
                    .flowingTexture('kubejs:block/thick_fluid_flow')
                    .canSwim(false)
                    .canDrown(false)
                    .density(3000)
                    .viscosity(6000)
                    .addDripstoneDripping(1, $ParticleTypes.DRIPPING_DRIPSTONE_LAVA, 'minecraft:lava_cauldron', $SoundEvents.POINTED_DRIPSTONE_DRIP_LAVA)
                )
        }
    }
    //* 气体
    //大气及单质气体
    reg("air","thin",0xBBBBBB)
    reg("liquid_air","thin",0xCCCCCC)
    reg("nitrogen","thin",0xFFC727)
    reg("oxygen", "thin", 0x1785FF)
    reg("hydrogen", "thin", 0x17FFE0)
    reg("chlorine","thin",0x4BB900)
     
    //氧化物类
    reg("carbon_dioxide","thin",0x707070)
    reg("carbon_monoxide","thin",0xABABAB)
    reg("sulfur_trioxide","thin",0xFEA142)
    reg("sulfur_dioxide","thin",0xF4CE48)

    //无机其他气体
    reg("dirty_steam", "thick", 0xEEEEEE)
    reg("hydrogen_sulfide","thin",0xAEAE4B)
    reg("ammonia","thin",0xE1FF37)

    //烷、烯
    reg("mathane","thin",0xFF4C4C)
    reg("ethane","thin",0x89B4E0)
    reg("propane","thin",0xFFFD84)
    reg("butane","thin",0xAA1000)
    reg("ethylene", "thin", 0xF1F1F1)
    reg("propylene","thin",0xD9CB5A)
    reg("butene","thin",0xB36E25)

    //其他有机气体
    reg("sulfuric_refinery_gas", "thin", 0xE9E9E9)
    reg("refinery_gas", "thin", 0xE9E9E9)
    reg("steam_cracked_refinery_gas", "thin", 0xE9E9E9)
    reg("steam_cracked_light_oil_gas","thin",0xD9D302)
    reg("steam_cracked_heavy_oil_gas","thin",0xB3AE0E)
    reg("steam_cracked_naphtha_gas", "thin", 0xFFE9E9)

    //* 液体
    //无机酸碱
    reg("heavy_water","thin",0x002B82)
    reg("oleum","thin",0xD79B00)
    reg("sulfuric_acid", "thin", 0xB69E16)
    reg("nitric_acid","thin",0xECEBD8)
    reg("hydrochloric_acid", "thin", 0x2DA41D)
    reg("sodium_hydroxide","thin",0xEAFCFE)
    reg("cold_sodium_hydroxide","thin",0xECFEFF)

    //无机盐溶液（A-Z）
    reg("ammonium_chloride","thin",0xB1CB9A)
    reg("lead_nitrate","thin",0x2C3A4D)
    reg("lead_chloride","thin",0x425F6A)
    reg("sodium_bicarbonate","thin",0xC0D5D2)
    reg("sodium_carbonate","thin",0xB4C5C7)
    reg("sodium_hydrogen_sulfate","thin",0xFFE3B4)
    reg("sodium_hypochlorite","thin",0xD4EB96)

    //醇
    reg("methanol", "thin", 0xDDDDDD)
    reg("soul_alcohol", "thin", 0x4A362D)

    //高碳烷、烯
    reg("octane","thin",0x760B00)

    //苯、酚
    reg("benzene","thin",0x48392C)
    reg("methylbenzene","thin",0x6A5441)


    //其他有机液体
    reg("liquid_unprocessed_sulfurated_rubber", "thick", 0x4F4644)
    reg("sulfuric_naphtha", "thin", 0xD2C6C5)
    reg("steam_cracked_naphtha", "thin", 0xFFE9E9)
    reg("sulfuric_light_oil", "thin", 0xF9F322)
    reg("light_oil", "thin", 0xF9F322)
    reg("steam_cracked_light_oil","thin",0xD9D302)
    reg("hydro_cracked_light_oil","thin",0xCEEC2A)
    reg("sulfuric_heavy_oil", "thin", 0xD3CE1E)
    reg("heavy_oil", "thin", 0xD3CE1E)
    reg("steam_cracked_heavy_oil","thin",0xB3AE0E)
    reg("hydro_cracked_heavy_oil","thin",0xDAE975)
    reg("dirty_lubricant", "thin", 0xB66616)

    //其他混合液体
    reg("pulp", "thick", 0xDDB179)
    reg("bitumen", "thick", 0x180D3C)
    reg("processed_crude", "thick", 0x222222)
    reg("purified_creosote", "thin", 0x714627)
    reg("caminite", "thick", 0xCBB38E)

    //熔融物质
    reg("liquid_steel", "thick", 0xFF7700)
    reg("molten_sulfur","thick",0xF4CE48)
    reg("molten_ash_crystal","thick",0xFF6E00)

    //深渊类
    reg("recycled_echo_liquid", "thin", 0x082A34)

})
