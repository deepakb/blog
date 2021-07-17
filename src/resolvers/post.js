const Post = require('../models/post');
const User = require('../models/user');
const { getUserById } = require('../helpers/user');

const posts = async () => {
	try {
		const posts = await Post.find();
		return posts.map((post) => {
			return {
				...post._doc,
				_id: post.id,
				publishedOn: new Date(post._doc.publishedOn).toISOString(),
				createdBy: getUserById.bind(this, post._doc.createdBy),
			};
		});
	} catch (error) {
		throw error;
	}
};

const createPost = async (args) => {
	const { title, description, publishedOn } = args.postInput;
	const post = new Post({
		title,
		description,
		publishedOn,
		createdBy: '60f291007bc6f20a3c90a0d9',
	});
	let createdPost;

	try {
		const result = await post.save();
		createdPost = {
			...result._doc,
			_id: result._doc._id.toString(),
			publishedOn: new Date(post._doc.publishedOn).toISOString(),
			createdBy: getUserById.bind(this, result._doc.createdBy),
		};
		const creator = await User.findById('60f291007bc6f20a3c90a0d9');

		if (!creator) {
			throw new Error('User not found.');
		}
		creator.posts.push(post);
		await creator.save();

		return createdPost;
	} catch (error) {
		throw error;
	}
};

module.exports = { posts, createPost };
