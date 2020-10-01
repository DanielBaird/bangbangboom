import { hexBody } from '../libraries/buildhexes'
import hexData from '../data/hexes.json'

//  x: y means if you run out of x hexes, fall back to y
const fallbacks = {
	'farmland': 'plains'
}

let hexes = {}

// --------------------------------------------------------
Object.entries(hexData).forEach( ([id, h])=> {
	// create the type, if this is the first
    hexes[h.type] = hexes[h.type] || []

	// loop the hex edgeLists and add one of each
	h.edges.forEach( (e) => {
		let newH = {...h}
		newH.edgeList = e
		hexes[h.type].push(newH)
		console.log(`added a ${h.type} hex`)
	})
    // hexes[h.type][id] = h
})
// --------------------------------------------------------
export function getHexByType(type) {
	console.log(`providing a ${type} hex`)
	let h = null
	let t = type
	while (h === null) {
		h = getHexByTypeNoFallback(t)
		if (fallbacks[t]) {
			t = fallbacks[t]
		} else {
			break
		}
	}
	if (h === null) {
		h = getHexByTypeNoFallback('impassable')
	}
	return h
}
// --------------------------------------------------------
export function getHexByTypeNoFallback(type) {
	if (type === 'blank' || type === 'impassable') {
        return hexes[type][0]
	} else if (hexes[type] && hexes[type].length) {
		const randomHex = ~~(Math.random() * hexes[type].length)
		console.log(hexes[type])
		console.log(randomHex)
        return hexes[type].splice(randomHex, 1)[0]
    } else {
		console.log(`ran out of ${type}`)
        return null
    }
}
// --------------------------------------------------------
export function hexToHtml(hex) {
    return hexBody(hex, hex.edgeList).join('\n')
}
// --------------------------------------------------------
