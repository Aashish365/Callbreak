import Image from "next/image";
import Distributor from "../../Helper/Distributor";
import Shuffle from "../../Helper/Shuffle";
import { useEffect, useState } from "react";
import { h1 } from "fontawesome";

export default function Card(players) {
	const cards = [
		{
			name: "Ace",
			number: 1,
			rank: "A",
			Symbol_position: {
				first_col: 0,
				mid_col: 1,
				last_col: 0,
			},
		},
		{
			name: "two",
			number: 2,
			rank: "2",
			Symbol_position: {
				first_col: 0,
				mid_col: 2,
				last_col: 0,
			},
		},
		{
			name: "Three",
			number: 3,
			rank: "3",
			Symbol_position: {
				first_col: 0,
				mid_col: 3,
				last_col: 0,
			},
		},
		{
			name: "Four",
			number: 4,
			rank: "4",
			Symbol_position: {
				first_col: 2,
				mid_col: 0,
				last_col: 2,
			},
		},
		{
			name: "Five",
			number: 5,
			rank: "5",
			Symbol_position: {
				first_col: 2,
				mid_col: 1,
				last_col: 2,
			},
		},
		{
			name: "Six",
			number: 6,
			rank: "6",
			Symbol_position: {
				first_col: 3,
				mid_col: 0,
				last_col: 3,
			},
		},
		{
			name: "Seven",
			number: 7,
			rank: "7",
			Symbol_position: {
				first_col: 3,
				mid_col: 1,
				last_col: 3,
			},
		},
		{
			name: "Eight",
			number: 8,
			rank: "8",
			Symbol_position: {
				first_col: 3,
				mid_col: 2,
				last_col: 3,
			},
		},
		{
			name: "Nine",
			number: 9,
			rank: "9",
			Symbol_position: {
				first_col: 4,
				mid_col: 1,
				last_col: 4,
			},
		},
		{
			name: "ten",
			number: 10,
			rank: "10",
			Symbol_position: {
				first_col: 4,
				mid_col: 2,
				last_col: 4,
			},
		},
		{
			name: "Jack",
			number: 11,
			rank: "J",
			Symbol_position: {
				first_col: 0,
				mid_col: 2,
				last_col: 0,
			},
		},
		{
			name: "Queen",
			number: 12,
			rank: "Q",
			Symbol_position: {
				first_col: 0,
				mid_col: 2,
				last_col: 0,
			},
		},
		{
			name: "King",
			number: 13,
			rank: "K",
			Symbol_position: {
				first_col: 0,
				mid_col: 2,
				last_col: 0,
			},
		},
	];

	const club = <Image src="/club.svg" height={50} width={50} alt="club" />;
	const diamond = (
		<Image src="/diamond.svg" height={50} width={50} alt="diamond" />
	);
	const heart = <Image src="/heart.svg" height={50} width={50} alt="heart" />;
	const spade = <Image src="/spade.svg" height={50} width={50} alt="spade" />;

	const king = <Image src="/king.png" height={120} width={120} alt="king" />;
	const queen = <Image src="/queen.png" height={120} width={120} alt="queen" />;
	const jack = <Image src="/jack.png" height={120} width={120} alt="jack" />;

	function displayImage(type) {
		if (type === "club") {
			return club;
		} else if (type == "diamond") {
			return diamond;
		} else if (type == "heart") {
			return heart;
		} else if (type == "spade") {
			return spade;
		} else {
			return <span></span>;
		}
	}

	function rotate(image) {
		return <div className="rotate">{image}</div>;
	}

	function generateCol(num, type) {
		let data = [];

		for (let i = 0; i < num; i++) {
			if (i + 1 <= (num + 1) / 2) {
				data.push(type);
			} else {
				data.push(rotate(type));
			}
		}

		return data;
	}

	let checkFaceCard = (card, type) => {
		if (card.name === "Jack") {
			return jack;
		} else if (card.name == "Queen") {
			return queen;
		} else if (card.name == "King") {
			return king;
		} else {
			return type;
		}
	};

	const cardLayout = (card, type) => (
		<div
			key={card.rank + card.type}
			className={`card ${card.rank} ${card.type}`}>
			<div className="container">
				<div className="col1">
					<span className="rank">{card.rank}</span>
					<div>{type}</div>
				</div>
				<div className="col2">
					{generateCol(card.Symbol_position.first_col, type)}
				</div>
				<div className="col3">
					{generateCol(card.Symbol_position.mid_col, checkFaceCard(card, type))}
				</div>
				<div className="col4">
					{generateCol(card.Symbol_position.last_col, type)}
				</div>

				<div className="col5">
					<span className="rank">{card.rank}</span>
					<div>{type}</div>
				</div>
			</div>
		</div>
	);

	const deckBuilder = (cards) => {
		let mydeck = [];
		for (let i = 0; i < 4; i++) {
			let card_type = "";
			switch (i) {
				case 0:
					card_type = "spade";
					break;
				case 1:
					card_type = "diamond";
					break;
				case 2:
					card_type = "club";
					break;
				case 3:
					card_type = "heart";
					break;
				default:
					break;
			}
			for (let j = 0; j < 13; j++) {
				let card = { ...cards[j], type: card_type };
				mydeck.push(card);
			}
		}
		return mydeck;
	};

	let mycards = (cards) => (
		<div className="deck">
			{cards.map((card, key) => {
				key = key;
				return cardLayout(card, displayImage(card.type));
			})}
		</div>
	);
	const [shuffledCards, setsuffledcards] = useState([]);
	useEffect(() => {
		setsuffledcards(Shuffle(deckBuilder(cards)));
	}, []);
	Distributor(players, shuffledCards);

	function showcards() {
		let allPlayers = [];
		for (let i = 0; i < players.length; i++) {
			allPlayers.push(mycards(players[i].cards));
		}
		return allPlayers;
	}

	return (
		<div>
			{/* <h1>Player 1</h1>
			{mycards(players[0].cards)}

			<h1>Player 2</h1>
			{mycards(players[1].cards)}

			<h1>Player 3</h1>
			{mycards(players[2].cards)}

			<h1>Player 4</h1>
			{mycards(players[3].cards)} */}

			{showcards()}
		</div>
	);
}
