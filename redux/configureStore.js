import { createStore ,combineReducers, applyMiddleware }  from 'redux';
import {Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotion';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () =>{
    const store = createStore(
            combineReducers({
                dishes: Dishes,
                comments : Comments,
                promotions : Promotions,
                leaders : Promotions
            }),
            applyMiddleware(thunk, logger)
    );
    return store;
}