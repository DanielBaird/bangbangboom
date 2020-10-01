import React, { useState, useEffect } from 'react'

import * as Honeycomb from 'honeycomb-grid'

import './App.css'
import HexBoard from './components/HexBoard'
import { getHexByType } from './libraries/hexPool'
import variables from './components/_variables.scss'

const side = parseInt(variables.side, 10)
const Hex = Honeycomb.extendHex({size: side, orientation: 'flat'})
const Grid = Honeycomb.defineGrid(Hex)

function App() {
	const startLoc = {x:10, y:10}

	const [hcg, setHcg] = useState(null)
	const [loc, setLoc] = useState(startLoc)

	useEffect( ()=>{
		let hcg = Grid.rectangle({
			width: startLoc.x * 2, height: startLoc.y * 2,
			onCreate: (h) => { h.data = h.data || getHexByType('blank') }
		})
		hcg.set([startLoc.x, startLoc.y], Hex(startLoc.x, startLoc.y, {data: getHexByType('start')}))
		setHcg( hcg )
	}, [startLoc.x, startLoc.y])

	function clickHex(hexPos) {
		let currH = hcg.get(loc)
		let clickedH = hcg.get(hexPos)

		const dirs = ['N', 'NE', 'SE', 'S', 'SW', 'NW']

		// is this an adjacent hex to the current one?
		let nbrs = hcg.neighborsOf(currH, dirs)
		let destDir = nbrs.findIndex( (n)=> n === clickedH )

		if (destDir < 0) { return } // bail if it's not adjacent

		if (clickedH.data.type === 'blank') {
			// if it's a blank, we need to fill it in
			let edgeType = currH.data.edgeList[destDir]
			if (hexPos.x === startLoc.x) {
				edgeType = 'wall'
			}
			const newHex = Hex(hexPos.x, hexPos.y, {data: getHexByType(edgeType)})
			hcg.set([hexPos.x, hexPos.y], newHex )
			setHcg(hcg)
		}
		// either way set a new location
		setLoc(hexPos)
	}

	return (
		<HexBoard grid={hcg} loc={loc} clickHex={clickHex} />
	)
}

export default App
