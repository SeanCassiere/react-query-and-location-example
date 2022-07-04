import React from "react";
import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import { fetchCommentsByPostId, fetchPostById } from "../api";
import { SingleComment, SinglePost } from "../types";

const Post = () => {
	const {
		params: { postId },
	} = useMatch();

	const {
		status: postStatus,
		data: postData,
		error: postError,
		isFetching: isPostFetching,
	} = useQuery<SinglePost, any>(["posts", postId], () => fetchPostById(postId));

	const {
		status: commentStatus,
		data: commentData,
		error: commentError,
		isFetching: isCommentFetching,
	} = useQuery<SingleComment[], any>(["posts", postId, "comments"], () => fetchCommentsByPostId(postId));

	return (
		<div>
			<section className='mb-2'>
				<h2 className='text-4xl font-semibold uppercase'>
					{postData?.title}
					{isPostFetching ? " ..." : ""}
				</h2>
			</section>
			<section className='mb-2'>
				<article>
					{postStatus === "error" && postError && <p>{postError.message}</p>}
					<p>
						{postData?.body}
						{isPostFetching && "..."}
					</p>
				</article>
			</section>
			<section className='mt-5'>
				<h3 className='text-lg'>Comments{isCommentFetching && "..."}</h3>
				<div className='flex flex-col gap-1'>
					{commentStatus === "error" && commentError && <p>{commentError.message}</p>}
					{commentData?.map((comment, idx) => (
						<div key={`comment${comment.id}`} className='mb-2'>
							<strong>
								{idx + 1} {comment.name}
							</strong>
							<p>{comment.body}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default React.memo(Post);
