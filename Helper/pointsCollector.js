function areSameCards(cards) {
	let result = true;
	for (let i = 0; i < cards.length - 1; i++) {
		for (let j = i + 1; j < cards.length; j++) {
			if (cards[i].card.type !== cards[j].card.type) {
				result = false;
				break;
			}
		}
	}
	return result;
}

function biggerCard(cards) {
	let biggerCard = cards[0].card.number;
	let biggerCard_index = 0;
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].card.number > biggerCard) {
			biggerCard_index = i;
			biggerCard = cards[i].card.number;
		}
	}
	return biggerCard_index;
}

function countSpades(cards) {
	let indexes = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].card.type === "Spade") {
			indexes.push(i);
		}
	}
	return indexes;
}

function sameCardsIndexes(cards, cardType) {
	let indexes = [];
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].card.type === cardType) {
			indexes.push(i);
		}
	}
	return indexes;
}

function getInitiatorIndex(cards) {
	let inititatorIndex;
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].player.initiator) {
			inititatorIndex = i;
			break;
		}
	}
	return inititatorIndex;
}

export default function PointsCollector() {
	const thrownCards = [
		{
			card: "ACE of Spade",
			player: {
				score: 0,
				PlayerName: "pl1",
				initiator: false,
			},
		},
		{
			card: "ACE of Heart",
			player: {
				score: 0,
				PlayerName: "pl2",
				initiator: false,
			},
		},
		{
			card: "ACE of Club",
			player: {
				score: 0,
				PlayerName: "pl3",
				initiator: true,
			},
		},
		{
			card: "ACE of Diamond",
			player: {
				score: 0,
				PlayerName: "pl4",
				initiator: false,
			},
		},
	];

	if (areSameCards(thrownCards)) {
		const biggerCardIndex = biggerCard(thrownCards);
		thrownCards[biggerCardIndex].player.score += 1;
	} else {
		if (countSpades(thrownCards).length == 1) {
			let spadeCardIndexes = countSpades(thrownCards);
			thrownCards[spadeCardIndexes[0]].player.score += 1;
		} else if (countSpades(thrownCards).length >= 2) {
			let spadeCardIndexes = countSpades(thrownCards);

			let biggerSpadeCard = thrownCards[spadeCardIndexes[0]].card.number;
			let biggerSpadeCardIndex = 0;
			for (let i = 0; i < spadeCardIndexes.length; i++) {
				if (thrownCards[spadeCardIndexes[i]].card.number > biggerSpadeCard) {
					biggerCard = thrownCards[spadeCardIndexes[i]].card.number;
					biggerSpadeCardIndex = i;
				}
			}
			thrownCards[biggerSpadeCardIndex].player.score += 1;
		} else {
			let indexes = sameCardsIndexes(
				thrownCards,
				thrownCards[getInitiatorIndex(thrownCards)].card.type
			);

			if (indexes.length >= 2) {
				let biggerCard = thrownCards[indexes[0]].card.number;
				let bigIndex = 0;
				for (let i = 0; i < indexes.length; i++) {
					if (thrownCards[indexes[i]].card.number > biggerCard) {
						biggerCard = thrownCards[indexes[i]].card.number;
						bigIndex = i;
					}
				}
				thrownCards[bigIndex].player.score += 1;
			} else {
				thrownCards[indexes[0]].player.score += 1;
			}
		}
	}
}
