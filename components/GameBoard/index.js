import Card from "../card";
import Player from "../Player";

export default function GameBoard() {
	const players = [
		{
			name: "pl1",
			cards: [],
			pointsObtained: 10,
			pointsToScore: 11,
			initiator: false,
		},
		{
			name: "pl2",
			cards: [],
			pointsObtained: 10,
			pointsToScore: 11,
			initiator: false,
		},
		{
			name: "pl3",
			cards: [],
			pointsObtained: 10,
			pointsToScore: 11,
			initiator: false,
		},
		{
			name: "pl4",
			cards: [],
			pointsObtained: 10,
			pointsToScore: 11,
			initiator: false,
		},
	];

	let createPlayers = (players) => {
		for (let i = 0; i < players.length; i++) {
			Player(players[i]);
		}
		return players;
	};

	return <div>{Card(createPlayers(players))}</div>;
}
