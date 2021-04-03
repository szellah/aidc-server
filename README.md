# AIDC-SERVER
by SGGW WZIM Inf. 2019/gr.4
</br>
>Sprawdź również [AIDC-CLIENT](https://github.com/szellah/aidc-client)

</br></br>


# Spis treści
- [Sposób działania](#sposób-działania)
- [Nazewnictwo](#nazewnictwo)
- [Potrzebne oprogramowanie](#potrzebne-oprogramowanie)
- [Instalacja](#instalacja)
  - [Node.js](#nodejs)
  - [Express.js](#expressjs)
  - [axios.js](#axiosjs)
  - [mysql.js](#mysqljs)
  - [XAMPP](#xampp)
- [Konfiguracja](#konfiguracja)
  - [Łącznie Server.js z serwerem MySql](#łącznie-serverjs-z-serwerem-mysql)
- [Testowanie](#testowanie)
- [Materiały Pomocnicze](#materiały-pomocnicze)
</br></br></br>



# Serwer API do aplikacji aidc

Jedno z dwóch głównych repozytoriów związanych z projektem AIDC (Automatic identification and data capture).
To dokładne repozytorium zajmuje się częścią serwerową oprogramowania. Sam projekt programowany będzie w całości
w JavaScript, głównie z powodów, jego popularności na rynku pracy, jak i szerokiej bazy bibliotek. Dodatkowo programowanie
w tym samym języku po stronie klienckiej jak i serwerowej pozwala na przesyłanie tablic i obiektów.

# Sposób działania

Plik server.js po uruchomieniu tworzy API przy pomocy frameworka Express.js.
API nasłuchuje wybrany port, i reaguje przy pomocy odpowiednich odpowiedzi (server responses).
Wszystkie funkcje-odpowiedzi znajdują się w folderze serverRsponses i są dopięte do pliku Sres_lib.js,
który funkcjonuje jako biblioteka. Poszczególne funkcje wykonują odpowiednie akcje, aczkolwiek najczęstszym
rodzajem pozostają funkcje wykonujące zapytania do serwera MySql. W głównym pliku Server.js tworzona jest
pula połączeń, która zostaje przekazana do odpowiednich funkcji, te następnie wykorzystują funkcje query,
by wykonać kwerendę do bazy danych.

# Nazewnictwo
- funkcje i pliki rozpoczynają się dużymi literami
- foldery zaś małymi
- wszystkie funkcje w folderze /serverResponses posiadają przedrostek 'Sres'
- funkcje to czasownik i czasem po nim rzeczownik, do którego odnosi się poprzedni
- jeżeli w pliku znajduje się jedna główna funkcja pomocnicza, to plik powinien nosić nazwę funkcji
- nazwy tabel sql to oczywiście rzeczowniki w liczbie mnogiej po angielsku, rozpoczynane dużą literą
- nazwy pól tabeli sql to rzeczowniki, lub połączenie paru rzeczowników, po angielsku rozpoczynane dużą literą, prowadzone z camelCase

# Potrzebne oprogramowanie

Aktualna wersja aidc-server działa przy pomocy poniższych programów:
- **Node.js**
>kompiluje JavaScript na komputerze
- **Express.js**
>tworzy api serwera
- **axios.js**
>wysyła zapytania POST (głównie w celach testowych)
- **mysql.js**
>łączy serwer z bazą MySql
- **XAMPP**
>Xampp czyli cross-platform Apache, MySql, PHP and Perl to prosty serwer PHP, który posiada w sobie od razu
serwer bazy danych MySql, z przyjemnym interfejsem graficznym.



# Instalacja
Jeżeli posiadacie wszystkie powyższe programy już na komputerze nie ma czytania tej sekcji.
> **Uwaga**: Przed instalacją niektórych programów, opłaca się pobrać repozytorium

### Node.js
Wystarczy wejść pod ten [link](https://nodejs.org/en/) i pobrać najnowszą, bądź najnowszą stabilną wersję. Następnie zainstalować, 
i komendą `node -v` sprawdzić czy pokazuję się wam odpowiednia wersja Node.js .

### Express.js
Express jest biblioteką Node.js więc wymaga on wcześniejszego zainstalowania Node. 
Należy otworzyć terminal w folderze projektu ( w naszym przypadku folderze repozytorium ),
a następnie wpisać
</br></br> 
`npm install express --save`
</br></br>
Włączy to tak zwany
Node Package Manager który automatycznie pobierze nam do danego folderu bibliotekę Express
do folderu /node_modules

### axios.js
Podobnie do Express.js axios również jest biblioteką Node.js, więc go, jak i inne
"moduły" Node-a można łatwo instalować poprzez npm, o ile wcześniej zostały dodane na ich stronę.
</br></br> 
`npm install axios --save`
</br></br>

### mysql.js
mysql.js również jest modułem Node-a więc należy postępować podobnie jak z powyższymi.
</br></br> 
`npm install mysql --save`
</br></br>

### XAMPP
XAMPP można normalnie pobrać [tutaj](https://www.apachefriends.org/pl/index.html). Następnie wystarczy go
zainstalować i jeżeli zapyta o pozwolenie mu działania w sieci, zezwolić.

# Konfiguracja
Jeżeli wszystkie powyższe elementy zostały już zainstalowane, to nie pozostaje nam nic innego jak
zaimportowanie aktualnej wersji naszej bazy danych do XAMPP. Plik Server.js automatycnie łączy się z bazą danych o ile została ona poprawnie skonfigurowana,
jednakże gdyby pojawiły się w związku z tym błędy, wszystkie dane połączenia znajdują się w pliku MysqlPool.js w folderze mysqlClient. Podobnie z plikiem Client.js .
</br></br>
### Łącznie Server.js z serwerem MySql
Należy wpierw uruchomić XAMPP, i włączyć funkcję Apache oraz MySql przyciskiem 'Start'.
Następnie o ile te nazwy zmieniły kolor na jasną zieleń, wpisujemy w okno przeglądarki http://localhost/phpmyadmin/.
Naciskając na przycisk 'Nowa' na lewym panelu bocznym otwieramy panel tworzenia bazy danych. Wpisujemy nazwę 'aidc_db' i upewniamy się że kodowanie jest ustawione na 'utf8mb4-general-ci' i naciskamy 'Utwórz'.
Następnie wchodzimy w zakładkę 'Import', naciskamy przycisk wybierz i wybieramy plik aidc_db.sql.
Potem należy upewnić się że typ importu jest ustawiony na plik SQL, oraz że kodowanie jest ustawione na utf-8, po czym nacisnąć 'Wykonaj'.
Klikając na bazę danych na lewym panelu można sprawdzić czy tabele dodały się poprawnie. Oczywiście jeżeli wystąpi błąd, Baza wam go najprawdopodobniej pokaże.

# Testowanie
> **Uwaga:** Przed uruchomieniem proszę się upewnić że posiadamy odpowiednie oprogramowanie oraz z konfigurowaliśmy bazę danych.

Włączamy serwer MySql przy pomocy panelu XAMPP.
Następnie by uruchomić plik Server.js należy w konsoli umiejscowionej w folderze projektu wpisać
</br></br> 
`node Server`
</br></br>

A by włączyć plik Client.js należy w innym oknie konsoli
</br></br> 
`node Client`
</br></br>

żeby wyłączyć którykolwiek z procesów można go anulować przy pomocy kombinacji przycisków CTRL+C
</br></br>
Alternatywnie istnieje również prosty formularz html, o nazwie Index.html, który również znajduje się w repozytorium.
Można również korzystać z innych oprogramowań, które obsługują zapytania POST.

# Materiały Pomocnicze
Jeżeli w czymkolwiek pojawi się problem odsyłam do odpowiednich dokumentacji i kompendiów wiedzy:
- [JavaScript by MDN](https://developer.mozilla.org/pl/docs/Web/JavaScript)
- [JavaScript by W3schools](https://www.w3schools.com/js/DEFAULT.asp)
- [Node.js](https://nodejs.org/dist/latest-v15.x/docs/api/)
- [Express.js](https://expressjs.com)
- [Axios.js on Githubie](https://github.com/axios/axios#axios)
- [mysql.js](https://www.npmjs.com/package/mysql)
- [MySql by W3schools](https://www.w3schools.com/sql/default.asp)
</br></br>
Polecam również sprawdzić ten kanał na [YouTube](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)


