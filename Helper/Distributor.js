export default function Distributor(players, deck) {
	for (let i = 0; i < deck.length; i++) {
		players[0].cards.push(deck[i]);
		players[1].cards.push(deck[i + 1]);
		players[2].cards.push(deck[i + 2]);
		players[3].cards.push(deck[i + 3]);
	}
}
