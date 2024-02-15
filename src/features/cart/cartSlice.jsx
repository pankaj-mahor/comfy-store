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
			const { product } = action.payload;

			const item = state.cartItems.find(
				(item) => item.cartID === product.cartID
			);
			if (item) {
				item.amount += product.amount;
			} else {
				state.cartItems.push(product);
			}

			state.numItemsInCart += product.amount;
			state.cartTotal += product.price * product.amount;
			state.tax = (TAX / 100) * state.cartTotal;
			state.orderTotal = state.cartTotal + state.shipping + state.tax;

			//Save at local storage
			localStorage.setItem("cart", JSON.stringify(state));
			toast.success("Item added to cart");

			// state.shipping = SHIPPING_CHARGES
			// state.cartItems.push({
			// 	...product,
			// });
			//  state.cartItems = [...state.cartItems, ...product]
			// state.numItemsInCart++;
			// console.log(action.payload);
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
