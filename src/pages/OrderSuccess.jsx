import React from "react";
import { Link, useActionData, useLoaderData } from "react-router-dom";
import { SectionTitle } from "../components";

const OrderSuccess = () => {
	const data = useActionData();
	console.log(data);
	return (
		<>
			<SectionTitle text="Your Order Placed Successfully" />

			<h4></h4>
			<Link to="/login" className="btn btn-primary btn-block mt-8">
				See all orders
			</Link>
		</>
	);
};

export default OrderSuccess;
