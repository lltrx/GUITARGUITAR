"use client"
import OrderCard from '../components/orderCard'
import { motion } from "framer-motion";
import React from "react";


export default function Orders() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl'>Orders</h1>
      <br></br>
      <div className='relative'>
        <motion.svg
          width='100%'
          height='100%'
          viewBox='0 0 200 200'
          className='absolute top-0 left-0'
        >
          <motion.rect
            x='10'
            y='10'
            width='180'
            height='180'
            stroke='#ff0055'
            strokeWidth='2'
            fill='transparent'
            variants={draw}
          />
        </motion.svg>
        <motion.div
          className='relative z-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <OrderCard
            orderNumber='123456'
            status='Preparing'
            orderDate='2021-06-01'
            deliveryAddress='123 Fake Street'
            total='10.00'
          />
        </motion.div>
      </div>
    </div>
  );
}

const draw = {
  hidden: { pathLength: 0.5, opacity: 1 },
  visible: (i: number) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 2,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 5 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};
