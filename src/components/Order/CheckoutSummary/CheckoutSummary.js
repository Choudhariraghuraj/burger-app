import React from 'react'
import Burger from '../../Burger/Burger'
import Buttton from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ props.ingredients} />
            </div>
            <Buttton
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Buttton>
            <Buttton
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Buttton>
        </div>
    )
}
export default CheckoutSummary
