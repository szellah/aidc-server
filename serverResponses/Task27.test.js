const { default: axios } = require("axios");

//testowanie funkcji Sres_changeAccountPasword

test('Zmiana hasła gdy wpiszemy dobrze argumenty', () => {
    return axios
        .post("http://localhost:8080/changeAccountPasword", {userId:2, password:'123' })
        .then((res) =>{
            expect(res.data.message).toBe('Zmieniono haslo'
            );
        })
    });

test('Zmiana hasła gdy pole hasło zostawimy puste', () => {
    return expect (axios
        .post("http://localhost:8080/changeAccountPasword", { userId:1})
        .then((res) =>{
                  }).article).toBeFalsy();
        });
    
test('Zmiana hasła gdy pole userId zostawimy puste', () => {
    return expect (axios
        .post("http://localhost:8080/changeAccountPasword", { password:'123'})
        .then((res) =>{
                  }).article).toBeFalsy();
        });
