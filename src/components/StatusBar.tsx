'use client'

import React from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";

 
export function StepperWithContent(status:any) {

    const [activeStep, setActiveStep] = React.useState(status.status -1);

    if (status.status === 6) {
        return ( 
            <div className="px-10 py-4 text-black space-x-14">
                Cancelled
            </div>
        );
    }
    
    return (
        <div className="px-10 py-4">
        <Stepper
            activeStep={activeStep}
            activeLineClassName="bg-secondary"
        >
            <Step className="w-6 h-6" style={{ backgroundColor: activeStep >=0 ? "#EC661A" : "gray" }}>
            <div className="absolute -bottom-[2rem] text-center">
                <Typography
                variant="h6"
                className="text-sm"
                color={activeStep >= 0 ? "orange" : "gray"}
                >
                Placed
                </Typography>
            </div>
            </Step>
            <Step className="w-6 h-6" style={{ backgroundColor: activeStep >=1 ? "#EC661A" : "gray" }}>
            <div className="absolute -bottom-[2rem] text-center">
                <Typography
                variant="h6"
                className="text-sm"
                color={activeStep >= 1 ? "orange" : "gray"}
                >
                Dispatched
                </Typography>
            </div>
            </Step>
            <Step className="w-6 h-6" style={{ backgroundColor: activeStep >= 2 ? "#EC661A" : "gray" }}>
            <div className="absolute -bottom-[2rem] text-center">
                <Typography
                variant="h6"
                className="text-sm"
                color={activeStep >= 2 ? "orange" : "gray"}
                >
                Delivering
                </Typography>
            </div>
            </Step>
            <Step className="w-6 h-6" style={{ backgroundColor: activeStep >= 3 ? "#EC661A" : "gray" }}>
            <div className="absolute -bottom-[2rem] text-center">
                <Typography
                variant="h6"
                className="text-sm"
                color={activeStep >= 3 ? "orange" : "gray"}
                >
                Delivered
                </Typography>
            </div>
            </Step>
            <Step className="w-6 h-6" style={{ backgroundColor: activeStep >= 4 ? "#EC661A" : "gray" }}>
            <div className="absolute -bottom-[2rem] text-center">
                <Typography
                variant="h6"
                className="text-sm"
                color={activeStep >= 4 ? "orange" : "gray"}
                >
                Completed
                </Typography>
            </div>
            </Step>
        </Stepper>
        </div>
    );
}