import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
const URL = "/auth/local/register";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		const response = await customFetch.post(URL, data);
		// console.log(response);
		toast.success("Account Created Successfully!");

		return redirect("/login");
	} catch (error) {
		const errorMessage =
			error?.response?.data?.error?.message ||
			"Please double check your credentails";

		toast.error(errorMessage);
		return null;
	}
};

const Register = () => {
	return (
		<section className="h-screen grid place-items-center ">
			<Form
				method="post"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Register</h4>

				<FormInput
					type="text"
					label="username"
					name="username"
					defaultValue="username"
				/>
				<FormInput
					type="email"
					label="Email"
					name="email"
					defaultValue="test@test.com"
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					defaultValue="secret"
				/>

				<div className="mt-4">
					<SubmitBtn text="Register" />
				</div>
				<button type="button" className="btn btn-secondary btn-block my-3">
					Guest User
				</button>
				<p className="text-center">
					Already a member?{" "}
					<Link className="ml-2 link-hover link-primary capitalize" to="/login">
						Login
					</Link>
				</p>
			</Form>
		</section>
	);
};
export default Register;
