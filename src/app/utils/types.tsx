export interface Order {
	Id: number;
	CustomerId: number;
	ShippingAddress: Address;
	Products: Product[];
	DateCreated: Date;
	OrderTotal: number;
	OrderStatus: OrderStatus;
}

export interface Address {
	city: string;
	street_name: string;
	street_address: string;
	zip_code: string;
	country: string;
}

export interface Product {
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

type OrderStatus =
	| 'Placed'
	| 'Dispatched'
	| 'Delivering'
	| 'Delivered'
	| 'Completed'
	| 'Cancelled';

export interface Customer {
	Id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	avatar: string;
	address: Address;
	loyaltyLevel: number;
}