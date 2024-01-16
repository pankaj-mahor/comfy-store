import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import {
	About,
	Cart,
	Checkout,
	Error,
	HomeLayout,
	Landing,
	Login,
	Register,
	SingleProducts,
	Products,
	Orders,
} from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "products",
				element: <Products />,
			},
			{
				path: "products:id",
				element: <SingleProducts />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
