// enum EnumOrderStatus {
//     Placed,
//     Dispatched,
//     Delivering,
//     Delivered,
//     Completed,
//     Cancelled
// }

export async function POST(req: any) {
	try {
		const request = await req.json();
		const customerID = request.customerID;
		const convertedCustomerID = Number(customerID);

		const response = await fetch(
			'https://www.guitarguitar.co.uk/hackathon/orders/',
		);
		const data = await response.json();
		const dataArray = Object.values(data);

		if (customerID) {
			const filteredData = dataArray.filter(
				(item: any) => item.CustomerId === convertedCustomerID,
			);
			if (filteredData.length === 0) {
				return Response.json({ error: 'No orders found for this customer' });
			}
			return Response.json(filteredData);
		}

		return Response.json(dataArray);
	} catch (error) {
		console.error('Error processing request:', error);
		return Response.json({ error: error?.toString() });
	}
}

export async function GET(req: any) {
	try {
		const response = await fetch(
			'https://www.guitarguitar.co.uk/hackathon/orders/',
		);
		const data = await response.json();
		const dataArray = Object.values(data);
		return Response.json(dataArray);
	} catch (error) {
		console.error('Error processing request:', error);
		return Response.json({ error: error?.toString() });
	}
}
