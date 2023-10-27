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

export async function GET(req: Request)  {
	const response = await fetch(
		'https://www.guitarguitar.co.uk/hackathon/orders/',
	);
	const data = await response.json();
	return Response.json(data);
}
