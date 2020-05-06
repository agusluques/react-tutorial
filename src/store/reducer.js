import * as actionTypes from './actions'

const INGREDIENT_PRICES = {
    meat: 50,
    cheese: 20,
    bacon: 25,
    salad: 10
}

const initialState = {
    ingredients: {
        meat: 0,
        cheese: 0,
        bacon: 0,
        salad: 0
    },
    totalPrice: 250
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            const newIngredients = {...state.ingredients};

            newIngredients[action.ingredientName] = state.ingredients[action.ingredientName] + 1

            return{
                ...state,
                ingredients: newIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }

        default:
            return state;
    }
};

export default reducer;