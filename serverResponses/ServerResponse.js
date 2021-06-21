function ServerResponse(contentCreator, res) {
	let content = { error: null, message: null };

	return contentCreator
		.then((message) => {
			content.error = false;
			content.message = message;
		})
		.catch((error) => {
			console.log(error);
			content.error = true;
			content.message = error.message;
			console.log(error);
		})
		.finally(() => {
			res.send(content);
		});
}

module.exports = {
	ServerResponse,

};

