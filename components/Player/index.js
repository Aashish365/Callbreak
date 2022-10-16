export default function Player(props) {
	let player = [
		{
			name: props.name,
			cards: [...props.cards],
			pointsObtained: props.pointsObtained,
			pointsToScore: props.pointsToScore,
			initiator: props.initiator,
		},
	];
	return <>This is player</>;
}
