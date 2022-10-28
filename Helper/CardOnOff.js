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
		if (cards[i].type === type) {
			indexes.push(i);
		}
	}
	return indexes;
}

function noOfSpades(array) {
	let count = 0;
	for (let i = 0; i < array.length; i++) {
		if (array[i].type === "Spade") {
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

function greatest(array, type) {
	let greatest;

	if (array.length === 0) {
		greatest = array[0];
	} else {
		// finding the first card of same type
		for (let i = 0; i < array.length; i++) {
			if (array[i].type === type) {
				greatest = array[i];
			}
		}
		/// finding the greatest from all cards
		for (let o = 0; o < array.length; o++) {
			if (array[i].type === type) {
				if (array[i].number > greatest.number) {
					greatest = array[i];
				}
			}
		}
	}
}

function greatestIndexes(array, card) {
	let indexes = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].type === card.type && array[i].number > card.number) {
			index.push(i);
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

function biggerCards(array, card) {
	let indexes = [];
	for (let i = 0; i < array.length; i++) {
		if (array[i].type === card.type && array[i].number > card.number) {
			indexes.push(i);
		}
	}
	return indexes;
}

function CardOnOff(props) {
	let thrownCards = [];

	/// For first Player
	//// first player will throw the card
	/// first player can thorw any card from his cards
	///  the index of the card from his deck will be obtained
	/// from the socket implementation

	// suppose first player thorwn the card with index k

	let k = 9;

	let c1 = players[0].cards[k];
	thrownCards.push(c1); // pushing int the server where thrownCards exist
	players[0].cards.splice(k, 1); // removing the card from the players card

	let initiatorCardType = thrownCards[0].type; // cardOf initiator from the thrown card

	if (props.thrownCards.length === 0) {
		// when no card is thrown
		// find the whose turn is this and set his/her all cards as active
		for (let i = 0; i < props.players[0].cards.length; i++) {
			props.players[0].cards[i].active = true;
		}
	} else {
		//// for every other player rather than the first player
		for (let i = 1; i < 4; i++) {
			let indexes = sameCards(players[i], initiatorCardType);
			if (indexes.length === 0) {
				// No card matches
				if (initiatorCardType !== "Spade") {
					// thrown card is not spade

					let spadesIndexes = sameCards(players[i], "Spade");
					let num = noOfSpades(players[i].cards);
					if (num == 0) {
						// when player donot have spade
						activateAllCards(players[i].cards);
					} else if (num == 1) {
						// having onlyOne spade with player
						let spadeNum = noOfSpades(thrownCards);
						if (spadeNum === 0) {
							activateSelectedCard(spadesIndexes, players[i].cards);
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
								}
							}

							// when no spades of the player is greater than the greater spade thrown
							if (activatedSpades === 0) {
								activateAllCards(players[i].cards);
							}
						}
					} else {
						//when player have more than one spades
						let noOfThrownSpades = sameCards(thrownCards, "Spade").length;
						if (noOfThrownSpades === 0) {
							// when noone has thrown spade
							activateSelectedCard(spadesIndexes, player[i].cards);
						} else {
							// when one or more spades is thrown

							for (let l = 0; l < spadesIndexes.length; l++) {
								if (
									players[i].cards[spadesIndexes[l]].number >
									findGreaterSpade(thrownCards).number
								) {
									players[i].cards[spadesIndexes[l]].active = true;
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
					player[i].cards,
					greatestThrownCard
				);

				if (biggercardsindexes.length === 0) {
					// when player donot have no greater card of same type of initiator
					activateSelectedCard(indexes, players[i].cards);
				}
				// when player has greater cards of same type of initiator
				else {
					activateSelectedCard(biggercardsindexes, player[i].cards);
				}
			}
		}
	}

	return <div></div>;
}
