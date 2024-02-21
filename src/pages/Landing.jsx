import React from "react";
import { Hero } from "../components";
import FeaturedProducts from "../components/FeaturedProducts";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredProductQuery = {
	queryKey: ["featuredProducts"],
	queryFn: () => customFetch(url),
};

export const loader = (queryClient) => {
	return async () => {
		const response = await queryClient.ensureQueryData(featuredProductQuery);
		const products = response.data.data;
		// console.log(products);
		return { products };
	};
};

const Landing = () => {
	return (
		<>
			<Hero />
			<FeaturedProducts />
		</>
	);
};

export default Landing;
