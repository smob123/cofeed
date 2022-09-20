/**
 * holds global state
 */
import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../globals/auth/current-user-reducer';

export default configureStore({
    reducer: {
        currentUser: currentUserReducer
    }
});