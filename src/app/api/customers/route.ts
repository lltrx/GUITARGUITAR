export async function GET(req: Request) {
	const response = await fetch(
		'https://www.guitarguitar.co.uk/hackathon/customers/',
	);
	const data = await response.json();
	return Response.json(data);
}
