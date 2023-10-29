'use client';
import { useViewportSize } from '@mantine/hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';

export default function NavBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { width } = useViewportSize();

	useEffect(() => {
		const user = localStorage.getItem('user');
		setIsLoggedIn(!!user);
	}, []);

	const handleLogout = () => {
		localStorage.clear();
	};

	if (!isLoggedIn) {
		return null;
	}

	const user = localStorage.getItem('user');

	return (
		<div className='p-10 h-14 flex flex-row justify-center md:justify-between w-full mx-auto'>
			<div className='flex justify-center items-center'>
				<Image
					src='/logo.png'
					alt='Logo'
					width={150}
					height={150}
				/>
			</div>
			<div className='hidden md:flex flex-row justify-center items-center'>
				<h1 className='text-white text-base md:text-xl mr-4'>
					Hello, {JSON.parse(user).first_name} !
				</h1>
				<div className='relative w-24 h-24'>
					<MyDropdown />
				</div>
			</div>
		</div>
	);
}

function MyDropdown() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { width } = useViewportSize();

	useEffect(() => {
		const user = localStorage.getItem('user');
		setIsLoggedIn(!!user);
	}, []);

	const handleLogout = () => {
		localStorage.clear();
    window.location.href = '/'
	};

	if (!isLoggedIn) {
		return null;
	}

	const user = localStorage.getItem('user');
	return (
		<Menu>
			<Menu.Button as='div'>
				<Image
					src={JSON.parse(user).avatar}
					alt='Avatar'
					width={width >= 718 ? 75 : 55}
					height={width >= 718 ? 75 : 55}
					className='rounded-full object-cover translate-y-3 md:translate-y-0'
				/>
			</Menu.Button>
			<Menu.Items className={'flex mt-6 bg-white justify-center rounded-md'}>
				<Menu.Item>
						<button
							onClick={handleLogout}>
                <span className='text-red-500'>

							Logout
                </span>
						</button>

				</Menu.Item>
		</Menu.Items>
    </Menu>
	);
}
