export default function CardSorting(cards) {
	let club = [];
	let diamond = [];
	let heart = [];
	let spade = [];

	const sort = (group) => {
		for (let i = 1; i < group.length; i++) {
			let j = i - 1;
			let temp = group[i];
			while (j >= 0 && group[j].number > temp.number) {
				group[j + 1] = group[j];
				j--;
			}
			group[j + 1] = temp;
		}
		return group.reverse();
	};

	for (let i = 0; i < cards.length; i++) {
		if (cards[i].type === "club") {
			club.push(cards[i]);
		} else if (cards[i].type === "diamond") {
			diamond.push(cards[i]);
		} else if (cards[i].type === "spade") {
			spade.push(cards[i]);
		} else if (cards[i].type === "heart") {
			heart.push(cards[i]);
		} else {
		}
	}
	cards = [...sort(club), ...sort(diamond), ...sort(heart), ...sort(spade)];
	return cards;
}
