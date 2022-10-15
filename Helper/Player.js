export default function Player(name, point, cards) {
	player = {
		name: name,
		point: point,
		cards: [...cards],
	};
	return player;
}
