'use client'
import OrderCard from '../components/orderCard'
import { motion } from "framer-motion";
import React from 'react'
import { useState, useEffect } from 'react'
import { Order } from '../utils/types'

export default function Orders() {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [query, setQuery] = useState('');

  //Our search filter function
  const searchFilter = (array: Array<Order>) => {
    const filtered = array.filter(
      (order) => order.Products.filter(
        (product) => product.ItemName.toLowerCase().includes(query.toLowerCase())
      ).length > 0
    )
    return filtered;
  }

  //Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(orders)

  //Handling the input on our search bar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const customerID = localStorage.getItem('user.CustomerId')
    const response = await fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'},
      body: JSON.stringify({
        customerID: customerID?.toString()
      })
    })
    const order: Array<Order> = await response.json();
    setOrders(order);
  }
  

  const ordersList = filtered.map((order, i) => (
    <OrderCard
      key={i}
      orderNumber={order.Id}
      status={order.OrderStatus}
      orderDate={order.DateCreated}
      deliveryAddress={order.ShippingAddress.street_address}
      total={order.OrderTotal}
    />
  ));

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl'>Orders</h1>
      <br></br>
      <input className='text-black rounded-xl px-4' onChange={handleChange} type='text' placeholder='Search product name...'/>
      <br></br>
      <motion.div className='flex flex-col gap-10 justify-between'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {ordersList}
      </motion.div>
    </div>
  );
}
