// By Tonywww
// 原始整合包：RePalmon
// 规则配置
const almostUnifiedConfig = {
    "modPriorities": [
        "minecraft",
        "alltheores",
        "kubejs",
        "avaritia",
        "tfc",
        "thermal",
        "tconstruct",
        "create",
        "techreborn",
        "immersiveengineering",
        "mekanism"
    ],
    "specialRules": {
        "forge:ores/{material}": {
            "modPriorities": [
            "minecraft",
            "alltheores",
            "kubejs",
            "avaritia",
            "thermal",
            "tconstruct",
            "create",
            "techreborn",
            "immersiveengineering",
            "mekanism"
        ],
            "blacklist": [
                "tfc"
            ]
        }
    },
    "tags": [
        "forge:nuggets/{material}",
        "forge:dusts/{material}",
        "forge:gears/{material}",
        "forge:gems/{material}",
        "forge:ingots/{material}",
        "forge:raw_materials/{material}",
        "forge:ores/{material}",
        "forge:plates/{material}",
        "forge:rods/{material}",
        "forge:wires/{material}",
        "forge:storage_blocks/{material}",
        "forge:storage_blocks/raw_{material}"
    ],
    "materials": [
        "aeternium",
        "aluminum",
        "amber",
        "apatite",
        "bitumen",
        "brass",
        "bronze",
        "charcoal",
        "chrome",
        "cinnabar",
        "coal",
        "coal_coke",
        "cobalt",
        "constantan",
        "copper",
        "diamond",
        "electrum",
        "elementium",
        "emerald",
        "enderium",
        "fluorite",
        "gold",
        "graphite",
        "invar",
        "iridium",
        "iron",
        "lapis",
        "lead",
        "lumium",
        "mithril",
        "netherite",
        "nickel",
        "obsidian",
        "osmium",
        "peridot",
        "platinum",
        "potassium_nitrate",
        "ruby",
        "sapphire",
        "signalum",
        "silver",
        "steel",
        "sulfur",
        "tin",
        "tungsten",
        "uranium",
        "zinc",
        "titanium",
        "chromium",
        "stainless_steel",
        "lithium",
        "bismuth",
        "rose_gold"
    ]
}

// 生成所有可能的标签
const generateAllTags = () => {
    let allTags = []

    for (let tagTemplate of almostUnifiedConfig.tags) {
        for (let material of almostUnifiedConfig.materials) {
            let tag = tagTemplate.replace("{material}", material)
            allTags.push(tag)
        }
    }

    return allTags
}

// 获取物品的模组ID
const getModId = (itemId) => {
    if (itemId.includes(":")) {
        return itemId.split(":")[0]
    }
    return "minecraft"
}

// 获取标签对应的模板
const getTagTemplate = (tagId) => {
    for (let template of almostUnifiedConfig.tags) {
        // 将模板转换为正则表达式来匹配标签
        let regex = template.replace("{material}", "([a-z_]+)")
        let match = tagId.match(new RegExp("^" + regex + "$"))
        if (match) {
            return template
        }
    }
    return null
}

// 检查mod是否在黑名单中
const isModBlacklisted = (tagId, modId) => {
    let template = getTagTemplate(tagId)
    
    if (template && almostUnifiedConfig.specialRules[template]) {
        let specialRule = almostUnifiedConfig.specialRules[template]
        if (specialRule.blacklist && specialRule.blacklist.includes(modId)) {
            return true
        }
    }
    
    return false
}

// 根据标签获取对应的mod优先级
const getModPriorityForTag = (tagId, modId) => {
    let template = getTagTemplate(tagId)
    
    // 检查是否有特殊规则
    if (template && almostUnifiedConfig.specialRules[template]) {
        let specialRule = almostUnifiedConfig.specialRules[template]
        
        // 检查modPriorities字段
        let specialPriorities = specialRule.modPriorities || specialRule
        if (Array.isArray(specialPriorities)) {
            let index = specialPriorities.indexOf(modId)
            return index === -1 ? 999 : index
        }
    }
    
    // 使用默认优先级
    let index = almostUnifiedConfig.modPriorities.indexOf(modId)
    return index === -1 ? 999 : index
}

// 将标签名转换为文件名
const tagToFileName = (tagId) => {
    return tagId.replace(/:/g, "_").replace(/\//g, "_")
}

// 单个标签的规则匹配
const processTag = (tagId) => {
    let tagItems = Ingredient.of(`#${tagId}`).getItemIds()

    if (tagItems.length === 0) {
        return null
    }

    // 过滤黑名单中的物品
    let filteredItems = tagItems.toArray().filter(itemId => {
        let modId = getModId(itemId)
        let isBlacklisted = isModBlacklisted(tagId, modId)
        if (isBlacklisted) {
            console.log(`  过滤黑名单物品: ${itemId} (模组: ${modId})`)
        }
        return !isBlacklisted
    })

    if (filteredItems.length === 0) {
        console.log(`标签 ${tagId} 所有物品都在黑名单中，跳过处理`)
        return null
    }

    // 跳过一个物品
    if (filteredItems.length === 1) {
        console.log(`标签 ${tagId} 过滤后只有一个物品，跳过处理`)
        return null
    }

    // 检查是否使用特殊规则
    let template = getTagTemplate(tagId)
    let usingSpecialRule = template && almostUnifiedConfig.specialRules[template]
    
    // 按模组优先级排序（使用特殊规则或默认规则）
    let sortedItems = filteredItems.sort((a, b) => {
        let modA = getModId(a)
        let modB = getModId(b)
        let priorityA = getModPriorityForTag(tagId, modA)
        let priorityB = getModPriorityForTag(tagId, modB)

        if (priorityA !== priorityB) {
            return priorityA - priorityB
        }

        // 如果优先级相同，按物品ID排序
        return a.localeCompare(b)
    })

    // 获取最高优先级的物品
    let result = sortedItems[0]
    let rest = sortedItems.slice(1)

    // 统计黑名单过滤的物品数量
    let blacklistedCount = tagItems.length - filteredItems.length

    return {
        tag: tagId,
        result: result,
        resultMod: getModId(result),
        rest: rest,
        totalItems: tagItems.length,
        filteredItems: filteredItems.length,
        blacklistedCount: blacklistedCount,
        usingSpecialRule: usingSpecialRule,
        ruleType: usingSpecialRule ? "特殊规则" : "默认规则"
    }
}

// 主要的规则匹配功能
const performAlmostUnifiedMatching = () => {
    console.log("Almost Unified OEI 匹配开始")

    let allTags = generateAllTags()
    let results = []
    let skippedCount = 0

    for (let tagId of allTags) {
        let result = processTag(tagId)
        if (result !== null) {
            results.push(result)

            let jsonOutput = JSON.stringify([{
                "matchItems": result.rest,
                "resultItems": result.result
            }], null, 2)

            console.log(`标签: ${result.tag} (${result.ruleType})`)
            console.log(`  结果: ${result.result} (来自模组: ${result.resultMod})`)
            console.log(`  其他物品: [${result.rest.join(", ")}]`)
            console.log(`  总物品数: ${result.totalItems}, 过滤后: ${result.filteredItems}`)
            if (result.blacklistedCount > 0) {
                console.log(`  黑名单过滤: ${result.blacklistedCount} 个物品`)
            }

            // 保存JSON
            let fileName = tagToFileName(tagId)
            let path = "oei_out/" + fileName + ".json"
            console.log(path, jsonOutput)
            FilesJS.writeFile(path, jsonOutput)

            console.log(`结果已保存到文件: ${path}`)
            console.log("")
        } else {
            // tag单物品或被黑名单过滤
            let tagItems = Ingredient.of(`#${tagId}`).getItemIds()
            if (tagItems.length >= 1) {
                skippedCount++
            }
        }
    }

    console.log(`=== 匹配完成，共处理 ${results.length} 个多物品标签，跳过 ${skippedCount} 个标签 ===`)

    return results
}

// 开始生成
BlockEvents.rightClicked('minecraft:diamond_block', event => {
    if (event.item.id === 'minecraft:diamond') {
        console.log("开始执行Almost Unified规则匹配...")

        performAlmostUnifiedMatching()
        event.player.tell("开始生成")
        event.cancel()
    }
})
