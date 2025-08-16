/** @format */
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Products from "./components/Products/Products.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Brands from "./components/Brands/Brands.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AllOrder from "./components/AllOrder/AllOrder.jsx";
import CheckOut from "./components/CheckOut/CheckOut.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import Subcatgory from "./components/Subcatgory/Subcatgory.jsx";
import RestPassword from "./components/RestPassword/RestPassword.jsx";
import Code from "./components/Code/Code.jsx";
import NewPassword from "./components/NewPassword/NewPassword.jsx";
function App() {
	const queryClient = new QueryClient();
	const routes = createHashRouter([
		{
			path: '',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{ path: 'Home', element: <Home /> },
				{
					path: '/RestPassword',
					element: <RestPassword />,
				},
				{
					path: '/NewPassword',
					element: <NewPassword />,
				},
								{
					path: '/Code',
					element: <Code />,
				},
				{
					path: 'Cart',
					element: (
						<ProtectedRoutes>
							<Cart />
						</ProtectedRoutes>
					),
				},
				{
					path: 'Products',
					element: (
						<ProtectedRoutes>
							<Products />
						</ProtectedRoutes>
					),
				},
				{
					path: '/Subcatgory/:id',
					element: (
						<ProtectedRoutes>
							<Subcatgory />
						</ProtectedRoutes>
					),
				},
				{
					path: 'Wishlist',
					element: (
						<ProtectedRoutes>
							<Wishlist />
						</ProtectedRoutes>
					),
				},
				{
					path: 'Categories',
					element: (
						<ProtectedRoutes>
							<Categories />
						</ProtectedRoutes>
					),
				},
				{
					path: '/ProductDetails/:id/:category',
					element: (
						<ProtectedRoutes>
							<ProductDetails />
						</ProtectedRoutes>
					),
				},
				{
					path: 'Brands',
					element: (
						<ProtectedRoutes>
							<Brands />
						</ProtectedRoutes>
					),
				},
				{
					path: 'allorders',
					element: (
						<ProtectedRoutes>
							<AllOrder />
						</ProtectedRoutes>
					),
				},
				{
					path: 'checkout',
					element: (
						<ProtectedRoutes>
							<CheckOut />
						</ProtectedRoutes>
					),
				},

				{ path: 'Login', element: <Login /> },
				{ path: 'Register', element: <Register /> },
				{ path: '*', element: <NotFound /> },
			],
		},
	])
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={routes}></RouterProvider>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster position='top-right' reverseOrder={false} />
			</QueryClientProvider>
		</>
	);
}

export default App;
