import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Aux from '../../hoc/Auxiliar/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export class BurgerBuilder extends Component {
    state = {
        purchasing:false
    }
/*     addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIANT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIANT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    } */
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum,el) => {
                        return sum +el;
                    },0);
        return sum>0
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }
    purchaseCancelHandler = () =>{
        this.setState({
            purchasing:false
        })
    }
    purchaseContinueHandler = () =>{
        this.props.onPurchaseInit()
        this.props.history.push('/checkout')
    }
    componentDidMount() {
        this.props.onInitIngredients()
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.props.error? <p>Ingrediants not loading!!!</p> : <Spinner />
        let orderSummary = null
        if(this.props.ings){
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientSubstract = {this.props.onIngredientRemoved}
                    price={this.props.price}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandler}
                    isAuth = {this.props.isAuthenticated}
                    disabled={disabledInfo}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}/>
        }

        return (
            <Aux>                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios))
