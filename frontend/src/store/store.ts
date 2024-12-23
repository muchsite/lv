import { configureStore } from "@reduxjs/toolkit";
import { employesApi } from "./api/users";
import { authApi } from "./api/auth";
import { updateUser } from "./api/updateUser";


export const store = configureStore({
    reducer: {
        [employesApi.reducerPath]: employesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [updateUser.reducerPath]: updateUser.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(updateUser.middleware).concat(employesApi.middleware).concat(authApi.middleware),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
