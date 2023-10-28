'use client';
import OrderCard from '../components/orderCard';
import { motion, useScroll } from 'framer-motion';
import React from 'react';
import { useState, useEffect } from 'react';
import { Order } from '../utils/types';

export default function Orders() {
	const [orders, setOrders] = useState<Array<Order>>([]);
	const [query, setQuery] = useState('');
	const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
	const containerRef = React.useRef(null);
	const { scrollYProgress } = useScroll(containerRef);

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
		getOrders();
	}, []);

  const getOrders = async () => {

    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem): null;

    if (!user) {
      window.location.href = '/';
      return;
    }

    const response = await fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'},
      body: JSON.stringify({
        "customerID": user.Id.toString()
      })
    })
    const order: Array<Order> = await response.json();
    setOrders(order);
  }
  

	const expandInOut = {
		collapsed: {
			scale: 1,
			y: 0,
			transition: { duration: 0.3, ease: 'easeOut' },
		},
		expanded: {
			scale: 2,
			y: 0,
			transition: { duration: 0.3, ease: 'easeInOut' },
		},
		top: { y: '-150%', transition: { duration: 0.3, ease: 'easeInOut' } }, // Moves the card further to the top
		bottom: { y: '150%', transition: { duration: 0.3, ease: 'easeInOut' } }, // Moves the card further to the bottom
	};

	const ordersList = filtered.map((order, i) => {
		let animationState;
		if (expandedOrder === order.Id) {
			animationState = 'expanded';
		} else if (expandedOrder !== null) {
			const expandedIndex = filtered.findIndex((o) => o.Id === expandedOrder);
			animationState = i < expandedIndex ? 'top' : 'bottom';
		} else {
			animationState = 'collapsed';
		}

		return (
			<OrderCard
				key={i}
				orderNumber={order.Id}
				initial='collapsed'
				animate={animationState}
				variants={expandInOut}
				onClick={() => {
					if (expandedOrder === order.Id) {
						setExpandedOrder(null);
					} else {
						setExpandedOrder(order.Id);
					}
				}}
				status={order.Status}
				orderDate={order.Date}
				deliveryAddress={order.DeliveryAddress}
				total={order.Total}
				products={order.Products}
			/>
		);
	});

	const inputAnimationState = expandedOrder !== null ? 'easeOut' : 'easeIn';

	const inputVariants = {
		easeIn: { opacity: 1, transition: { duration: 0.3, ease: 'easeIn' } },
		easeOut: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			<motion.div
      className='flex flex-col justify-center items-center'
				initial='easeIn'
				animate={inputAnimationState}
				variants={inputVariants}>
				<h1 className='text-4xl'>Orders</h1>
				<br></br>
				<input
					className='w-4/5 h-14 border-b-2 border-gray-300 text-gray-900 transition-all focus:outline-none focus:w-full focus:border-2 focus:border-secondary rounded-3xl p-6'
					onChange={handleChange}
					type='text'
					placeholder='Search product name...'
				/>
			</motion.div>
			<br></br>
			<motion.div className='flex flex-col gap-10 justify-between'>
				{ordersList}
			</motion.div>
		</div>
	);
}
