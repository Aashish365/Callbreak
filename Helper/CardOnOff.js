function makeCard(mytype, mynumber) {
	let card = {};
	card.type = mytype;
	card.number = mynumber;
	return card;
}

function makeManyCards(array) {
	let cards = [];
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].arr.length; j++) {
			cards.push(makeCard(array[i].type, array[i].arr[j]));
		}
	}
	return cards;
}

let p1_card = makeManyCards([
	{ arr: [2, 3, 4, 5], type: "Spade" },
	{ arr: [4, 5], type: "Heart" },
	{ arr: [2, 3, 4, 5], type: "Diamond" },
	{ arr: [2, 4, 5], type: "Club" },
]);
let p2_card = makeManyCards([
	{ arr: [7, 8, 9], type: "Spade" },
	{ arr: [6, 7, 8, 9], type: "Heart" },
	{ arr: [6], type: "Diamond" },
	{ arr: [6, 7, 8, 9, 10], type: "Club" },
]);
let p3_card = makeManyCards([
	{ arr: [10, 11, 12], type: "Spade" },
	{ arr: [10, 11, 12, 13], type: "Heart" },
	{ arr: [7, 11, 12], type: "Diamond" },
	{ arr: [], type: "Club" },
]);
let p4_card = makeManyCards([
	{ arr: [13, 6], type: "Spade" },
	{ arr: [2, 3], type: "Heart" },
	{ arr: [13, 8, 9, 10], type: "Diamond" },
	{ arr: [3], type: "Club" },
]);

let players = [
	{
		cards: p1_card,
	},
	{
		cards: p2_card,
	},
	{
		cards: p3_card,
	},
	{
		cards: p4_card,
	},
];

let thrownCards = [];

function findCardsNumber(player, cardType) {
	let indexes = [];
	for (let i = 0; i < player.cards.length; i++) {
		if (player.cards[i].type === cardType) {
			indexes.push(i);
		}
	}
	return indexes;
}

// this will give the indexes of the card with for matching type
function sameCards(cards, type) {
	let indexes = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].type == type) {
			indexes.push(i);
		}
	}
	return indexes;
}

function noOfSpades(array) {
	let count = 0;
	for (let i = 0; i < array.length; i++) {
		if (array[i].type == "Spade") {
			count++;
		}
	}
	return count;
}

function activateGreaterCards(cardArray, cardNumber) {
	for (let i = 0; i < cardArray.length; i++) {
		if (cardArray[i].number > cardNumber) {
			cardArray[i].active = true;
		}
	}
}

function findGreaterSpade(cards) {
	let greatest = cards[0];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].number > greatest.number) {
			greatest = cards[i];
		}
	}
	return greatest;
}

function greatest(array, mytype) {
	let greatest;

	if (array.length === 1) {
		greatest = array[0];
	} else {
		// finding the first card of same type
		for (let i = 0; i < array.length; i++) {
			if (array[i].type === mytype) {
				greatest = array[i];
				break;
			}
		}
		/// finding the greatest from all cards
		for (let o = 0; o < array.length; o++) {
			if (array[o].type === mytype && array[o].number > greatest.number) {
				greatest = array[o];
			}
		}
	}
	return greatest;
}

function greatestIndexes(array, card) {
	let indexes = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].type === card.type && array[i].number > card.number) {
			indexes.push(i);
		}
	}
	return indexes;
}

function activateAllCards(array) {
	for (let i = 0; i < array.length; i++) {
		array[i].active = true;
	}
}

function activateSelectedCard(indexes, array) {
	for (let i = 0; i < indexes.length; i++) {
		array[indexes[i]].active = true;
	}
}

function deactivateSelectedCards(indexes, array) {
	for (let i = 0; i < array.length; i++) {
		if (!indexes.includes(i)) {
			array[i].active = false;
		}
	}
}

function activeCardIndexes(cards) {
	let indexes = [];

	for (let i = 0; i < cards.length; i++) {
		if (cards[i].active === true) {
			indexes.push(i);
		}
	}
	return indexes;
}

function thorwCard(throwncard, cards, index) {
	throwncard.push(cards[index]);
	cards = cards.splice(index, 1);
}

function biggerCards(array, card) {
	let indexes = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].type === card.type && array[i].number > card.number) {
			indexes.push(i);
		}
	}
	return indexes;
}

function randomIndex(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export default function CardOnOff() {
	/// For first Player
	//// first player will throw the card
	/// first player can thorw any card from his cards
	///  the index of the card from his deck will be obtained
	/// from the socket implementation

	let initiatorCardType; // cardOf initiator from the thrown card
	for (let i = 0; i < 4; i++) {
		if (thrownCards.length == 0) {
			// when no card is thrown
			// find the whose turn is this and set his/her all cards as active
			activateAllCards(players[0].cards);
			// let first player thrown the card k
			let activeCards = activeCardIndexes(players[i].cards);
			thorwCard(thrownCards, players[i].cards, randomIndex(activeCards));
			initiatorCardType = thrownCards[0].type;
		} else {
			let indexes = sameCards(players[i].cards, initiatorCardType);
			if (indexes.length === 0) {
				// No card matches
				if (initiatorCardType !== "Spade") {
					// thrown card is not spade

					let spadesIndexes = sameCards(players[i].cards, "Spade");
					let num = noOfSpades(players[i].cards);
					if (num == 0) {
						// when player donot have spade
						activateAllCards(players[i].cards);
					} else if (num == 1) {
						// having onlyOne spade with player
						let spadeNum = noOfSpades(thrownCards);
						if (spadeNum === 0) {
							activateSelectedCard(spadesIndexes, players[i].cards);
							deactivateSelectedCards(spadesIndexes, players[i].cards);
						} else {
							// when one or more spade is already thrown by other player

							let activatedSpades = 0;
							// when spade of player is greater than the other spades
							for (let k = 0; k < spadesIndexes.length; k++) {
								if (
									players[i].cards[spadesIndexes[k]].number >
									greatest(thrownCards, "Spade").number
								) {
									players[i].cards[spadesIndexes[k]].active = true;
									activatedSpades++;
								} else {
									players[i].cards[spadesIndexes[k]].active = false;
								}
							}

							// when no spades of the player is greater than the greater spade thrown
							if (activatedSpades === 0) {
								activateAllCards(players[i].cards);
							}
						}
					} else {
						//when player have more than one spades
						let noOfThrownSpades = noOfSpades(thrownCards);
						if (noOfThrownSpades === 0) {
							// when noone has thrown spade
							activateSelectedCard(spadesIndexes, players[i].cards);
							deactivateSelectedCards(spadesIndexes, players[i].cards);
						} else {
							// when one or more spades is thrown

							for (let l = 0; l < spadesIndexes.length; l++) {
								if (
									players[i].cards[spadesIndexes[l]].number >
									findGreaterSpade(thrownCards).number
								) {
									players[i].cards[spadesIndexes[l]].active = true;
								} else {
									players[i].cards[spadesIndexes[l]].active = false;
								}
							}
						}
					}
				} else {
					// when player donot have any spade with him/her
					activateAllCards(players[i].cards);
				}
			} else {
				// when player has one or more cards of same type as cardInitiator

				let greatestThrownCard = greatest(thrownCards, initiatorCardType);

				// this gives an array of indexes of cards greater than the greater card of same type
				let biggercardsindexes = greatestIndexes(
					players[i].cards,
					greatestThrownCard
				);

				if (biggercardsindexes.length === 0) {
					// when player donot have no greater card of same type of initiator
					activateSelectedCard(indexes, players[i].cards);
					deactivateSelectedCards(indexes, players[i].cards);
				}
				// when player has greater cards of same type of initiator
				else {
					activateSelectedCard(biggercardsindexes, players[i].cards);
					deactivateSelectedCards(biggercardsindexes, players[i].cards);
				}
			}
			let myactiveCards = activeCardIndexes(players[i].cards);
			thorwCard(thrownCards, players[i].cards, randomIndex(myactiveCards));
		}
		console.log(thrownCards);
	}
	return <></>;
}
