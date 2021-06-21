/**
 * Funkcja odsyłająca HTTP<br>
 * Funkcja tworzy obiekt w skłądni JSON jako ramkę która informuje o błedzie i przesyła dane
 * pod taką postacią `{error: bool, message: object}`. 
 * @param {Promise} contentCreator - Promise który tworzy część message w ramce JSONowej
 * @param {function} res - funcja callback odsyłająca ramkę poprzez HTTP
 * @returns {Promise} zwraca nowego Promise, który można asynchronicznie łączyć łąńcuchowo
 * 
 * @category handlers
 */
function ServerResponse(contentCreator, res) {
	let content = { error: null, message: null };

	return contentCreator
		.then((message) => {
			content.error = false;
			content.message = message;
		})
		.catch((error) => {
			content.error = true;
			content.message = error.message;
		})
		.finally(() => {
			res.send(content);
		});
}

module.exports = {
	ServerResponse,

};

