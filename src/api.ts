const baseUrl = "https://jsonplaceholder.typicode.com";

export async function fetchPosts() {
	return fetch(`${baseUrl}/posts`, {
		method: "GET",
	}).then((res) => res.json());
}

export async function fetchPostById(postId: number | string) {
	return fetch(`${baseUrl}/posts/${postId}`, {
		method: "GET",
	}).then((res) => res.json());
}

export async function fetchCommentsByPostId(postId: number | string) {
	return fetch(`${baseUrl}/posts/${postId}/comments`, {
		method: "GET",
	}).then((res) => res.json());
}
