#! /usr/bin/env node
const { log } = require('./src/log')

log('\nBuilding Cards\n')

const buildCards = require('./src/buildcards')
// get data for the cards
const cardList = require('./data/cards.json')
// pick a file to save cards to
const CARDFILE = './docs/cards.html'
// build the cards
buildCards(cardList, CARDFILE)

log('\nBuilding Hexes\n')

const buildHexes = require('./src/buildhexes')
// get data for the hexes
const hexList = require('./data/hexes.json')
// pick a file to save hexes to
const ALLHEXFILE = './docs/allhexes.html'
const SAMPLEHEXFILE = './docs/samplehexes.html'
// build the hexes
buildHexes(hexList, ALLHEXFILE)

log('\nBuilding Sample Hexes\n')

buildHexes(hexList, SAMPLEHEXFILE, {single: true})
