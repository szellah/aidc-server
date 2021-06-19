const axios = require("axios");


test("Przetestwoanie czy edytowany zostanie użytkownik gdy nie poda sie UserId", () => {
  return axios
          .post("http://localhost:8080/getAccountInfo", {accountId: 2})
          .then((res) => {
            console.log("Konsolka");
              expect(res.data.message.Name).toBe('Borys');
          })

});