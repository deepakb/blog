const Post = require('../models/post');

const { getUserById } = require('./user');

const getPostsByIds = async (postIds) => {
	try {
		const posts = await Post.find({ _id: { $in: postIds } });
		posts.map((post) => {
			return {
				...post._doc,
				_id: post.id,
				publishedOn: new Date(post._doc.publishedOn).toISOString(),
				createdBy: getUserById.bind(this, post.createdBy),
			};
		});
		return posts;
	} catch (err) {
		throw err;
	}
};

module.exports = { getPostsByIds };
