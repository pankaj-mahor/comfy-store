import React from "react";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url = "/products";

export const loader = async ({ request }) => {
	// const params = new URL(request.url).searchParams;

	// const search = params.get("search");
	// console.log(search);

	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries(),
	]);

	// console.log(params);
	const response = await customFetch(url, {
		params,
	});
	// console.log(response);
	// console.log(request);
	const products = response.data.data;
	const meta = response.data.meta;
	return { products, meta, params };
};

const Products = () => {
	return (
		<div>
			<Filters />
			<ProductsContainer />
			<PaginationContainer />
		</div>
	);
};

export default Products;
