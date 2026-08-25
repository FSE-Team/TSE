ItemEvents.modifyTooltips(event => {
    const MODID = "tse:"
    event.add(MODID + "copper_coin", [Text.translate("tooltip.tse.copper_coin0"),Text.translate("tooltip.tse.copper_coin")])
    event.add(MODID + "compressed_iron_coin", [Text.translate("tooltip.tse.compressed_iron_coin0"),Text.translate("tooltip.tse.compressed_iron_coin")])
    event.add(MODID + "gold_coin", [Text.translate("tooltip.tse.gold_coin0"),Text.translate("tooltip.tse.gold_coin")])
})