export default function Divider(deck) {
	let player1_cards = [],
		player2_cards = [],
		player3_cards = [],
		player4_cards = [];
	for (let i = 0; i < deck.length; i += 4) {
		player1_cards.push(deck[i]);
		player2_cards.push(deck[i + 1]);
		player3_cards.push(deck[i + 2]);
		player4_cards.push(deck[i + 3]);
	}
	return [player1_cards, player2_cards, player3_cards, player4_cards];
}
