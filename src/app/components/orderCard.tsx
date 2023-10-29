"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../product/[SKU_ID]/page";
import { StepperWithContent } from "@/components/StatusBar";
import { useEffect, useState } from "react";

export default function OrderCard({
  orderNumber,
  status,
  orderDate,
  deliveryAddress,
  total,
  onClick,
  products,
}) {

	const [activeStep, setActiveStep] = useState(-1);
	const [discount, setDiscount] = useState(0);

	useEffect(() => {
		const step = JSON.parse(localStorage.getItem("user") ?? "").LoyaltyLevel

		setActiveStep(step)

		const category = products[0].Category.substring(0, 2)

		if (step === 3){
			setDiscount(0.1)
		  }
		else if (category === "AC" && step >= 2 || category === "GU" && step >= 2) {
			setDiscount(0.1)
		  }

		else if (category === "GU" && step >= 1) {
			setDiscount(0.05)
		  }


		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);

	  const formattedOrderDate = new Date(orderDate).toLocaleDateString('en-GB');




  const orderStatus: Record<number, string> = {
    1: "Placed",
    2: "Dispatched",
    3: "Delivering",
    4: "Delivered",
    5: "Completed",
    6: "Cancelled",
  };

  return (	
    <motion.div
      onClick={onClick}
      className="bg-white rounded-xl p-6 w-full md:w-[500px] shadow-md"
    >
      <div className="flex justify-between mb-4">
        <span className="text-gray-700 bg-slate-400 rounded-lg">
          Order number: {orderNumber}
        </span>
		<div className="text-gray-700 bg-slate-400 rounded-lg">
			myguitarguitar Level: {activeStep}
		</div>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-gray-700">Order Placed: {formattedOrderDate}</span>
      </div>
      <div className="mb-10">
        <span className="text-lg font-bold text-black">Status:</span>
        <span className="text-lg ml-2 text-black">{orderStatus[status]}</span>
        <StepperWithContent status={status} />
      </div>
      <div className="mb-4">
        <span className="text-gray-700">Delivering to: {deliveryAddress}</span>
      </div>
      <div className="mt-4 border-t pt-4">
        <span className="text-lg font-bold text-black">Total: £{total}</span>
      </div>
      <div className="mt-4 border-t pt-4">
        <span className="text-lg font-bold text-black">Products: </span>
        {products.map((product, i) => {
          const truncatedDescription = `${product.ProductDetail.substring(
            0,
            25
          )}...`;

          return (
            <div key={i} className="flex flex-col">
              <div className="flex flex-row">
                <Image
                  src={product.PictureMain}
                  alt="Avatar"
                  width={75}
                  height={75}
                  className="rounded-full object-cover hidden md:block"
                />
                <div className="flex flex-col p-5 gap-2 w-full">
                  <span className="text-lg ml-2 text-black">
                    {product.ItemName}
                  </span>
                  <span className="text-lg ml-2 text-black">
					{ discount === 0 ? (
						<p>Price: £{Number(product.SalesPrice).toFixed(2)}</p>
					):(
						<div className="flex flex-col">
							<div className="flex justify-between">
								<p>Price:  </p>
								<div className="flex w-2/3 space-x-2 justify-center">
									<p className="line-through decoration-secondary decoration-2">£{Number(product.SalesPrice).toFixed(2)}</p>
									<p>{discount * 100}% Off</p>
								</div>
							</div>
							<div className="flex justify-between">
								<p>myguitarguitar Price:</p>
								<p className="flex text-secondary w-2/5 justify-start">£{Number(product.SalesPrice - (product.SalesPrice * discount)).toFixed(2)}</p>
							</div>
						</div>
					)
					}
                  </span>
                  <span className="text-lg ml-2 text-black">
                    Description:{" "}
                    <h2
                      dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                    />
                  </span>

                  <Link
                    href={`http://localhost:3000/product/${product.SKU_ID}`}
                    className="text-white"
                  >
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background bg-blue-500  hover:bg-blue-500/90 h-12 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all text-lg w-full mt-5">
                      More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
