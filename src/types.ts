import { z } from "zod";

export const SinglePostSchema = z.object({
	userId: z.number(),
	id: z.number(),
	title: z.string(),
	body: z.string(),
});

export type SinglePost = z.infer<typeof SinglePostSchema>;
export const ListOfPostsSchema = z.array(SinglePostSchema);

export const SingleCommentSchema = z.object({
	postId: z.number(),
	id: z.number(),
	name: z.string(),
	email: z.string(),
	body: z.string(),
});

export type SingleComment = z.infer<typeof SingleCommentSchema>;
export const ListOfCommentsSchema = z.array(SingleCommentSchema);
