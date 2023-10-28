'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StepperWithContent } from '@/components/StatusBar';

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
	products,
}) {
	return (
		<motion.div
			initial={initial}
			animate={animate}
			variants={variants}
			onClick={onClick}
			className='bg-white rounded-xl p-6 min-w-[500px] shadow-md '>
			<div className='flex justify-between mb-4'>
				<span className='text-gray-700 bg-slate-400 rounded-lg'>
					Order number: {orderNumber}
				</span>
			</div>
			<div className='flex justify-between mb-4'>
				<span className='text-gray-700'>Order Placed: {orderDate}</span>
			</div>
			<div className='mb-4 '>
				<span className='text-lg font-bold text-black'>Status:</span>
				<span className='text-lg ml-2 text-black'>{status}</span>
                <StepperWithContent status={status} />
			</div>
			<div className='mb-4'>
				<span className='text-gray-700'>Delivering to: {deliveryAddress}</span>
			</div>
			<div className='mt-4 border-t pt-4'>
				<span className='text-lg font-bold text-black'>Total: £{total}</span>
			</div>
			<div className='mt-4 border-t pt-4'>
				<span className='text-lg font-bold text-black'>Products: </span>
				{products.map((product, i) => {
					const truncatedDescription = `${product.ProductDetail.substring(
						0,
						50,
					)}...`;

					return (
						<div
							key={i}
							className='flex flex-col'>
							<div className='flex flex-row'>
								<Image
									src={product.PictureMain}
									alt='Avatar'
									width={75}
									height={75}
									className='rounded-full object-cover'
								/>
								<span className='text-lg ml-2 text-black'>
									{product.ItemName}
								</span>
							</div>
							<span className='text-lg ml-2 text-black'>
								Price: £{product.SalesPrice}
							</span>
							<span className='text-lg ml-2 text-black'>
								Description: {truncatedDescription}
							</span>
							<Link href={`http://localhost:3000/product/${product.Id}`} className='text-black'>
										More 
							</Link>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
