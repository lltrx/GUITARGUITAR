interface Order {
	Id: number;
	CustomerId: number;
	ShippingAddress: Address;
	Products: Product[];
	DateCreated: Date;
	OrderTotal: number;
	OrderStatus: OrderStatus;
}

interface Address {
	city: string;
	street_name: string;
	street_address: string;
	zip_code: string;
	country: string;
}

interface Product {
	SKU_ID: string;
	ASN: string;
	Category: string;
	Online: boolean;
	ItemName: string;
	Title: string;
	BrandName: string;
	Description: string;
	ProductDetail: string;
	SalesPrice: number;
	PictureMain: string;
	QtyInStock: number;
	QtyOnOrder: number;
	ColourOption: number;
	PickupOption: number;
	ShapeOption: number;
	CredatedOn: Date;
}

// enum EnumOrderStatus {
//     Placed,
//     Dispatched,
//     Delivering,
//     Delivered,
//     Completed,
//     Cancelled
// }

type OrderStatus =
	| 'Placed'
	| 'Dispatched'
	| 'Delivering'
	| 'Delivered'
	| 'Completed'
	| 'Cancelled';

	export async function POST(req: any) {
		try {
			const request = await req.json();
			const customerID = request.customerID;
			const convertedCustomerID = Number(customerID);
		
			const response = await fetch('https://www.guitarguitar.co.uk/hackathon/orders/');
			const data = await response.json();
			const dataArray = Object.values(data);
	
			if (customerID) {
				const filteredData = dataArray.filter((item: any) => item.CustomerId === convertedCustomerID);
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