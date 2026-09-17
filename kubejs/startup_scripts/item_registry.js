StartupEvents.registry("item", event => {
    const MODID = "tse:"
    const dust = (id, color) => {
        event.create(MODID + id)
            .parentModel("tse:item/dust_base")
            .texture("tse:item/dust_base")
            .color(0, color)
    }

    //* 货币
    event.create(MODID + "copper_coin")
    event.create(MODID + "compressed_iron_coin")
    event.create(MODID + "gold_coin")

    //* 粉末类
    //晶体粉末
    event.create(MODID + "amethyst_dust")
    event.create(MODID + "quartz_dust")
    //矿物粉末
    dust("limestone_dust",0xF5F2BE)

    //* 材料类
    //板
    event.create(MODID + "andesite_alloy_plate")
    event.create(MODID + "echo_shard_plate")
    event.create(MODID + "plate_iron_compressed")
    //杆
    event.create(MODID + "carbon_rod")
    //电容
    event.create(MODID + "caminite_capacitor_packet")
    //电阻
    event.create(MODID + "resistor")
    //电路板
    event.create(MODID + "paper_circuit_base")
    //火花塞
    event.create(MODID + "spark_plug")
    //硫化橡胶
    event.create(MODID + "unprocessed_sulfurated_rubber")
    event.create(MODID + "sulfurated_rubber")
    //琢刻玫瑰石英
    event.create(MODID + "carved_rose_quartz")
    event.create(MODID + "incomplete_carved_rose_quartz", "create:sequenced_assembly")

    //* 构件类
    event.create(MODID + "andesite_mechanism")
    event.create(MODID + "incomplete_andesite_mechanism", "create:sequenced_assembly")
    event.create(MODID + "sealed_mechanism")
    event.create(MODID + "incomplete_sealed_mechanism", "create:sequenced_assembly")
    event.create(MODID + "ember_mechanism")
    event.create(MODID + "incomplete_ember_mechanism", "create:sequenced_assembly")
    event.create(MODID + "echo_mechanism")
    event.create(MODID + "incomplete_echo_mechanism", "create:sequenced_assembly")
    event.create(MODID + "advanced_ember_mechanism")
    event.create(MODID + "incomplete_advanced_ember_mechanism", "create:sequenced_assembly")
    event.create(MODID + "advanced_sealed_mechanism")
    event.create(MODID + "incomplete_advanced_sealed_mechanism", "create:sequenced_assembly")
    event.create(MODID + "menril_mechanism")
    event.create(MODID + "incomplete_menril_mechanism", "create:sequenced_assembly")

    //* 深渊类
    //深渊催化
    event.create(MODID + "echo_catalyst")
    event.create(MODID + "ineffective_echo_catalyst")
    event.create(MODID + "iron_ingot_with_echo_impurity")

    //* 组装类
    //回响碎片增生
    event.create(MODID + "duplicating_echo_shard", "create:sequenced_assembly")
    //动态联合
    event.create(MODID + "incomplete_variable_transformer_output", "create:sequenced_assembly")
    event.create(MODID + "incomplete_variable_transformer_input", "create:sequenced_assembly")
    //电路板
    event.create(MODID + "incomplete_empty_pcb",'create:sequenced_assembly')
    event.create(MODID + "incomplete_pcb",'create:sequenced_assembly')
    //柴油引擎
    event.create(MODID + "incomplete_diesel_engine", "create:sequenced_assembly")

    //* 化学品
    //氧化物
    dust("lead_monoxide",0x9998C2)
    dust("lead_dioxide",0x2E2D4D)
    dust("red_lead",0x73230A)
    dust("quicklime",0xB6B369)
    //碳酸盐
    dust("sodium_carbonate",0xB4C5C7)
    dust("lead_carbonate",0x2E374C)
    //氯盐
    dust("lead_chloride",0x425F6A)
    //硝酸盐
    dust("lead_nitrate",0x2C3A4D)
    //硫化物
    dust("sodium_sulfide",0xFFEEC7)
    dust("calcium_sulfide",0xB49244)
    //硫酸盐
    dust("sodium_sulfate",0xE4C096)
    //碱
    dust("calcium_hydroxide",0xEEF1D8)

})