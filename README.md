# Dokumentacja aplikacji Kapu$ta

## Spis treści

1. [Opis aplikacji](#opis-aplikacji)
2. [Technologie](#technologie)
3. [Struktura projektu](#struktura-projektu)
4. [Główne funkcjonalności](#główne-funkcjonalności)
5. [Uruchamianie aplikacji](#uruchamianie-aplikacji)
6. [Rozwój aplikacji](#rozwój-aplikacji)

## Opis aplikacji

Kapu$ta to aplikacja do zarządzania osobistymi finansami, która pomaga
użytkownikom kontrolować swoje wydatki i przychody. Aplikacja oferuje intuicyjny
interfejs użytkownika, umożliwiający łatwe śledzenie transakcji finansowych,
aktualizację salda konta oraz generowanie raportów.

## Technologie

Aplikacja Kapu$ta wykorzystuje następujące technologie:

- **Frontend:**

  - HTML5
  - SCSS
  - JavaScript (ES6+)
  - Parcel (bundler)

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB (z Mongoose ORM)

- **Autentykacja:**

  - JSON Web Tokens (JWT)
  - Firebase Authentication (dla logowania przez Google)

- **Dodatkowe narzędzia:**
  - ESLint (linter)
  - Jest (testy)
  - Nodemon (dla trybu developerskiego)

## Struktura projektu

Projekt jest podzielony na część frontendową i backendową:

```
kapusta/
├── server/              # Kod backendowy
│   ├── config/          # Konfiguracja bazy danych
│   ├── controllers/     # Kontrolery
│   ├── middleware/      # Middleware
│   ├── models/          # Modele danych
│   ├── routes/          # Definicje tras API
│   └── app.js           # Główny plik serwera
├── src/                 # Kod frontendowy
│   ├── components/      # Komponenty React
│   ├── pages/           # Strony aplikacji
│   ├── redux/           # Logika Redux
│   ├── styles/          # Pliki SCSS
│   ├── utils/           # Funkcje pomocnicze
│   ├── index.html       # Główny plik HTML
│   └── index.js         # Punkt wejścia aplikacji
├── tests/               # Testy
└── package.json         # Zależności i skrypty npm
```

## Główne funkcjonalności

### 1. Autentykacja użytkownika

- Rejestracja i logowanie poprzez email i hasło
- Logowanie przez konto Google
- Zabezpieczenie tras API tokenami JWT

Lokalizacja kodu: `src/components/Login.js`, `src/components/RegisterForm.js`,
`server/controllers/userController.js`

### 2. Zarządzanie saldem

- Wyświetlanie aktualnego salda
- Aktualizacja salda
- Ostrzeżenie przy zerowym saldzie

Lokalizacja kodu: `src/components/Balance.js`,
`server/controllers/userController.js`

### 3. Transakcje

- Dodawanie przychodów i wydatków
- Kategoryzacja transakcji
- Lista transakcji z możliwością filtrowania

Lokalizacja kodu: `src/components/TransactionForm.js`,
`src/components/TransactionList.js`,
`server/controllers/transactionController.js`

### 4. Raporty

- Generowanie raportów finansowych
- Wizualizacja danych w formie wykresów

Lokalizacja kodu: `src/pages/ReportsPage.js`

## Uruchamianie aplikacji

Aby uruchomić aplikację Kapu$ta, wykonaj następujące kroki:

1. Sklonuj repozytorium:

   ```
   git clone [URL_REPOZYTORIUM]
   cd kapusta
   ```

2. Zainstaluj zależności:

   ```
   npm install
   ```

3. Skonfiguruj zmienne środowiskowe: Utwórz plik `.env` w głównym katalogu
   projektu i dodaj niezbędne zmienne (np. `MONGODB_URI`, `JWT_SECRET`,
   `FIREBASE_CONFIG`).

4. Uruchom aplikację w trybie produkcyjnym:

   ```
   npm start
   ```

   Lub w trybie developerskim:

   ```
   npm run dev
   ```

5. Otwórz przeglądarkę i przejdź pod adres `http://localhost:3000` (lub inny
   port, jeśli został skonfigurowany inaczej).

## Rozwój aplikacji

Aby rozwijać aplikację Kapu$ta:

1. Zapoznaj się dokładnie ze strukturą projektu i istniejącym kodem.

2. Używaj narzędzia ESLint do utrzymania spójności kodu:

   ```
   npm run lint
   ```

3. Pisz testy dla nowych funkcjonalności:

   ```
   npm test
   ```

4. Przed wysłaniem zmian, upewnij się, że wszystkie testy przechodzą i kod jest
   sformatowany zgodnie z przyjętymi standardami.

5. Używaj systemu kontroli wersji (Git) do śledzenia zmian i tworzenia gałęzi
   dla nowych funkcjonalności.

6. Regularnie aktualizuj dokumentację, aby odzwierciedlała bieżący stan
   projektu.

---

Ta dokumentacja będzie regularnie aktualizowana wraz z rozwojem aplikacji
Kapu$ta. Jeśli zauważysz jakiekolwiek nieścisłości lub masz sugestie dotyczące
ulepszeń, prosimy o kontakt z zespołem deweloperskim.
