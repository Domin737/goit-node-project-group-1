# Kapu$ta - Aplikacja do Zarządzania Finansami Osobistymi

Witamy w **Kapu$ta**, aplikacji do zarządzania finansami osobistymi,
zaprojektowanej, aby pomóc Ci efektywnie śledzić swoje przychody i wydatki.
Niniejsza dokumentacja zawiera szczegółowy przewodnik na temat działania
aplikacji, jej konfiguracji oraz sposobów rozwoju.

## Spis Treści

- [Wstęp](#wstęp)
- [Funkcjonalności](#funkcjonalności)
- [Stos Technologiczny](#stos-technologiczny)
- [Struktura Projektu](#struktura-projektu)
- [Rozpoczęcie Pracy](#rozpoczęcie-pracy)
  - [Wymagania Wstępne](#wymagania-wstępne)
  - [Instalacja](#instalacja)
  - [Uruchamianie Aplikacji](#uruchamianie-aplikacji)
- [Przegląd Funkcjonalności](#przegląd-funkcjonalności)
  - [Uwierzytelnianie Użytkowników](#uwierzytelnianie-użytkowników)
  - [Zarządzanie Saldo](#zarządzanie-saldo)
  - [Zarządzanie Transakcjami](#zarządzanie-transakcjami)
  - [Raportowanie](#raportowanie)
- [Szczegółowy Opis Komponentów](#szczegółowy-opis-komponentów)
  - [Komponenty Backendowe](#komponenty-backendowe)
  - [Komponenty Frontendowe](#komponenty-frontendowe)
- [Endpointy API](#endpointy-api)
- [Współpraca](#współpraca)
- [Licencja](#licencja)

## Wstęp

**Kapu$ta** to aplikacja webowa, która pozwala użytkownikom zarządzać finansami
osobistymi poprzez śledzenie przychodów i wydatków. Użytkownicy mogą rejestrować
się i logować za pomocą adresu email i hasła lub poprzez uwierzytelnianie
Google, aktualizować swoje saldo, dodawać transakcje oraz przeglądać raporty
podsumowujące ich aktywność finansową.

## Funkcjonalności

- **Rejestracja i Logowanie Użytkowników**: Bezpieczne tworzenie konta i
  logowanie przy użyciu email/hasła lub uwierzytelniania Google.
- **Zarządzanie Saldo**: Aktualizacja i podgląd bieżącego salda konta.
- **Zarządzanie Transakcjami**: Dodawanie, przeglądanie i usuwanie transakcji
  przychodów i wydatków.
- **Raportowanie**: Miesięczne podsumowania przychodów i wydatków.
- **Responsywny Design**: Dostępność na różnych urządzeniach.

## Stos Technologiczny

- **Frontend**:
  - JavaScript (ES6+)
  - HTML5 i CSS3 (SCSS)
  - Webpack do bundlowania modułów
  - Firebase do uwierzytelniania Google
- **Backend**:
  - Node.js z frameworkiem Express.js
  - MongoDB z Mongoose do zarządzania bazą danych
  - JSON Web Tokens (JWT) do uwierzytelniania
  - Firebase Admin SDK do weryfikacji tokenów
- **Inne Narzędzia**:
  - dotenv do zarządzania zmiennymi środowiskowymi
  - bcrypt.js do hashowania haseł
  - helmet i cors dla bezpieczeństwa

## Struktura Projektu

```
root/
├── server/
│   ├── app.js
│   ├── config/
│   │   ├── db.js
│   │   └── serviceAccountKey.json
│   ├── controllers/
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── firebaseAdmin.js
│   └── utils/
│       └── logger.js
├── src/
│   ├── components/
│   │   ├── Balance.js
│   │   ├── Expenses.js
│   │   ├── Incomes.js
│   │   ├── Login.js
│   │   ├── LogoutButton.js
│   │   ├── Modal.js
│   │   ├── RegisterForm.js
│   │   ├── SummaryList.js
│   │   ├── TransactionForm.js
│   │   └── TransactionList.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── LoginPage.js
│   ├── utils/
│   │   ├── firebase.js
│   │   ├── logoutUtils.js
│   │   └── logger.js
│   ├── config.js
│   ├── index.js
│   ├── images/
│   │   ├── logo-big.svg
│   │   └── logo-small.svg
│   └── styles/
│       └── index.scss
├── package.json
├── .env
└── README.md
```

## Rozpoczęcie Pracy

### Wymagania Wstępne

- **Node.js** (wersja 12.x lub wyższa)
- **npm** (Node Package Manager)
- **MongoDB** (lokalna instalacja lub dostęp do klastra MongoDB Atlas)
- **Projekt Firebase** (do uwierzytelniania Google)

### Instalacja

1. **Sklonuj repozytorium**:

   ```bash
   git clone https://github.com/twojnazwa/kapusta.git
   cd kapusta
   ```

2. **Zainstaluj zależności**:

   ```bash
   npm install
   cd server
   npm install
   cd ../src
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe**:

   Utwórz plik `.env` zarówno w katalogu głównym, jak i w `src/` z następującymi
   zmiennymi:

   **Plik `.env` w katalogu głównym**:

   ```
   PORT=3000
   MONGODB_URI=twoj_łańcuch_połączenia_mongodb
   JWT_SECRET=twoj_tajny_klucz_jwt
   ```

   **Plik `src/.env`**:

   ```
   REACT_APP_FIREBASE_API_KEY=twoj_api_key_firebase
   REACT_APP_FIREBASE_AUTH_DOMAIN=twoj_auth_domain_firebase
   REACT_APP_FIREBASE_PROJECT_ID=twoj_project_id_firebase
   REACT_APP_FIREBASE_STORAGE_BUCKET=twoj_storage_bucket_firebase
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=twoj_messaging_sender_id_firebase
   REACT_APP_FIREBASE_APP_ID=twoj_app_id_firebase
   REACT_APP_FIREBASE_MEASUREMENT_ID=twoj_measurement_id_firebase
   ```

4. **Skonfiguruj Firebase Admin SDK**:

   - Pobierz swój plik `serviceAccountKey.json` z konsoli Firebase i umieść go w
     `server/config/`.

## Uruchamianie Aplikacji

### Tryb Deweloperski

1. **Uruchom serwer backendu**:

   ```bash
   cd server
   npm run dev
   ```

   Używa `nodemon` do obserwacji zmian w plikach.

2. **Uruchom frontend**:

   ```bash
   cd src
   npm start
   ```

   Używa `webpack-dev-server` do automatycznego odświeżania.

### Tryb Produkcyjny

1. **Zbuduj frontend**:

   ```bash
   cd src
   npm run build
   ```

   Kompiluje frontend do statycznych plików w katalogu `dist/`.

2. **Uruchom serwer backendu**:

   ```bash
   cd server
   npm start
   ```

   Backend będzie serwował statyczne pliki z katalogu `dist/`.

## Przegląd Funkcjonalności

### Uwierzytelnianie Użytkowników

- **Rejestracja i Logowanie przez Email/Hasło**:

  - Użytkownicy mogą rejestrować się, podając imię, email i hasło.
  - Hasła są hashowane przy użyciu `bcrypt.js` przed zapisaniem w MongoDB.
  - Tokeny JWT są generowane po pomyślnej rejestracji/logowaniu.

- **Uwierzytelnianie Google**:

  - Użytkownicy mogą logować się za pomocą konta Google.
  - Na frontendzie używane jest uwierzytelnianie Firebase.
  - Na backendzie tokeny są weryfikowane za pomocą Firebase Admin SDK.

- **Istotne Pliki**:
  - Frontend:
    - `src/components/Login.js`
    - `src/components/RegisterForm.js`
    - `src/utils/firebase.js`
  - Backend:
    - `server/controllers/userController.js`
    - `server/routes/userRoutes.js`
    - `server/firebaseAdmin.js`

### Zarządzanie Saldo

- **Podgląd i Aktualizacja Salda**:

  - Użytkownicy mogą przeglądać swoje bieżące saldo na pulpicie.
  - Saldo może być aktualizowane ręcznie.
  - Jeśli saldo wynosi zero, użytkownik otrzymuje powiadomienie.

- **Istotne Pliki**:
  - Frontend:
    - `src/components/Balance.js`
  - Backend:
    - `server/controllers/userController.js`
    - `server/routes/userRoutes.js`

### Zarządzanie Transakcjami

- **Dodawanie Transakcji**:

  - Użytkownicy mogą dodawać transakcje przychodów i wydatków.
  - Każda transakcja zawiera datę, kategorię, kwotę i opis.

- **Przeglądanie Transakcji**:

  - Transakcje są wyświetlane w zakładkach Przychody i Wydatki.
  - Użytkownicy mogą usuwać transakcje, co aktualizuje saldo.

- **Kategorie**:

  - Przychody: Wynagrodzenie, Dodatkowe przychody.
  - Wydatki: Transport, Produkty, Zdrowie, itp.

- **Istotne Pliki**:
  - Frontend:
    - `src/components/TransactionForm.js`
    - `src/components/TransactionList.js`
  - Backend:
    - `server/controllers/transactionController.js`
    - `server/routes/transactionRoutes.js`

### Raportowanie

- **Miesięczne Podsumowania**:

  - Użytkownicy mogą przeglądać podsumowanie swoich transakcji według miesiąca.
  - Podsumowanie zawiera łączną kwotę dla każdego miesiąca.

- **Istotne Pliki**:
  - Frontend:
    - `src/components/SummaryList.js`

## Szczegółowy Opis Komponentów

### Komponenty Backendowe

#### `server/app.js`

- **Opis**: Inicjalizuje aplikację Express, ustawia middleware, łączy się z
  MongoDB i definiuje trasy API.
- **Kluczowe Middleware**:
  - `express.json()` do parsowania ciał żądań w formacie JSON.
  - `cors` do obsługi żądań Cross-Origin.
  - `helmet` dla nagłówków bezpieczeństwa.

#### Kontrolery

- **Kontroler Użytkowników (`server/controllers/userController.js`)**:

  - Obsługuje rejestrację, logowanie, wylogowanie i aktualizacje salda.
  - Weryfikuje tokeny Firebase dla uwierzytelniania Google.
  - Generuje tokeny JWT.

- **Kontroler Transakcji (`server/controllers/transactionController.js`)**:
  - Zarządza dodawaniem, usuwaniem i pobieraniem transakcji.
  - Aktualizuje saldo użytkownika po zmianach w transakcjach.

#### Trasy

- **Trasy Użytkowników (`server/routes/userRoutes.js`)**:

  - **Trasy Publiczne**:
    - `POST /register`: Rejestracja nowego użytkownika.
    - `POST /login`: Logowanie za pomocą email/hasła.
    - `POST /google-login`: Logowanie przez Google.
  - **Trasy Chronione** (wymagają `authMiddleware`):
    - `POST /logout`: Wylogowanie użytkownika.
    - `GET /balance`: Pobranie bieżącego salda.
    - `PUT /balance`: Aktualizacja salda.
    - `GET /current`: Pobranie informacji o bieżącym użytkowniku.

- **Trasy Transakcji (`server/routes/transactionRoutes.js`)**:
  - **Trasy Chronione** (wszystkie wymagają `authMiddleware`):
    - `POST /`: Dodanie nowej transakcji.
    - `DELETE /:id`: Usunięcie transakcji.
    - `GET /`: Pobranie wszystkich transakcji użytkownika, filtrowanych według
      typu.

#### Middleware

- **Middleware Uwierzytelniania (`server/middleware/authMiddleware.js`)**:
  - Weryfikuje tokeny JWT.
  - Dołącza obiekt użytkownika do żądania, jeśli token jest ważny.

#### Modele

- **Model Użytkownika (`server/models/userModel.js`)**:

  - Schemat dla dokumentów użytkowników w MongoDB.
  - Pola: name, email, password, avatarURL, balance, token.

- **Model Transakcji (`server/models/transactionModel.js`)**:
  - Schemat dla dokumentów transakcji.
  - Pola: type, date, category, amount, description, user.

#### Firebase Admin

- **Inicjalizacja Firebase Admin (`server/firebaseAdmin.js`)**:
  - Inicjalizuje Firebase Admin SDK do weryfikacji tokenów Google.

### Komponenty Frontendowe

#### Główny Punkt Wejścia (`src/index.js`)

- Sprawdza obecność tokena JWT w `localStorage`.
- Renderuje `HomePage` jeśli użytkownik jest uwierzytelniony, w przeciwnym razie
  `LoginPage`.
- Nasłuchuje zmian w `localStorage` w celu ponownego renderowania aplikacji po
  zalogowaniu/wylogowaniu.

#### Strony

- **HomePage (`src/pages/HomePage.js`)**:

  - Renderuje główny pulpit.
  - Zawiera komponenty Balance, TransactionForm, TransactionList i SummaryList.
  - Obsługuje przełączanie zakładek między Przychodami a Wydatkami.

- **LoginPage (`src/pages/LoginPage.js`)**:
  - Renderuje formularze logowania i rejestracji.
  - Pozwala na przełączanie między logowaniem a rejestracją.

#### Komponenty

- **Balance (`src/components/Balance.js`)**:

  - Wyświetla bieżące saldo.
  - Pozwala na aktualizację salda.
  - Wyświetla powiadomienie, jeśli saldo wynosi zero.

- **TransactionForm (`src/components/TransactionForm.js`)**:

  - Formularz do dodawania nowych transakcji.
  - Dynamicznie zmienia kategorie w zależności od typu transakcji
    (przychód/wydatek).

- **TransactionList (`src/components/TransactionList.js`)**:

  - Wyświetla listę transakcji na podstawie wybranego typu.
  - Pozwala na usuwanie transakcji z potwierdzeniem.

- **SummaryList (`src/components/SummaryList.js`)**:

  - Pokazuje miesięczne podsumowanie transakcji.
  - Grupuje transakcje według miesiąca i roku.

- **Login (`src/components/Login.js`)**:

  - Formularz logowania z polami email i hasło.
  - Przycisk do logowania przez Google.

- **RegisterForm (`src/components/RegisterForm.js`)**:

  - Formularz rejestracji dla nowych użytkowników.
  - Przycisk do rejestracji przez Google.

- **LogoutButton (`src/components/LogoutButton.js`)**:

  - Prosty przycisk do wylogowania.
  - Wyświetla potwierdzenie przed wylogowaniem.

- **Modal (`src/components/Modal.js`)**:
  - Wielokrotnego użytku komponent modalny do potwierdzeń i alertów.
  - Obsługuje akcje potwierdzenia i anulowania.

#### Narzędzia

- **Konfiguracja Firebase (`src/utils/firebase.js`)**:

  - Inicjalizuje aplikację Firebase na frontendzie.
  - Udostępnia funkcję `signInWithGoogle` do uwierzytelniania.

- **Narzędzia Wylogowania (`src/utils/logoutUtils.js`)**:

  - Obsługuje proces wylogowania.
  - Czyści `localStorage` i przekierowuje na stronę logowania.

- **Logger (`src/utils/logger.js`)**:
  - Prosty moduł do spójnego logowania.

#### Style

- **Pliki SCSS (`src/styles/`)**:
  - Zawierają wszystkie style aplikacji.
  - Zorganizowane w częściowe pliki i główny plik `index.scss`.

## Endpointy API

### Endpointy Użytkowników

- **POST `/api/users/register`**

  - Rejestruje nowego użytkownika.
  - Parametry ciała: `name`, `email`, `password`.

- **POST `/api/users/login`**

  - Loguje istniejącego użytkownika.
  - Parametry ciała: `email`, `password`.

- **POST `/api/users/google-login`**

  - Loguje lub rejestruje użytkownika przez uwierzytelnianie Google.
  - Parametry ciała: `token` (token Firebase ID).

- **POST `/api/users/logout`**

  - Wylogowuje użytkownika.
  - Wymaga JWT w nagłówku `Authorization`.

- **GET `/api/users/balance`**

  - Pobiera bieżące saldo.
  - Wymaga JWT w nagłówku `Authorization`.

- **PUT `/api/users/balance`**

  - Aktualizuje saldo użytkownika.
  - Parametry ciała: `balance`.
  - Wymaga JWT w nagłówku `Authorization`.

- **GET `/api/users/current`**
  - Pobiera informacje o bieżącym użytkowniku.
  - Wymaga JWT w nagłówku `Authorization`.

### Endpointy Transakcji

- **GET `/api/transactions`**

  - Pobiera transakcje filtrowane według typu (`income` lub `expense`).
  - Parametry zapytania: `type`.
  - Wymaga JWT w nagłówku `Authorization`.

- **POST `/api/transactions`**

  - Dodaje nową transakcję.
  - Parametry ciała: `type`, `date`, `category`, `amount`, `description`.
  - Wymaga JWT w nagłówku `Authorization`.

- **DELETE `/api/transactions/:id`**
  - Usuwa transakcję o podanym ID.
  - Wymaga JWT w nagłówku `Authorization`.

## Współpraca

Zapraszamy do współpracy nad **Kapu$ta**! Prosimy o przestrzeganie następujących
wytycznych:

1. **Forkuj repozytorium** i utwórz nową gałąź dla swojej funkcjonalności lub
   poprawki błędu.
2. **Dbaj o jakość kodu** poprzez przestrzeganie istniejącego stylu kodowania i
   dodawanie komentarzy tam, gdzie to konieczne.
3. **Pisz testy** dla swojego kodu, jeśli to możliwe.
4. **Stwórz pull request** z szczegółowym opisem swoich zmian.

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT. Szczegóły w pliku
[LICENSE](LICENSE).

---

Dziękujemy za korzystanie z **Kapu$ta**! Mamy nadzieję, że ta dokumentacja
pomoże Ci zrozumieć strukturę i funkcjonalność aplikacji. Jeśli masz
jakiekolwiek pytania lub potrzebujesz dodatkowej pomocy, prosimy o kontakt.
