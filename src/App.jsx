import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ErrorElement } from "./components";
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

//loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProducts";
import { loader as productLoader } from "./pages/Products";

//actions
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Landing />,
				errorElement: <ErrorElement />,
				loader: landingLoader,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "products",
				element: <Products />,
				errorElement: <ErrorElement />,
				loader: productLoader,
			},
			{
				path: "products/:id",
				element: <SingleProducts />,
				errorElement: <ErrorElement />,
				loader: singleProductLoader,
			},
			{
				path: "cart",
				element: <Cart />,
				errorElement: <ErrorElement />,
				// loader: singleProductLoader,
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
