import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
	winter: "winter",
	dracula: "dracula",
};

const getThemeFromLocalStorage = () => {
	const theme = localStorage.getItem("theme") || themes.winter;
	document.documentElement.setAttribute("data-theme", theme);
	return theme;
};

const defaultUserState = {
	user: {
		username: "pankaj-mahor",
	},
	theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
	name: "userSlice",
	initialState: defaultUserState,
	reducers: {
		loginUser: (state, action) => {
			console.log(action.payload);
		},
		logoutUser: (state) => {
			state.user = null;
			localStorage.removeItem("user");
			toast.success("Logged out successfully");
		},
		toggleTheme: (state) => {
			const { winter, dracula } = themes;
			const newTheme = state.theme === winter ? dracula : winter;
			document.documentElement.setAttribute("data-theme", newTheme);
			localStorage.setItem("theme", newTheme);
			state.theme = newTheme;
		},
	},
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
