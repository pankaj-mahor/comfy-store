import React, { useState } from "react";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { IoFilterOutline } from "react-icons/io5";
import { customFetch } from "../utils";
import { useLocation } from "react-router-dom";
const url = "/products";

const allProductQuery = (queryParams) => {
	const { search, category, company, sort, price, shipping, page } =
		queryParams;
	return {
		queryKey: [
			"allProducts",
			search ?? "",
			category ?? "all",
			company ?? "all",
			sort ?? "a-z",
			price ?? 100000,
			shipping ?? false,
			page ?? 1,
		],
		queryFn: () => customFetch(url, { params: queryParams }),
	};
};

export const loader =
	(queryClient) =>
	async ({ request }) => {
		// const params = new URL(request.url).searchParams;

		// const search = params.get("search");
		// console.log(search);

		const params = Object.fromEntries([
			...new URL(request.url).searchParams.entries(),
		]);

		// console.log(params);
		// const response = await customFetch(url, {
		// 	params,
		// });
		const response = await queryClient.ensureQueryData(allProductQuery(params));
		// console.log(response);
		// console.log(request);
		const products = response.data.data;
		const meta = response.data.meta;
		return { products, meta, params };
	};

const Products = () => {
	const { search } = useLocation();
	//will have sticked
	const [showFilters, setShowFilters] = useState(search ? true : false);
	return (
		<div>
			{/* Filter Button */}
			<div
				className="filter-btn text-right flex justify-end items-center gap-3 4 cursor-pointer mb-4 "
				onClick={() => setShowFilters(!showFilters)}
			>
				<IoFilterOutline className="w-5 h-5" />
				<p className="font-medium">Filters</p>
			</div>
			{showFilters && <Filters />}
			<ProductsContainer />
			<PaginationContainer />
		</div>
	);
};

export default Products;
