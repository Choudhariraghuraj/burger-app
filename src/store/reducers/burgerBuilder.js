import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'
const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
    
}
const INGREDIANT_PRICES = {
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7,
    building: false
}
const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updateState)
}
const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updateState)
}
const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
    })
}
const fetchIngredientFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
}
const reducer = (state = intialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action)
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action) 
        default: return state
    }
}
export default reducer