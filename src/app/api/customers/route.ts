interface Customer {
    Id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    avatar: string;
    address: Address;
    loyaltyLevel: number;
}

interface Address {
    city: string;
    street_name: string;
    street_address: string;
    zip_code: string;
    country: string;
}

export async function GET(req: Request) {
    const response = await fetch('https://www.guitarguitar.co.uk/hackathon/customers/');
    const data = await response.json();
    return Response.json(data);
}
