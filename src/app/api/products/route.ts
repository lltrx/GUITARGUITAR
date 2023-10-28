// enum BodyShape {
//     SStyle,
//     TStyle,
//     DoubleCut,
//     Offest,
//     HollowBody,
//     VStyle,
//     SmallBody,
//     Orchestral,
//     GrandAuditorium,
//     Dreadnought,
//     Jumbo,
//     Explorer,
//     SingleCut,
//     Combo,
//     Head,
//     Cabinet,
// }

// enum Colour {
//     Red,
//     Orange,
//     Yellow,
//     Green,
//     Blue,
//     Purple,
//     Pink,
//     Brown,
//     Gold,
//     Silver,
//     Grey,
//     Black,
//     White,
//     Natural,
//     Multicolour
// }

// enum Pickup {
// 	ElctroAcoustic,
// 	SS,
// 	SSS,
// 	HH,
// 	HHH,
// 	HS,
// 	HSS,
// 	HSH,
// 	P90,
// 	S,
// 	H,
// }

type Colour =
	| 'Red'
	| 'Orange'
	| 'Yellow'
	| 'Green'
	| 'Blue'
	| 'Purple'
	| 'Pink'
	| 'Brown'
	| 'Gold'
	| 'Silver'
	| 'Grey'
	| 'Black'
	| 'White'
	| 'Natural'
	| 'Multicolour';

type BodyShape =
	| 'SStyle'
	| 'TStyle'
	| 'DoubleCut'
	| 'Offest'
	| 'HollowBody'
	| 'VStyle'
	| 'SmallBody'
	| 'Orchestral'
	| 'GrandAuditorium'
	| 'Dreadnought'
	| 'Jumbo'
	| 'Explorer'
	| 'SingleCut'
	| 'Combo'
	| 'Head'
	| 'Cabinet';

type PickUp =
	| 'ElectroAcoustic'
	| 'SS'
	| 'SSS'
	| 'HH'
	| 'HHH'
	| 'HS'
	| 'HSS'
	| 'HSH'
	| 'P90'
	| 'S'
	| 'H';

export async function GET(req: Request) {
	const response = await fetch(
		'https://www.guitarguitar.co.uk/hackathon/products/',
	);
	const data = await response.json();

	return Response.json(data);
}
