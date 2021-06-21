const { default: axios } = require("axios");

//testowanie funkcji Sres_addNewArticle

test('Przetestowanie dodawania artykułu', () => {
    return axios
        .post("http://localhost:8080/addNewArticle", { article:{Name:'drukarka bezprzewodowa',
        category:'drukarka', location:9, description:'Drukarka na wifi'}})
        .then((res) =>{
            expect(res.data.message).toBe('Dodano nowy artykuł drukarka bezprzewodowa'
            );
        })
    });

test('Przetestowanie dodawania artykułu bez dawania nazwy', () => {
    return expect (axios
        .post("http://localhost:8080/addNewArticle", { article:{
        category:'drukarka', location:9, description:'Drukarka na wifi'}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie dodawania artykułu bez dawania nazwy i kategorii', () => {
    return expect (axios
        .post("http://localhost:8080/addNewArticle", { article:{
         location:9, description:'Drukarka na wifi'}})
        .then((res) =>{
                  }).article).toBeFalsy();
        });

test('Przetestowanie dodawania artykułu bez dawania nazwy i kategorii oraz lokalizacji', () => {
    return expect (axios
        .post("http://localhost:8080/addNewArticle", { article:{
          description:'Drukarka na wifi'}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie dodawania artykułu bez dawania nazwy i kategorii oraz opisu', () => {
    return expect (axios
        .post("http://localhost:8080/addNewArticle", { article:{
            location:9}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie dodawania artykułu z pustym obiektem', () => {
    return expect (axios
        .post("http://localhost:8080/addNewArticle", { article:{
          }})
        .then((res) =>{
                  }).message).toBeFalsy();
        });


//testowanie funkcji Sres_updateArticleInfo

test('Przetestowanie edycji artykułu, przy poprawnym wypełnieniu funkcji', () => {
    return axios
        .post("http://localhost:8080/updateArticleInfo", { article:{ArticleId:395, Name:'drukarka przewodowa',
        category:'drukarka', location:9, description:'Drukarka na kabel'}})
        .then((res) =>{
            expect(res.data.message).toBe('Zmieniono dane artykułu drukarka przewodowa'
            );
        })
    });

test('Przetestowanie edycji artykułu, bez podania id artykułu', () => {
    return expect (axios
        .post("http://localhost:8080/updateArticleInfo", { article:{Name:'drukarka przewodowa',
        category:'drukarka', location:10, description:'Drukarka na kabel'}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie edycji artykułu, z podaniem tylko id ', () => {
    return expect (axios
        .post("http://localhost:8080/updateArticleInfo", { article:{ArticleId:393}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie edycji artykułu, przy pozostawieniu lokalizaji pustej', () => {
    return expect (axios
        .post("http://localhost:8080/updateArticleInfo", { article:{ArticleId:391, Name:'drukarka przewodowa',
        category:'drukarka', description:'Drukarka na kabel'}})
        .then((res) =>{
                  }).message).toBeFalsy();
        });

test('Przetestowanie edycji artykułu, przy wypełniu nazwy, kategorii oraz opisu jako puste pola', () => {
    return axios
        .post("http://localhost:8080/updateArticleInfo", { article:{ArticleId:392, Name:'',
        category:'', location:9, description:''}})
        .then((res) =>{
            expect(res.data.message).toBe('Zmieniono dane artykułu '
            );
        })
    });


//testowanie funkcji Sres_deleteArticle 

test('Przetestowanie usuwania artykułu, przy poprawnym wpisaniu wszystkich danych', () => {
    return axios
        .post("http://localhost:8080/deleteArticle", { ArticleId:415})
        .then((res) =>{
            expect(res.data.message).toBe('Usunięto artykuł drukarka przewodowa'
            );
        })
    });

test('Przetestowanie usuwania artykułu, przy niepodaniu id artykułu', () => {
    return expect (axios
        .post("http://localhost:8080/deleteArticle", {})
        .then((res) =>{
                  }).message).toBeFalsy();
        });
        

//testowanie funkcji Sres_allocateArticle

test('Przetestowanie dotowarowania artykułu, przy poprawnym wpisaniu wszystkich danych', () => {
    return axios
        .post("http://localhost:8080/allocateArticle", { ArticleId:278,LocationId: 9})
        .then((res) =>{
            expect(res.data.message).toBe('Dotowarowano HP S01-AF1003nw do 1 1/102'
            );
        })
    });

test('Przetestowanie dotowarowywania artykułu, przy niepodaniu danych', () => {
    return expect (axios
        .post("http://localhost:8080/allocateArticle", {})
        .then((res) =>{
                  }).message).toBeFalsy();
        });
    


//testowanie funkcji Sres_dislocateArticle

test('Przetestowanie odtowarowania artykułu, przy poprawnym wpisaniu wszystkich danych', () => {
    return axios
        .post("http://localhost:8080/dislocateArticle", { ArticleId:279, AccountId: 2})
        .then((res) =>{
            expect(res.data.message).toBe('Odtowarowano HP S01-AF1003nw'
            );
        })
    });

test('Przetestowanie odtowarowywania artykułu, przy niepodaniu danych', () => {
    return expect (axios
        .post("http://localhost:8080/dislocateArticle", {})
        .then((res) =>{
                  }).message).toBeFalsy();
        });
