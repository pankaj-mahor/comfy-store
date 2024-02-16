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

const getCartFromLocalStorage = () => {
	if (localStorage.getItem("cart")) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return defaultState;
	}
};

const cartSlice = createSlice({
	name: "cart",
	initialState: getCartFromLocalStorage(),
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

			cartSlice.caseReducers.calculateTotals(state);

			//Moved to calculcate Totals
			// state.tax = (TAX / 100) * state.cartTotal;
			// state.orderTotal = state.cartTotal + state.shipping + state.tax;
			// //Save at local storage
			// localStorage.setItem("cart", JSON.stringify(state));

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
			const { cartID } = action.payload;
			const product = state.cartItems.find((item) => item.cartID === cartID);

			state.cartItems = state.cartItems.filter(
				(item) => item.cartID !== cartID
			);
			state.numItemsInCart -= product.amount;
			state.cartTotal -= product.price * product.amount;

			cartSlice.caseReducers.calculateTotals(state);

			toast.success("Item removed from cart");
		},

		clearCart: (state) => {
			localStorage.setItem("cart", JSON.stringify(defaultState));
			return defaultState;
		},

		editItem: (state, action) => {
			const { cartID, amount } = action.payload;
			const item = state.cartItems.find((item) => item.cartID === cartID);

			state.numItemsInCart += amount - item.amount;
			state.cartTotal += item.price * (amount - item.amount);
			item.amount = amount;

			cartSlice.caseReducers.calculateTotals(state);

			toast.success("Cart Updated");
		},

		//for calculation re usable
		calculateTotals: (state) => {
			state.tax = (TAX / 100) * state.cartTotal;
			state.orderTotal = state.cartTotal + state.shipping + state.tax;
			//Save at local storage
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;

export default cartSlice.reducer;
