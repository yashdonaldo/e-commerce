import React, { Fragment } from 'react'
import './CheckoutStep.scss';
import { Step, StepLabel, Stepper } from '@mui/material/'
import { MdAccountBalance, MdLibraryAddCheck, MdLocalShipping } from 'react-icons/md';

const CheckoutStep = ({activeStep}) => {
    const step = [
        {
            label: <span>Shipping Details</span>,
            icon: <MdLocalShipping/>,
        },
        {
            label: <span>Confirm Order</span>,
            icon: <MdLibraryAddCheck/>,
        },
        {
            label: <span>Payment Details</span>,
            icon: <MdAccountBalance />,
        },
    ];

    const stepStyle = {
        boxSizing: "border-box",
        marginTop: "10px"
    }
  return (
    <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
            {step.map((item, index)=>(
                <Step key={index} active={activeStep===index ? true : false} completed={activeStep >= index ? true: false}>
                    <StepLabel icon={item.icon} style={{color: activeStep>= index ? "tomato" : "rgba(0,0,0,0.649)"}}>{item.label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </Fragment>
  )


}

export default CheckoutStep
