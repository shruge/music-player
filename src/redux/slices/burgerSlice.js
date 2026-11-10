import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
    name: 'isBurgerActive',
    initialState: false,
    reducers: {
        burgerActive: () => true,
        burgerInactive: () => false,
    }
})

export const { burgerActive, burgerInactive } = burgerSlice.actions;
export default burgerSlice.reducer;