'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NavBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		// Check if the user is logged in
		const user = localStorage.getItem('user');

		setIsLoggedIn(!!user); // Convert user to a boolean value
	}, []);

	if (!isLoggedIn) {
		return null;
	}

	const user = localStorage.getItem('user');

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
					<h1 className='text-white text-4xl mr-4'>
						Hello , {JSON.parse(user).first_name} !
					</h1>
					<div className='relative w-24 h-24'>
						<Image
							src={JSON.parse(user).avatar}
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
