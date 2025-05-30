import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl =>{
                return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added= {() =>props.ingredientAdded(ctrl.type)}
                        substract = {() => props.ingredientSubstract(ctrl.type)}
                        disabled = {props.disabled[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{ props.isAuth? 'ORDER NOW' :'SIGN UP TO ORDER'}</button>
        </div>
    )
}
export default BuildControls
