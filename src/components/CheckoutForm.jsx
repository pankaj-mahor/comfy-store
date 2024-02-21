import React from "react";
import { useSelector } from "react-redux";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { customFetch, formatPriceInr } from "../utils";
import FormInput from "./FormInput";
import SectionTitle from "./SectionTitle";
import SubmitBtn from "./SubmitBtn";
const url = "/orders";

export const action = (store, queryClient) => {
	return async ({ request }) => {
		const formData = await request.formData();
		const { name, address } = Object.fromEntries(formData);

		const user = store.getState().userState.user;
		const { cartItems, orderTotal, numItemsInCart } =
			store.getState().cartState;

		const info = {
			name,
			address,
			chargeTotal: orderTotal,
			orderTotal: formatPriceInr(orderTotal),
			numItemsInCart,
			cartItems,
		};
		try {
			const response = await customFetch.post(
				url,
				{ data: info },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			//remove query
			queryClient.removeQueries(["orders"]);
			store.dispatch(clearCart());
			toast.success("Order placed successfully.");
			return redirect("/orders");
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error?.message ||
				"There was an error placing order";

			toast.error(errorMessage);

			//auth error
			if (error.response.status === 401 || error.response.status === 403) {
				redirect("/login");
				store.dispatch(logoutUser());
			}
			return null;
		}
		// const user = store.getState().userState.user;

		// if (!user) {
		// 	toast.warn("You must be logged in to checkout");
		// 	return redirect("/login");
		// }
		return null;
	};
};
const CheckoutForm = () => {
	return (
		<Form method="POST" className="flex flex-col gap-y-4">
			<h4 className="font-medium text-xl capitalize">Shipping Information</h4>
			<FormInput label="first name" name="name" type="text" />
			<FormInput label="address" name="address" type="text" />
			<div className="mt-4">
				<SubmitBtn text="place your order" />
			</div>
		</Form>
	);
};

export default CheckoutForm;
