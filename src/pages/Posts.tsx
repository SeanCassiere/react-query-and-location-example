import React from "react";
import { Link, Outlet } from "@tanstack/react-location";
import { useQuery } from "react-query";

import { fetchPosts } from "../api";
import { SinglePost } from "../types";

const Posts = () => {
	const { status, data, error } = useQuery<SinglePost[], any>("posts", fetchPosts);
	return (
		<div>
			{status === "loading" ? (
				<span>Loading...</span>
			) : status === "error" ? (
				<span>Error: {error.message}</span>
			) : (
				<div className='flex flex-row gap-2'>
					<section className='flex-shrink-0 max-w-sm'>
						<ul className='overflow-y-scroll h-[calc(100vh_-_6.5rem)]'>
							{data?.map((post, idx) => (
								<li key={`post-${post.id}`} className='truncate dark:text-slate-500'>
									<Link to={`./${post.id}`}>
										{idx + 1} - {post.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
					<section>
						<Outlet />
					</section>
				</div>
			)}
		</div>
	);
};

export default Posts;
