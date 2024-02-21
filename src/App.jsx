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
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
// import { loader as orderSuccessLoader } from "./pages/OrderSuccess";

//actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";
import OrderSuccess from "./pages/OrderSuccess";
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
			{
				path: "checkout",
				element: <Checkout />,
				loader: checkoutLoader(store),
				action: checkoutAction(store),
			},
			{
				path: "orders",
				element: <Orders />,
				loader: ordersLoader(store),
				// action: checkoutAction(store),
			},
			// {
			// 	path: "order-success",
			// 	element: <OrderSuccess />,
			// 	loader: checkoutLoader(store),
			// 	// action: checkoutAction(store),
			// },
		],
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <Error />,
		action: loginAction(store),
	},
	{
		path: "/register",
		element: <Register />,
		errorElement: <Error />,
		action: registerAction,
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
