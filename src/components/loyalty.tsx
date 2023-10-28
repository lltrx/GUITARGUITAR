"use client";

import React, { useEffect } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { PiGuitarDuotone } from "react-icons/pi";

export default function Loyalty({ debug }: { debug?: boolean }) {
  const userItem = localStorage.getItem("user");
  // const { LoyaltyLevel } = userItem ? JSON.parse(userItem) : null;
  const [activeStep, setActiveStep] = React.useState(-1);

  const loyaltyLvl = JSON.parse(userItem ?? "").LoyaltyLevel

  useEffect(() => {
    setTimeout(() => setActiveStep( ( loyaltyLvl - 0) ), 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="text-4xl text-secondary">Loyalty Level 🎉</p>
      <div className="w-full max-w-3xl px-24 py-4 mb-32">
        <Stepper
          lineClassName="bg-black shadow shadow-white"
          activeLineClassName="bg-white shadow-lg shadow-white"
          activeStep={activeStep}
        >
          <Step
            style={{
              backgroundColor: activeStep >= 0 ? "whitesmoke" : "black",
            }}
            onClick={() => (debug ? setActiveStep(0) : null)}
            className="transition-all duration-200"
          >
            <div className={activeStep >= 0 ? "text-secondary" : "text-black"}>
              <PiGuitarDuotone />
            </div>
            <div
              className={`absolute translate-y-14 w-max text-center max-w-[150px] ${
                activeStep >= 0 ? "text-white" : "text-gray-500"
              }`}
            >
              <div>Level 1</div>
              <div className={`font-normal`}>5% Off Guitars</div>
            </div>
          </Step>
          <Step
            style={{
              backgroundColor: activeStep >= 0 ? "whitesmoke" : "black",
            }}
            onClick={() => (debug ? setActiveStep(1) : null)}
            className="transition-all duration-200"
          >
            <div className={activeStep >= 1 ? "text-secondary" : "text-black"}>
              <PiGuitarDuotone />
              <PiGuitarDuotone />
            </div>
            <div
              className={`absolute translate-y-20 w-max text-center max-w-[150px] ${
                activeStep >= 1 ? "text-white" : "text-gray-500"
              }`}
            >
              <div>Level 2</div>
              <div className={`font-normal`}>
                10% Off Guitars and Accessory Products
              </div>
            </div>
          </Step>
          <Step
            style={{
              backgroundColor: activeStep >= 0 ? "whitesmoke" : "black",
            }}
            onClick={() => (debug ? setActiveStep(2) : null)}
            className="transition-all duration-200"
          >
            <div className={activeStep >= 2 ? "text-secondary" : "text-black"}>
              <div className="absolute -translate-x-1"><PiGuitarDuotone /></div>
              <div className="absolute -translate-x-1 -translate-y-4 "><PiGuitarDuotone /></div>
              <div className="absolute -translate-x-4 -translate-y-3 "><PiGuitarDuotone /></div>
            </div>
            <div
              className={`absolute translate-y-24 w-max text-center max-w-[150px] ${
                activeStep >= 2 ? "text-white" : "text-gray-500"
              }`}
            >
              <div>Level 3</div>
              <div className={`font-normal`}>
                10% Off All Products, Early Access, and Free Delivery
              </div>
            </div>
          </Step>
        </Stepper>
      </div>
    </>
  );
}
