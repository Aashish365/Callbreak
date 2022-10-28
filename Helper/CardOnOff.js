function findCardsNumber(player, cardType) {
	let indexes = [];
	for (let i = 0; i < player.cards.length; i++) {
		if (player.cards[i].type === cardType) {
			indexes.push(i);
		}
	}
	return indexes;
}

/*
  initiate thrownCards array;   
  push the card of player1_thrownCard in thrownCards array;

  check the type of thrownCards[0] with the cards present in all players. ( this will return the array of indexes of matched card types of all players)

  forEveryPlayer:
    if(indexes.length ===0) // cards is not present
    {
        if(throwncards[0].type!=="Spade") // if the thrown card is not spade
        {
            num= get the number of spade cards in player;
            if(num==0) // having no spades with player
            {
                activate all Cards of player;
            }else if(num==1) // having one spade with player
            {   
                spadeNumber= find the number of spades from the thrownCards array.
                if(spadeNumber===0){
                    activate the spade card of player;
                }else if(spadeNumber ===1){
                    if(spade of player > spade card thrown){  
                        activate the spade of player.
                    }else{
                        activate all cards of player.
                    }

                }else{
                    bigSpade= find the big spade from the thrown cards;
                    if(spade of player > bigSpade){
                        activate the spade of player;
                    }else{
                        activate all the cards of the player.
                    }
                }
                
            }else{
                thrownSpade= number of spades in throwCards array.

                if(thrownSpade===0){
                        activate all spades of player;
                }else if(thrownSpade >==1){
                        bigSpade= find the big spade card in thrown cards array;
                        activate those spades of players greater than bigSpade;
                }else{do nothing}
            }


        }else { // // if the thrown card is spade and spade is not present in player Card
            activate all cards of player.
        }
    
    } else if( indexes.length ===1){
        activateTheCard;
    }else if(indexes.length >==2){
        bigCardOfSameType= find the big card from the thrownCards array.
        biggerCardsInPlayer= find the number of cards bigger than bigcardOfsameType.
        if(biggercardsInPlayer==0){
            activate all cards of type thrownCards[0].type in player cards.
        }else if(biggerCardsIn Player>=1){
            activate the cards of type thrownCards[0].type which is/are bigger than bigCardOfSameType.
        }
    }

*/

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
				// no card matches
				if (initiatorCardType !== "Spade") {
					// thrown card is not spade
					let num = noOfSpades(players[i].cards);
					if (num == 0) {
						// when player donot have spade
						activateAllCards(players[i].cards);
					} else if (num == 1) {
						// having onlyOne spade with player
						let spadeNum = noOfSpades(thrownCards);
						if (spadeNum === 0) {
							activateSelectedCard(
								sameCards(players[i].cards, "Spade"),
								players[i].cards
							);
						} else {
							// when one or more spade is already thrown by other player
							let spadeOfPlayer = sameCards(players[i].cards, "Spade");

							let activatedSpades = 0;
							// when spade of player is greater than the other spades
							for (let k = 0; k < spadeOfPlayer.length; k++) {
								if (
									players[i].cards[spadeOfPlayer[k]].number >
									findGreaterSpade(thrownCards).number
								) {
									players[i].cards[spadeOfPlayer[k]].active = true;
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
							activateSelectedCard(
								sameCards(player[i].cards, "Spades"),
								player[i].cards
							);
						} else {
							// when one or more spades is thrown
							let spadesOfPlayer = sameCards(players[i].cards, "Spade");
							for (let l = 0; l < spadesOfPlayer.length; l++) {
								if (
									players[i].cards[spadesOfPlayer[l]].number >
									findGreaterSpade(thrownCards).number
								) {
									players[i].cards[spadesOfPlayer[l]].active = true;
								}
							}
						}
					}
				} else {
					activateAllCards(players[i].cards);
				}
			}
		}
	}

	return <div></div>;
}
