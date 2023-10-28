"use client"
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
    const response = await fetch('api/orders', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'},
      body: JSON.stringify({
        "customerID": "9833" // localStorage.getItem('user.CustomerId')
      })
    })
    const order: Array<Order> = await response.json();
    setOrders(order);
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

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl'>Orders</h1>
      <br></br>
      <input className='text-black rounded-xl px-4' onChange={handleChange} type='text' placeholder='Search product name...'/>
      <br></br>
      <div className=''>
          <OrderCard
            orderNumber='123456'
            status='Preparing'
            orderDate='2021-06-01'
            deliveryAddress='123 Fake Street'
            total='10.00'
          />
      </div>
    </div>
  );
}
