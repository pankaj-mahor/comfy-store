import React from "react";
import { Hero } from "../components";
import FeaturedProducts from "../components/FeaturedProducts";
import { customFetch } from "../utils";

const url = "/products?featured=true";

export const loader = async () => {
	const response = await customFetch(url);
	const products = response.data.data;
	// console.log(products);
	return { products };
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
