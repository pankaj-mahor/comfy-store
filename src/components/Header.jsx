import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.userState.user);

	const queryClient = useQueryClient();

	const handleLogout = () => {
		navigate("/");
		dispatch(clearCart());
		dispatch(logoutUser());
		//remove all queries
		queryClient.removeQueries();
	};
	return (
		<header className="bg-neutral py-2 text-neutral-content">
			<div className="align-elements flex justify-center sm:justify-end">
				{/* USER */}
				{user ? (
					<>
						<div className="flex gap-x-2 sm:gap-x-8 items-center">
							<p className="text-xs sm:text-sm">Hello, {user.username}</p>
							<button
								className="btn btn-xs btn-outline btn-primary"
								onClick={handleLogout}
							>
								logout
							</button>
						</div>
					</>
				) : (
					<>
						{/* LINKS */}
						<div className="flex gap-x-6 justify-center items-center">
							<Link to="/login" className="link link-hover text-xs sm:text-sm">
								Sign in / Guest
							</Link>
							<Link
								to="/register"
								className="link link-hover text-xs sm:text-sm"
							>
								Create Account
							</Link>
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
