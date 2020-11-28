import React, { useState, useEffect, useReducer } from 'react'

import * as Honeycomb from 'honeycomb-grid'

import './App.css'
import HexBoard from './components/HexBoard'
import HexStacks from './components/HexStacks'
import { getHexByType, hexStatuses } from './libraries/hexPool'
import variables from './components/_variables.scss'

const side = parseInt(variables.side, 10) // size of a hex
const startLoc = {x:20, y:20} // starting location
const Hex = Honeycomb.extendHex({size: side, orientation: 'flat'})
const Grid = Honeycomb.defineGrid(Hex)

function App() {

	const [hcg, setHcg] = useState(null)
	const [loc, setLoc] = useState(startLoc)
	// eslint-disable-next-line
	const [_, forceUpdate] = useReducer((x) => x+1, 0) // sadly this is required

	// initialisation
	useEffect( ()=>{
		let hcg = Grid.rectangle({
			width: startLoc.x * 2, height: startLoc.y * 2,
			onCreate: (h) => { h.data = h.data || getHexByType('blank') }
		})
		hcg.set([startLoc.x, startLoc.y], Hex(startLoc.x, startLoc.y, {data: getHexByType('start')}))
		setHcg( hcg )
	}, [])

	function clickHex(hexPos) {
		let currH = hcg.get(loc)
		let clickedH = hcg.get(hexPos)

		const dirs = ['N', 'NE', 'SE', 'S', 'SW', 'NW']

		// is this an adjacent hex to the current one?
		let nbrs = hcg.neighborsOf(currH, dirs)
		let destDir = nbrs.findIndex( (n)=> n === clickedH )

		if (destDir < 0) { return } // bail if it's not adjacent

		let newHex = null
		if (clickedH.data.type === 'blank') {
			// if it's a blank, we need to fill it in
			let edgeType = currH.data.edgeList[destDir]
			if (hexPos.x === startLoc.x) {
				edgeType = 'wall'
			}
			newHex = Hex(hexPos.x, hexPos.y, {data: getHexByType(edgeType)})
			hcg.set([hexPos.x, hexPos.y], newHex )
			console.log('newhex is ' + newHex.data.type)
			setHcg(hcg)
			clickedH = newHex
			console.log('clicked hex ' + clickedH.data.type)
		}
		// either way set a new location
		console.log(clickedH.data.type)
		if (clickedH.data.type !== 'impassable') {
			setLoc(hexPos)
		} else {
			forceUpdate() // gotta do this
		}
	}

	return (<>
		<HexStacks statuses={hexStatuses()} />
		<HexBoard grid={hcg} loc={loc} clickHex={clickHex} />
	</>)
}

export default App
