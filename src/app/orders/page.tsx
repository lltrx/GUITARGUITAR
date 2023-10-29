'use client';
import OrderCard from '../components/orderCard';
import { motion } from 'framer-motion';
import React from 'react';
import { useState, useEffect } from 'react';
import { Order } from '../utils/types';
import Loyalty from '@/components/loyalty';
import Image from 'next/image';
import NavBar from '../components/navBar';

export default function Orders() {
	const [orders, setOrders] = useState<Array<Order>>([]);
	const [query, setQuery] = useState('');
	const [user, setUser] = useState(null);

	//Our search filter function
	const searchFilter = (array: Array<Order>) => {
		const filtered = array.filter(
			(order) =>
				order.Products.filter((product) =>
					product.ItemName.toLowerCase().includes(query.toLowerCase()),
				).length > 0,
		);
		return filtered;
	};

	//Applying our search filter function to our array of countries recieved from the API
	const filtered = searchFilter(orders);

	//Handling the input on our search bar
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		const userStored = JSON.parse(localStorage.getItem('user'));
		if (userStored !== null) {
			setUser(userStored);
			console.log('setting user', userStored);

			async function fetchData() {
				console.log(userStored);
				const response = await fetch('api/orders', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({
						customerID: userStored.Id.toString(),
					}),
				});
				const order: Array<Order> = await response.json();
				setOrders(order);
			}

			fetchData();
		}
	}, []);

	const ordersList = filtered.map((order, i) => {
		return (
			<OrderCard
				key={i}
				orderNumber={order.Id}
				onClick={() => {}}
				status={order.OrderStatus}
				orderDate={order.DateCreated}
				deliveryAddress={order.ShippingAddress.street_address}
				total={order.OrderTotal}
				products={order.Products}
			/>
		);
	});




	return (
		<>
			<motion.div
				animate={{ scaleX: 0, transition: { duration: 1.0 } }}
				className='absolute flex w-screen h-screen inset-0 bg-primary z-40'></motion.div>
			<motion.div
				animate={{ scale: 0, opacity: 0, transition: { duration: 1 } }}
				className='absolute w-full h-screen flex justify-center items-center z-40'>
				<Image
					src='/logo.png'
					alt='logo'
					width={400}
					height={72}
				/>
			</motion.div>
			<NavBar />
			<div className='flex flex-col justify-center items-center'>
			
      <Loyalty debug={false} />
			<motion.div
					className='flex flex-col justify-center items-center'>
					<h1 className='text-2xl md:text-4xl text-secondary'>Orders</h1>
					<br></br>
					<input
						className='w-4/5 h-10 border-b-2 border-gray-300 text-gray-900 transition-all focus:outline-none focus:w-64 md:focus:w-96 focus:border-2 focus:border-secondary rounded-3xl p-6'
						onChange={handleChange}
						type='text'
						placeholder='Search product name...'
					/>
				</motion.div>
				<br></br>
				<motion.div className='flex flex-col gap-10 justify-between pb-20 px-3 md:px-6'>
					{ordersList}
				</motion.div>
			</div>
		</>
	);
}
