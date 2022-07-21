import React from "react";
import { Link, MakeGenerics, Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { fetchPostById, fetchPosts } from "./api";

import Posts from "./pages/Posts";
import Post from "./pages/Post";

type LocationGenerics = MakeGenerics<{
	Params: { postId: string };
}>;

const location = new ReactLocation<LocationGenerics>();
const queryClient = new QueryClient();

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router
				location={location}
				routes={[
					{
						path: "/",
						element: "Welcome home!",
					},
					{
						path: "posts",
						element: <Posts />,
						loader: () =>
							queryClient.getQueryData(["posts"]) ?? queryClient.fetchQuery(["posts"], fetchPosts).then(() => ({})),
						children: [
							{
								path: "/",
								element: "Select a post.",
							},
							{
								path: ":postId",
								element: <Post />,
								loader: ({ params: { postId } }) =>
									queryClient.getQueryData(["posts", postId]) ??
									queryClient.fetchQuery(["posts", postId], () => fetchPostById(postId)).then(() => ({})),
							},
						],
					},
				]}
			>
				<div className='bg-white dark:bg-gray-900 dark:text-neutral-200 mx-auto max-h-screen overflow-y-auto'>
					<header className='py-2 max-w-6xl mx-auto flex flex-col gap-2 sticky top-0 bg-white dark:bg-gray-900 z-50'>
						<h1 className='text-3xl font-semibold text-slate-700 dark:text-slate-400'>JSON Placeholder Posts</h1>
						<hr />
						<nav className='flex flex-row gap-3'>
							<Link to='.'>Home</Link>
							<Link to='posts' preload={1}>
								Posts
							</Link>
						</nav>
						<hr />
					</header>
					<main className='max-w-6xl mx-auto'>
						<Outlet />
					</main>
				</div>
			</Router>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};

export default App;
