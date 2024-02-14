import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const SHIPPING_CHARGES = 500;
const TAX = 8;

const defaultState = {
	cartItems: [],
	numItemsInCart: 0,
	cartTotal: 0,
	shipping: SHIPPING_CHARGES,
	tax: TAX,
	orderTotal: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: defaultState,
	reducers: {
		addItem: (state, action) => {
			console.log(action.payload);
		},

		removeItem: (state, action) => {
			console.log(action.payload);
		},

		clearCart: (state) => {
			console.log("CLEAR");
		},

		editItem: (state, action) => {
			console.log(action.payload);
		},
	},
});

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
