'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../product/[SKU_ID]/page';
import { StepperWithContent } from '@/components/StatusBar';

export default function OrderCard({
	orderNumber,
	status,
	orderDate,
	deliveryAddress,
	total,
	onClick,
	products,
}) {

	return (
		<motion.div
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
								<h2 dangerouslySetInnerHTML={{ __html: truncatedDescription}} />
							</span>
							<button className='inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background bg-blue-500  hover:bg-blue-500/90 h-12 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all text-lg '>
								<Link
									href={`http://localhost:3000/product/${product.SKU_ID}`}
									className='text-white'>
									More
								</Link>
							</button>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
