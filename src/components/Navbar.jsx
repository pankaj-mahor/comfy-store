import React, { useState } from "react";
import { useEffect } from "react";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../features/user/userSlice";
import NavLinks from "./NavLinks";

const Navbar = () => {
	const dispatch = useDispatch();

	const handleTheme = () => {
		// const { winter, dracula } = themes;
		// const newTheme = theme === winter ? dracula : winter;
		// //set html doc
		// setTheme(newTheme);

		dispatch(toggleTheme());
	};

	// useEffect(() => {
	// 	document.documentElement.setAttribute("data-theme", theme);
	// 	localStorage.setItem("theme", theme);
	// }, [theme]);

	const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
	return (
		<nav className="bg-base-200">
			<div className="navbar align-elements">
				<div className="navbar-start">
					{/* TITLE */}
					<NavLink to="/" className="hidden lg:flex btn btn-primary text-3xl">
						C
					</NavLink>

					{/* DROPDOWN */}
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<FaBarsStaggered className="h-6 w-6" />
						</label>

						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
						>
							<NavLinks />
						</ul>
					</div>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal">
						<NavLinks />
					</ul>
				</div>
				<div className="navbar-end">
					{/* THEME SETUP */}
					<label className="swap swap-rotate">
						<input type="checkbox" name="" id="" onChange={handleTheme} />
						{/* SUN  icon*/}
						<BsSunFill className="h-4 w-4 swap-on" />
						{/* MOON icon */}
						<BsMoonFill className="h-4 w-4 swap-off" />
					</label>
					{/* CART LINK */}
					<NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
						<div className="indicator">
							<BsCart3 className="h-6 w-6" />
							<span className="badge badge-sm badge-primary indicator-item">
								{numItemsInCart}
							</span>
						</div>
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
