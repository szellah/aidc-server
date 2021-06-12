const axios = require("axios");

//testowanie funkcji Sres_addNewUser
test("Przetestowanie dodania użytkownika", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).toEqual("Dodano użytkownika Jan");
          })

});

test("Przetestowanie dodania użytkownika bez podania argumentu", () => {
  expect.assertions(1);
  return expect(axios
          .post("http://localhost:8080/addNewUser", {})
          .then((res) => {
            
          }).message).toBeFalsy();

});

test("Przetestowanie dodania użytkownika bez imienia", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});

test("Przetestowanie dodania użytkownika bez nazwiska", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});

test("Przetestowanie dodania użytkownika bez loginu", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});
test("Przetestowanie dodania użytkownika bez hasła", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", email:"janek@gmail.com", rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});
test("Przetestowanie dodania użytkownika bez emailu", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});
test("Przetestowanie dodania użytkownika bez rangi", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});
test("Przetestowanie dodania użytkownika bez state", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).not.toMatch("Dodano użytkownika");
          })

});

test("Przetestowanie dodania użytkownika bez inventoryid", () => {
  expect.assertions(1);
  return expect(axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1",personaluseid:"13" } })
          .then((res) => {
            
          }).message).toBeFalsy();

});

test("Przetestowanie dodania użytkownika bez personaluseid", () => {
  expect.assertions(1);
  return expect(axios
          .post("http://localhost:8080/addNewUser", { UserId:1, User: { name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1",inventoryid:"12" } })
          .then((res) => {
            
          }).message).toBeFalsy();

});

//przetestowanie funkcji Sres_updateUser
test("Przetestowanie edycji użytkownika", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8, name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola accountid", () => {
  expect.assertions(1);
  return expect(axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {name:"Jan", surname:"Testowy", login:"jan123", password:"password123", email:"janek@gmail.com",rank:"2", state:"1", inventoryid:"12",personaluseid:"13" } })
          .then((res) => {
            
          }).message).toBeFalsy();

}); 

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i imie", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,name:"Janek"} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Janek");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i nazwisko", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,surname:"Nowak"} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i login", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,login:"Janek123"} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i email", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,email:"Janek123@gmail.com"} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i state", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,state:2} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i rank", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,rank:1} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i inventoryid", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,inventoryid:15} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

test("Przetestowanie edycji użytkownika bez pola imienia gdy poda sie tylko accountid i personaluseid", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/updateUser", { UserId:1, User: {accountid: 8,personaluseid:15} } )
          .then((res) => {
              expect(res.data.message).toEqual("Zmieniono dane użytkownika Jan");
          })

});

//przetestowanie funkcji Sres_deleteUser

test("Przetestowanie usuwanie użytkownika", () => {
  expect.assertions(1);
  return axios
          .post("http://localhost:8080/deleteUser", { UserId:1, UserToDelete:47 })
          .then((res) => {
              expect(res.data.message).toEqual("Usunięto użytkownika Jan");
          })

});

test("Przetestowanie usuwanie użytkownika bez podania argumentu", () => {
  expect.assertions(1);
  return expect(axios
          .post("http://localhost:8080/deleteUser", {})
          .then((res) => {
             
          }).message).toBeFalsy();

});

test("Przetestowanie usuwanie użytkownika ktory ma cos w swoim ekwipunku", () => {
  //expect.assertions(1);
  return axios
          .post("http://localhost:8080/deleteUser", { UserId:1, UserToDelete:43 })
          .then((res) => {
              expect(res.data.message).not.toMatch("Usunięto użytkownika");
          })

});