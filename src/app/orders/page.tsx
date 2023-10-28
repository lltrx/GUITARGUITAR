'use client';
import OrderCard from '../components/orderCard';
import { motion, useScroll } from 'framer-motion';
import React from 'react';
import { useState, useEffect } from 'react';
import { Order } from '../utils/types';
import Loyalty from '@/components/loyalty';
import Image from 'next/image';

export default function Orders() {
	const [orders, setOrders] = useState<Array<Order>>([]);
	const [query, setQuery] = useState('');
	const [user, setUser] = useState(null);
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
		const userStored = JSON.parse(localStorage.getItem("user"));
		if (userStored !== null) {
		  setUser(userStored);
		  console.log("setting user");
	  
		  async function fetchData() {
			console.log(userStored);
			const response = await fetch('api/orders', {
			  method: 'POST',
			  headers: {
				'Content-type':'application/json'},
			  body: JSON.stringify({
				"customerID": userStored.Id.toString()
			  })
			});
			const order: Array<Order> = await response.json();
			setOrders(order);
		  }
	  
		  fetchData();
		}
	  }, []);
	  
  

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
		console.log("hello")
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
				status={order.OrderStatus}
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
		<>
        	<motion.div animate={{scaleX:0, transition:{duration:1.5}}} className="absolute flex w-screen h-screen inset-0 bg-primary z-40">
			</motion.div>
            <motion.div animate={{scale:[0.75,1.5], opacity:0, transition:{duration:1}}} className="absolute w-full h-screen flex justify-center items-center z-40">
				<Image src="/logo.png" alt="logo" width={400} height={72} />
            </motion.div>
			<div className="p-10 h-14 flex flex-row justify-between w-full mx-auto">
				<div className="flex justify-center items-center">
					<Image src="/logo.png" alt="Logo" width={150} height={150} />
				</div>
				<div className="flex flex-row justify-center items-center">
					<h1 className="text-secondary text-xl mr-4">
					Hello, {user!==null && user.first_name} !
					</h1>
					<div className="relative w-24 h-24">
					<Image
						src={user!==null && user.avatar}
						alt="Avatar"
						width={75}
						height={75}
						className="rounded-full object-cover"
					/>
					</div>
				</div>
			</div>
			<div className='flex flex-col justify-center items-center'>
	      <Loyalty showBtns />
			<motion.div
					className='flex flex-col justify-center items-center'
					initial='easeIn'
					animate={inputAnimationState}
					variants={inputVariants}>
					<h1 className='text-4xl text-secondary'>Orders</h1>
					<br></br>
					<input
						className='text-black rounded-xl px-4'
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
		</>

	);
}
