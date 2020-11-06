import * as ActionTypes from './ActionTypes';
import { DISHES } from '../Shared/dishes';
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author, 
        comment: comment
    }
});
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 5000);
}

export const dishesLoading = () => ({
    type: ActionTypes.DISH_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISH_FAILED,
    payload:errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload:dishes
});