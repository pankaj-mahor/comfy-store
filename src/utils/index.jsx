import axios from "axios";

const BASE_URL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
	baseURL: BASE_URL,
});

export const formatPriceUSD = (price) => {
	const dollarsAmount = new Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "usd",
	}).format((price / 100).toFixed(2));
	return dollarsAmount;
};

export const formatPriceInr = (price) => {
	const dollarsAmount = new Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "inr",
	}).format(price);
	return dollarsAmount;
};

export const generateAmountOptions = (number) => {
	return Array.from({ length: number }, (_, index) => {
		const amount = index + 1;
		return (
			<option key={amount} value={amount}>
				{amount}
			</option>
		);
	});
};
