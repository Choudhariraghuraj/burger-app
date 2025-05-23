import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliar/Auxiliar'
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>
                        : {this.props.ingredients[igKey]}
                    </li>)
        })
        return (
            <Aux>
                <h1>Your Order</h1>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p> Continue to check-out</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}
export default OrderSummary
