#! /usr/bin/env node

const fs = require('fs')
const { strict } = require('assert')
const log = require('./log')

// --------------------------------------------------------
// --------------------------------------------------------
module.exports = (cardsData, file, options) => {
    // build into this list of lines
    cardsPage = []

    // page starts with the head
    cardsPage = cardsPage.concat( getPageSection('head') )

    // then add all the cards
    for (section in cardsData) {
        const sectionList = cardsData[section]
        log(`building ${Object.keys(sectionList).length} ${section} cards...`)
        cardsPage = cardsPage.concat(buildTitleCard(section))
        for (cardId in sectionList) {
            // got a card, build it
            const cardLines = buildCard(sectionList[cardId], cardId)
            cardsPage = cardsPage.concat(cardLines)
        }
    }
    // then add the foot
    cardsPage = cardsPage.concat( getPageSection('foot') )

    // finally write the file
    log(`writing to ${file}`)
    fs.writeFileSync(file, cardsPage.join('\n'))

}
// --------------------------------------------------------
function buildTitleCard(title) {
	log(`building title card for ${title}`, 1)
	let cardLines = []
	cardLines = cardLines.concat(getCardSection('head'))	
	cardLines = cardLines.concat(bigTitle(title))
	cardLines = cardLines.concat(getCardSection('foot'))

	return cardLines
}
// --------------------------------------------------------
function buildCard(card, id) {
	log(`building ${card.title || id}`, 2)

	let cardLines = []
	cardLines = cardLines.concat(getCardSection('head'))
	
	cardLines = cardLines.concat(cardTitle(card))
	cardLines = cardLines.concat(cardHealth(card))
	cardLines = cardLines.concat(cardDescription(card))
	cardLines = cardLines.concat(cardOutcomes(card))
	cardLines = cardLines.concat(cardEffect(card))
	cardLines = cardLines.concat(cardDetail(card))
	cardLines = cardLines.concat(cardFooter(card))

	cardLines = cardLines.concat(getCardSection('foot'))

	return cardLines
}
// --------------------------------------------------------
// --------------------------------------------------------
function cardTitle(card) {
	lines = []
	if (card.pretitle) {
		lines.push(`<small>${card.pretitle}</small>`)
	}
	lines.push(`${card.title}`)
	if (card.posttitle) {
		lines.push(`<small>${card.posttitle}</small>`)
	}
	return cardRow(lines, 'title')
}
// --------------------------------------------------------
function bigTitle(title) {
	lines = [`${title}`]
	return cardRow(lines, 'bigTitle')
}
// --------------------------------------------------------
function cardHealth(card) {
	if (card.health) {
		return cardRow(hearts(card.health), 'health')
	} else {
		return []
	}
}
// --------------------------------------------------------
function cardEffect(card) {
	if (card.effect) {
		return cardRow(hearts(card.effect), 'effect')
	} else {
		return []
	}
}
// --------------------------------------------------------
function cardDescription(card) {
	if (card.desc) {
		return cardRow([`<p>${card.desc}</p>`], 'description')
	} else { 
		return []
	}
}
// --------------------------------------------------------
function cardDetail(card) {
	if (card.detail) {
		return cardRow([`<p>${card.detail}</p>`], 'detail')
	} else { 
		return []
	}
}
// --------------------------------------------------------
function cardOutcomes(card) {
	if (card.rolls) {
		let lines = ['<table>']
		card.rolls.forEach( (o)=> {
			let desc = ''
			if (o.length > 2) {
				desc = o.shift()
			}
			let roll = o[0].replace('-', '&thinsp;-&thinsp;')
			let hrts = hearts(o[1])
			lines.push('<tr>')
			lines.push(`<td>${roll}</td>`)
			if (desc) {
				lines.push(`<td>${desc}</td>`)
			}
			// lines.push(`<td>${desc} ${roll}</td>`)
			lines.push(`<td>`)
			lines = lines.concat( hrts )
			lines.push(`</td>`)
			lines.push('</tr>')
		})
		lines.push('</table>')
		return cardRow(lines, 'outcomes')
	} else { 
		return []
	}
}
// --------------------------------------------------------
function cardFooter(card) {
	lines = []
	lines.push(['realm', 'type', 'category'].map( (tag)=> card[tag] ).join(' · '))
	return cardRow(lines, 'footer')
}
// --------------------------------------------------------
// --------------------------------------------------------
function hearts(pattern, repeat=1) {
	const oneHeart = /\s*(o|p)(\+|-|s)?\s*/g
	let matches = pattern.matchAll(oneHeart)
	lines = Array.from(matches, (h) => {
		const playOrOpp = (h[1] === 'o') ? 'opp' : 'plr'
		let decoration = ''
		if (h[2] && h[2] === '-') {
			decoration = 'bar'
		} else if (h[2] && h[2] === '+') {
			decoration = 'add'
		} else if (h[2] && h[2] === 's') {
			decoration = 'shield'
		}
		return `<i class="heart ${playOrOpp} ${decoration}"></i>`
	})
	return new Array(repeat).fill(lines).flat()
}
// --------------------------------------------------------
// --------------------------------------------------------
function getPageSection(section) { 
	return {
		head: [
			'<html>',
			'<head>',
			'<link href="https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Amarante&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Rakkas&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&display=swap" rel="stylesheet">',
			'<link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap" rel="stylesheet">',
			'<link href="./Rpg-Awesome-master/css/rpg-awesome.min.css" rel="stylesheet">',
			'<link rel="stylesheet" type="text/css" href="./cards.css" />',
			'</head>',
			'<body>'
		],
		foot: [
			'</body>',
			'</html>'
		]
	}[section]
}
// --------------------------------------------------------
function getCardSection(section) { 
	return {
		head: [ '<div class="card">' ],
		foot: [ '</div>' ]
	}[section]
}
// --------------------------------------------------------
function cardRow(content, classes='') {
	let row = []
	row.push(`<div class="cardrow ${classes}">`)
	row = row.concat(content)
	row.push('</div>')

	return row
}
// --------------------------------------------------------

