function ServerResponse(contentCreator, res){

    let content = {error: null, message: null};

    return contentCreator
    .then((message) => 
    {
        content.error = false;
        content.message = message;
    })
    .catch((error) => { 
        content.error = true;
        content.message = error;
    })
    .finally(() => {
        res.send(content);
    })
}

module.exports={
    ServerResponse,
}