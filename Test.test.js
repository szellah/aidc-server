const axios = require("axios");

//testowanie funkcji Sres_getAccountInfo
test("Przetestowanie wyświetlenia informacji o użytkowniku", () => {
  return axios
          .post("http://localhost:8080/getAccountInfo", {accountId: 2})
          .then((res) => {
              expect(res.data.message).toEqual({
                AccountId: 2,        
                Name: 'Borys',       
                Surname: 'Szyc',     
                Login: 'Bszyc',      
                Email: 'bszyc@wp.pl',
                Rank: 2,
                State: 1
              });
          })

});

test("Przetestowanie wyświetlenia informacji o użytkowniku bez podania argumentu", () => {
  return expect(axios
          .post("http://localhost:8080/getAccountInfo", {})
          .then((res) => {
            
          }).message).toBeFalsy();

});

//testuje funkcje Sres_getLocationInfo

test("Przetestowanie wyświetlenia informacji o lokacji", () => {
  return axios
          .post("http://localhost:8080/getLocationInfo", {locationId:9})
          .then((res) => {
              expect(res.data.message).toEqual({ LocationId: 9, Building: 1, Floor: 1, Room: 102 });
          })
          

});

test("Przetestowanie wyświetlenia informacji o Lokalizacji bez podania argumentu", () => {
  return expect(axios
          .post("http://localhost:8080/getLocationInfo", {locationId:9})
          .then((res) => {
            
          }).message).toBeFalsy();

});

//przetestowanie funkcji Sres_getArticleInfo
test("Przetestowanie wyświetlenia informacji o artykule", () => {
  return axios
          .post("http://localhost:8080/getArticleInfo", {articleId:5})
          .then((res) => {
              expect(res.data.message).toEqual({
                ArticleId: 5,
                LocationId: 8,
                Category: 'klawiatura',
                Name: 'Logitech K120',
                Description: '',
                AddtionDate: '2021-04-15T22:00:00.000Z',
                ProductionYear: 2017,
                State: 1
              });
          })

});
test("Przetestowanie wyświetlenia informacji o artykule bez podania argumentu", () => {
  return expect(axios
          .post("http://localhost:8080/getArticleInfo", {})
          .then((res) => {
            
          }).message).toBeFalsy();

});