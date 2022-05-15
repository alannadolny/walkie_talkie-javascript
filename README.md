# WALKIE TALKIE

## SPIS TREŚCI

- [URUCHOMIENIE PROJEKTU](#uruchomienie-projektu)
- [UŻYTE TECHNOLOGIE / BIBLIOTEKI](#użyte-technologie-/-biblioteki)
- [FUNKCJONALNOŚCI](#funkcjonalności)
- [STATUS PROJEKTU](#status-projektu)
- [ZRZUTY EKRANU](#zrzuty-ekranu)

## URUCHOMIENIE PROJEKTU

W celu uruchomienia projektu należy wejść w folder backend i zainstalować zależności wpisując polecenie:

```
yarn install
```

lub

```
npm i
```

Następnie powtórzyć to samo w folderze z frontendem.
W tle musi być uruchomiona baza danych MongoDB.

Aby działało wysyłanie maili do supportu należy stworzyć plik .env w folderze backend i uzupełnić go w następujący sposób:

```
TOKEN="tutaj wpisz ciąg znaków używany do jsonwebtokena"
MAIL_LOGIN="tutaj wpisz login do poczty, na która mają być wysyłane maile"
MAIL_PASSWORD="tutaj wpisz hasło do poczty"
```

Po wykonaniu powyższych czynności należy wpisać w folderze z backendem

```
node index.js
```

oraz w folderze z frontedem

```
yarn start
```

lub

```
npm start
```

## UŻYTE TECHNOLOGIE / BLIBLOTEKI

Frontend:

- @mui/icons-material
- axios
- formik
- lodash
- peerjs
- react (17.0.2)
- react-redux
- react-router-dom
- simple-peer
- socket.io-client
- yup

Backend:

- axios
- cookie-parser
- cors
- dayjs
- dotenv
- express
- jsonwebtoken
- mongoose
- multer
- nodemailer
- socket.io

## FUNKCJONALNOŚCI

- ,,Home page'' z możliwością przekierowania do formularza logowania
- Tworzenie / Logowanie się na istniejące konta
- Możliwość wysłania maila do supportu bezpośrednio przez stronę
- ,,About Us'' z krótkimi informacjami o firmie
- Wszystkie formularze są odpowiednio walidowane
- Wyświetlanie się ,,Loading page'' pomiędzy akcjami
- Responsywność strony (dopsowanie do telefonów, tabletów oraz ekranów komputerowych)
- Wyświetlanie błędu jeśli niezalogowany użytkownik spróbuje dostać się na podstrony dostępne tylko dla zalogowanych użytkowników
- Możliwość filtrowania po nazwie kanału, aktywnych użytkownikach oraz możliwość sortowania
- Wyświetlanie listy aktywnych kanałów
- Możliwość tworzenia \ usuwania kanałów
- Wszystkie akcje dzieją się w czasie rzeczywistym u każdego podłączonego klienta
- Możliwość dodania zdjęcia profilowego
- Możliwość wysyłania wiadomości na chacie danego kanału
- Możliwość videorozmów na kanale, nieograniczona liczba użytkowników

## STATUS PROJEKTU

Rozpoczęty: 19 Marca

## ZRZUTY EKRANU
