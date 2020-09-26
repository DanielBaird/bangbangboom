import React, { useState, useEffect } from 'react'
import { useSize } from 'react-use'

import './HexBoard.scss'
import variables from './_variables.scss'

import Hex from './Hex'


export default function HexBoard({grid, loc, clickHex}) {

	const side = parseInt(variables.side, 10)

    const [hexes, setHexes] = useState([])

    const [board, {width, height}] = useSize(
        ()=> { return (
            <div className="hexboard">{hexes}</div>
        )},
        {width: 100, height: 100}
    )

    useEffect( ()=> {
        if (grid) {
            const padding = {x: width/2 - side/2, y: height/2 - side}
            const offset = grid.get(loc).toPoint().subtract(padding)

            setHexes(grid.map((h, i) => {
                const coords = h.coordinates()
                const selected = (loc.x === coords.x && loc.y === coords.y)
                return (
                    <Hex key={i}
                        hex={h}
                        selected={selected}
                        offset={offset}
                        onClick={ ()=> {clickHex(h.coordinates())}}
                    />
                )
            }))
        }
    }, [grid, loc, side, width, height, clickHex])

    return (
        <div>{board}</div>
    )
}
