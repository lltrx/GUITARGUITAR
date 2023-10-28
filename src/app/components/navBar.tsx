'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default async function NavBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check if the user is logged in
		const user = localStorage.getItem('user');
		setIsLoggedIn(!!user); // Convert user to a boolean value
	}, []);

	if (!isLoggedIn) {
		return null;
	}

	const response = await fetch('http://localhost:3000/api/customers', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	const firstName = data.length > 0 ? data[0].first_name : 'Name not available';
	const avatar = data.length > 0 ? data[0].avatar : 'Avatar not available';

	console.log('First Name:', firstName);
	console.log('Avatar:', avatar);

	return (
		<div className='sticky top-0 z-0 p-5 '>
			<div className='p-10 flex flex-row justify-between w-full mx-auto'>
				<div className='flex justify-center items-center'>
					<Image
						src='/logo.png'
						alt='Logo'
						width={100}
						height={100}
					/>
				</div>
				<div className='flex flex-row justify-center items-center'>
					<h1 className='text-white text-4xl mr-4'>Hello, {firstName}!</h1>
					<div className='relative w-24 h-24'>
						<Image
							src={avatar}
							alt='Avatar'
							layout='fill'
							objectFit='cover'
							className='rounded-full'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
