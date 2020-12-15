import React from 'react'
import { hexToHtml } from '../libraries/hexPool'
import './Hex.scss'

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
