#! /usr/bin/env node

const buildCards = require('./src/buildcards')
// get data for the cards
const cardList = require('./data/cards.json')
// pick a file to save cards to
const CARDFILE = './cards.html'
// build the cards
buildCards(cardList, CARDFILE)

