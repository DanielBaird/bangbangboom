import React from 'react'
import './Hex.scss'

import { hexBody } from '../libraries/buildhexes'
import hexData from '../data/hexes.json'

let hexes = {}

// --------------------------------------------------------
Object.entries(hexData).forEach( ([id, h])=> {
    hexes[h.type] = hexes[h.type] || {}
    hexes[h.type][id] = h
})
// --------------------------------------------------------
export function getHexByType(type) {
    if (hexes[type]) {
        const ids = Object.keys(hexes[type])
        // console.log(`type ${type} has ${ids.length}: ` + ids)
        // console.log(~~(Math.random() * ids.length))
        const id = ids[~~(Math.random() * ids.length)]
        return hexes[type][id]
    } else {
        return null
    }
}
// --------------------------------------------------------
export function hexToHtml(hex) {
    const edgeList = hex.edges[~~(Math.random() * hex.edges.length)]
    hex.edgeList = edgeList
    return hexBody(hex, edgeList).join('\n')
}
// --------------------------------------------------------
export default function Hex({hex, selected=false, offset, onClick}) {
    const pt = hex.toPoint()
    const {x, y} = pt.subtract(offset)
    let classes = ['hex', hex.data.id]
    if (selected) { classes.push('selected') }
    return (
        <div
            className={classes.join(' ')}
            style={{left:`${x}px`, top:`${y}px`}}
            onClick={onClick}
            dangerouslySetInnerHTML={{__html: hexToHtml(hex.data)}}
        />
    )
}
// --------------------------------------------------------
