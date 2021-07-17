const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	publishedOn: {
		type: Date,
		required: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = mongoose.model('Post', PostSchema);
