#! /usr/bin/env node

const fs = require('fs')
const { strict } = require('assert')
const { log, mention } = require('./log')

// --------------------------------------------------------
// --------------------------------------------------------
module.exports = (hexData, file, options={}) => {
	// build into this list of lines
	hexesPage = []

	// page starts with the head
	hexesPage = hexesPage.concat( getPageSection('head') )

	log(`Building ${Object.keys(hexData).length} types of hexes...`)
	// then add all the hexes
	for (hexId in hexData) {
		// got a hex, build it
		let hex = hexData[hexId]
		if (options.single) {
			hex.tags = hex.tags || []
			hex.tags.push('' + hex.edges.length) // record the number of this hex type as a tag
			hex.edges = [hex.edges[0]] // then forget all but the first hex of this type
		}
		const hexLines = buildHex(hex, hexId)
		hexesPage = hexesPage.concat(hexLines)
	}
	// then add the foot
	hexesPage = hexesPage.concat( getPageSection('foot') )

	// finally write the file
	log(`writing to ${file}`)
	fs.writeFileSync(file, hexesPage.join('\n'))

}
// --------------------------------------------------------
function buildHex(hex, id) {

	mention(` / ${hex.title || id}`, 2)

	let hexLines = []

	hex.edges.forEach( (edgeList, index) => {
		hexLines = hexLines.concat(getHexSection('head'))

		hexLines = hexLines.concat(hexTitle(hex))
		hexLines = hexLines.concat(hexEdges(edgeList, hex))
		hexLines = hexLines.concat(hexDescription(hex))
		hexLines = hexLines.concat(hexDetail(hex))
		hexLines = hexLines.concat(hexFooter(hex))

		hexLines = hexLines.concat(getHexSection('foot'))

		if (index > 0)  {  mention('.')  }
	})

	return hexLines
}
// --------------------------------------------------------
// --------------------------------------------------------
function hexTitle(hex) {
	lines = []
	if (hex.pretitle) {
		lines.push(`<small>${hex.pretitle}</small>`)
	}
	lines.push(`${hex.title}`)
	if (hex.posttitle) {
		lines.push(`<small>${hex.posttitle}</small>`)
	}
	if (hex.type) {
		lines.push(`<div class="type"><span>${hex.type}</span></div>`)
	}
	return hexRow(lines, 'title')

}
// --------------------------------------------------------
function hexEdges(edgeList, hex) {
	let lines = []
	const directions = 'n ne se s sw nw'.split(' ')
	edgeList.forEach( (edge, index) => {
		lines = lines.concat( hexEdge(edge, directions[index]) )
	})
	return lines
}
// --------------------------------------------------------
function hexDescription(hex) {
	if (hex.desc) {
		return hexRow([`<p>${hex.desc}</p>`], 'description')
	} else {
		return []
	}
}
// --------------------------------------------------------
function hexDetail(hex) {
	if (hex.detail) {
		return hexRow([`<p>${hex.detail}</p>`], 'detail')
	} else {
		return []
	}
}
// --------------------------------------------------------
function hexFooter(hex) {
	lines = []
	if (hex.tags) {
		lines.push('<p>')
		lines.push(hex.tags.join(' · '))
		lines.push('</p>')
	}
	return hexRow(lines, 'footer')
}
// --------------------------------------------------------
// --------------------------------------------------------
function getPageSection(section) {
	return {
		head: [
			'<html>',
			'<head>',
			'<meta name="viewport" content="width=device-width, user-scalable=no" />',
			'<link href="https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Amarante&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Rakkas&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap" rel="stylesheet">',
			'<link href="./Rpg-Awesome-master/css/rpg-awesome.min.css" rel="stylesheet">',
			'<link rel="stylesheet" type="text/css" href="./hexes.css" />',
			'</head>',
			'<body>',
			'<div class="wrapper">'
		],
		foot: [
			'</div>',
			'</body>',
			'</html>'
		]
	}[section]
}
// --------------------------------------------------------
function getHexSection(section) {
	return {
		head: [ '<div class="hex">' ],
		foot: [ '</div>' ]
	}[section]
}
// --------------------------------------------------------
function hexRow(content, classes='') {
	let row = []
	row.push(`<div class="hexrow ${classes}">`)
	row = row.concat(content)
	row.push('</div>')

	return row
}
// --------------------------------------------------------
function hexEdge(content, classes='') {
	let edge = []
	edge.push(`<div class="hexedge ${classes}">`)
	edge = edge.concat('<span class="edgearrow">⬆</span>')
	edge = edge.concat(content)
	// edge = edge.concat('⭡')
	edge.push('</div>')

	return edge
}
// --------------------------------------------------------
