import React, { useState, useEffect } from 'react'

import './HexBoard.scss'
import variables from './_variables.scss'

import Hex from './Hex'


export default function HexBoard({grid, loc, clickHex}) {

	const side = parseInt(variables.side, 10)
	const offset = {x: -1 * side, y: -1/2 * side}
	const [hexes, setHexes] = useState([])

	useEffect( ()=>{
		let sw = document.querySelector('.scrollwrapper')
		let sh = document.querySelector('.hex.selected')
		if (sw && sh) {
			// sh.scrollIntoView({behavior: 'smooth'})
 			console.log(sh.offsetTop - (sw.clientHeight / 2))
			console.log(sh.offsetLeft - (sw.clientWidth / 2))
			sw.scroll({
				top: sh.offsetTop - (sw.clientHeight / 2) + (sh.clientHeight / 2),
				left: sh.offsetLeft - (sw.clientWidth / 2) + (sh.clientWidth / 2),
				behavior: 'smooth'
			})
		}
	}, [grid, loc])

	if (grid) {
		let newHexes = grid.map((h, i) => {
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
		})

		const w = grid.pointWidth() + side
		const h = grid.pointHeight() + side
		return (
			<div className="scrollwrapper">
				<div className="hexboard" style={{width: `${w}px`, height: `${h}px`}}>
					{newHexes}
				</div>
			</div>
		)
	} else {
		return "loading..."
	}

}
