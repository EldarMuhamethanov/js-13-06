const _ = require('lodash')

const DATA_SEPARATOR = ';'
const DATA_VALUE_SEPARATOR = ':'
const CARD_IDS_SEPARATOR = ','

function parseMapping(mapping) {
    const mappingWithoutSpaces = _.replace(mapping, /\s/g, '')
    const cardIdToNameMap = new Map()
    mappingWithoutSpaces.split(DATA_SEPARATOR).forEach(data => {
        if (!data) {
            return
        }
        const [dataName, cardIdsString] = data.split(DATA_VALUE_SEPARATOR)
        if (!dataName || !cardIdsString) {
            return;
        }

        const cardIds = cardIdsString.split(CARD_IDS_SEPARATOR)
        cardIds.forEach(id => cardIdToNameMap.set(id, dataName))
    })
    return cardIdToNameMap
}

function fetchGracePeriodLogicFromMapping (cardId, mapping = '') {
    if (!mapping || !cardId) {
        return null
    }

    const cardIdToNameMap = parseMapping(mapping)
    return cardIdToNameMap.get(cardId) || null
}

module.exports = fetchGracePeriodLogicFromMapping
