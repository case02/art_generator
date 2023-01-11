const { PostTypes } = require('../controllers/types/types');

class ImagePost {
	constructor(text, imagesCollection) {
		this.text = text;
		this.imagesCollection = imagesCollection;
	}

	getFormattedData = () => {
		return {
			type: PostTypes.Image,
			content: {
				text: this.text,
				imagesCollection: this.imagesCollection,
			},
		};
	};
}

exports.ImagePost = ImagePost;
