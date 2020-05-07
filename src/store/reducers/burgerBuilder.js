import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const INGREDIENT_PRICES = {
    meat: 50,
    cheese: 20,
    bacon: 25,
    salad: 10
}

const initialState = {
    ingredients: null,
    totalPrice: 250,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updatedIngredients = { ...state.ingredients };
    updatedIngredients[action.ingredientName] = state.ingredients[action.ingredientName] + 1
    const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    return updateObject(state, {ingredients: updatedIngredients, totalPrice: updatedPrice, building: true})
}

const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1})
    const updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    return updateObject(state, {ingredients: updatedIngredients, totalPrice: updatedPrice, building: true})
}

const setIngredients = (state, action) => {
    return updateObject(state, {ingredients: action.ingredients, totalPrice: 250, error: false, building: false})
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state)
        default: return state;
    }
};

export default reducer;