import fs, { existsSync } from "fs";
import cardList from "../../Helper/cardlist";
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

const generate = (myList) => {
	const buildCards = deckBuilder(myList);
	return buildCards;
};

// Generate and save the deck
const generateAndSave = () => {
	const generatedCards = generate(cardList());
	fs.writeFileSync("test.txt", JSON.stringify(generatedCards), function (err) {
		if (err) throw err;
		console.log("created");
	});
	return generatedCards;
};

// check either file exists or not, if not exists create file
//and generate the deck and display
// otherwise display only
function checkFileExistenceAndCreatedIfNot() {
	if (fs.existsSync("test.txt")) {
		return JSON.parse(fs.readFileSync("test.txt", "utf8"));
	} else {
		return generateAndSave();
	}
}

export default function handler(req, res) {
	const { body, method } = req;
	let toReturn;
	try {
		switch (method) {
			case "GET":
				toReturn = checkFileExistenceAndCreatedIfNot();
				break;
			case "POST":
				toReturn = generateAndSave();
				break;
			default:
				toReturn = "Method " + method + " is not allowed.";
				break;
		}
	} catch (e) {
		toReturn = e;
	}
	// const newCardList = generate(cardList());
	res.status(200).json(toReturn);
}
