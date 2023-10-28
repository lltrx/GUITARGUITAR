'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function OrderCard({
	orderNumber,
	status,
	orderDate,
	deliveryAddress,
	total,
	initial,
	animate,
	variants,
	onClick,
}) {
	return (
		<motion.div
		initial={initial}
		animate={animate}
		variants={variants}
		onClick={onClick}
		className='bg-white rounded-xl p-6 w-96 shadow-md '>
			<div className='flex justify-between mb-4'>
				<span className='text-gray-700 bg-slate-400 rounded-lg'>
					Order number: {orderNumber}
				</span>
			</div>
			<div className='flex justify-between mb-4'>
				<span className='text-gray-700'>Order Placed: {orderDate}</span>
			</div>
			<div className='mb-4'>
				<span className='text-lg font-bold text-black'>Status:</span>
				<span className='text-lg ml-2'>{status}</span>
			</div>
			<div className='mb-4'>
				<span className='text-gray-700'>Delivering to: {deliveryAddress}</span>
			</div>
			<div className='mt-4 border-t pt-4'>
				<span className='text-lg font-bold text-black'>Total: £{total}</span>
			</div>
		</motion.div>
	);
}
