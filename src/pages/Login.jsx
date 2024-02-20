import React from "react";
import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
const URL = "/auth/local";
// export const action = (store) => async () => {
// 	console.log(store);

// 	return null;
// };
export const action = (store) => {
	return async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			const response = await customFetch.post(URL, data);
			console.log(response.data);
			store.dispatch(loginUser(response.data));
			toast.success("You are logged in!");

			return redirect("/");
		} catch (error) {
			const errorMessage =
				error?.response?.data?.error?.message ||
				"Please double check your credentails";

			toast.error(errorMessage);
			return null;
		}
	};
};

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const guestLogin = async () => {
		try {
			const response = await customFetch.post("/auth/local", {
				identifier: "test@test.com",
				password: "secret",
			});
			dispatch(loginUser(response.data));
			toast.success("Welcome Guest User");
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error("guest login error..");
		}
	};

	return (
		<section className="h-screen grid place-items-center ">
			<Form
				method="post"
				className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
			>
				<h4 className="text-center text-3xl font-bold">Login</h4>

				<FormInput type="text" label="Email or Username" name="identifier" />
				<FormInput type="password" label="Password" name="password" />

				<div className="mt-4">
					<SubmitBtn text="login" />
				</div>
				<button
					type="button"
					className="btn btn-secondary btn-block my-3"
					onClick={guestLogin}
				>
					Guest User
				</button>
				<p className="text-center">
					Not a member yet?{" "}
					<Link
						className="ml-2 link-hover link-primary capitalize"
						to="/register"
					>
						Register
					</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;
