function passwordGenerator(){
    let password = [];
    for(i of Array(8).keys())
        password.push(Math.floor(Math.random()*(123-35))+35);
    return String.fromCharCode(...password);
}

module.exports = {
    passwordGenerator,
}