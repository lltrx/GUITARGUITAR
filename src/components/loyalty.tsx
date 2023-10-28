"use client";

import React from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { PiGuitarDuotone } from "react-icons/pi";

export default function Loyalty({ showBtns }: { showBtns?: boolean }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="w-full px-24 py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <PiGuitarDuotone />
          <div className="absolute -bottom-[4.5rem] w-max text-center max-w-[150px]">
            <div color={activeStep === 0 ? "blue-gray" : "gray"}>Level 1</div>
            <div
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              5% Off Guitars
            </div>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <PiGuitarDuotone />
          <div className="absolute -bottom-[4.5rem] w-max text-center max-w-[150px]">
            <div color={activeStep === 1 ? "blue-gray" : "gray"}>Level 2</div>
            <div
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              10% Off Guitars and Accessory Products
            </div>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <PiGuitarDuotone />
          <div className="absolute translate-y-24 w-max text-center max-w-[150px]">
            <div color={activeStep === 2 ? "blue-gray" : "gray"}>Level 3</div>
            <div
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal"
            >
              10% Off All Products, Early Access, and Free Delivery
            </div>
          </div>
        </Step>
      </Stepper>
      {!!showBtns && (
        <div className="mt-32 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

// import {
//   Box,
//   Step,
//   StepDescription,
//   StepIcon,
//   StepIndicator,
//   StepNumber,
//   StepSeparator,
//   StepStatus,
//   StepTitle,
//   Stepper,
//   useSteps,
// } from "@chakra-ui/react";

// const steps = [
//   { title: "Level 1", description: "5% Off Guitars" },
//   { title: "Level 2", description: "10% Off Guitars & Accessories" },
//   {
//     title: "Level 3",
//     description: "10% Off Everything & Free Delivery & Early Access",
//   },
// ];

// export default function Loyalty() {
//   const { activeStep, setActiveStep } = useSteps({
//     index: 1,
//     count: steps.length,
//   });

//   return (
//     <Stepper size="lg" index={activeStep} colorScheme="blue">
//       {steps.map((step, index) => (
//         <Step key={index} onClick={() => setActiveStep(index)}>
//           <StepIndicator>
//             <StepStatus
//               complete={<StepIcon />}
//               incomplete={<StepNumber />}
//               active={<StepNumber />}
//             />
//           </StepIndicator>

//           <Box flexShrink="0">
//             <StepTitle>{step.title}</StepTitle>
//             <StepDescription>{step.description}</StepDescription>
//           </Box>

//           <StepSeparator />
//         </Step>
//       ))}
//     </Stepper>
//   );
// }
