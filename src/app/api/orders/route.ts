// enum EnumOrderStatus {
//     Placed,
//     Dispatched,
//     Delivering,
//     Delivered,
//     Completed,
//     Cancelled
// }

export async function GET(req: Request)  {
	const response = await fetch(
		'https://www.guitarguitar.co.uk/hackathon/orders/',
	);
	const data = await response.json();
	return Response.json(data);
}
