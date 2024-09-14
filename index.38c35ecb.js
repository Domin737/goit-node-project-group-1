function e(e){return e&&e.__esModule?e.default:e}var a=globalThis,o={},n={},t=a.parcelRequiref702;async function i(){try{let e=localStorage.getItem("userToken");if(!e)throw Error("No authentication token");if(!(await fetch("/api/users/logout",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).ok)throw Error("Error while logging out");localStorage.removeItem("userToken"),localStorage.removeItem("userName"),localStorage.removeItem("userEmail"),window.location.href="/login"}catch(e){console.error("Error while logging out:",e),alert(`An error occurred while logging out: ${e.message}`)}}null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var a=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,a.call(t.exports,t,t.exports),t.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,a){n[e]=a},a.parcelRequiref702=t),(0,t.register)("27Lyk",function(e,a){Object.defineProperty(e.exports,"register",{get:()=>o,set:e=>o=e,enumerable:!0,configurable:!0});var o,n=new Map;o=function(e,a){for(var o=0;o<a.length-1;o+=2)n.set(a[o],{baseUrl:e,path:a[o+1]})}}),t("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["9vqfN","index.38c35ecb.js","hyzl4","logo-small.856212bd.svg","kPl59","logo-big.afadb933.svg","5h9CN","index.56c6be1c.css"]'));const l="http://localhost:3000/api";function r({message:e,confirmAction:a,confirmLabel:o="YES",cancelAction:n=null,cancelLabel:t="NO"}){return console.log("Tworzenie modala z wiadomością:",e),`
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p>${e}</p>
          <div class="modal-footer">
            <button id="modal-confirm-btn" class="btn btn-primary">${o}</button>
            ${n?`<button id="modal-cancel-btn" class="btn btn-secondary">${t}</button>`:""}
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
    </div>
  `}function c(e,a=null){let o=document.getElementById("modal-confirm-btn"),n=document.getElementById("modal-close-btn");o.addEventListener("click",()=>{console.log("Kliknięto przycisk potwierdzenia w modalu"),e(),s()}),n.addEventListener("click",()=>{console.log("Kliknięto przycisk zamknięcia modala"),s()}),a&&document.getElementById("modal-cancel-btn").addEventListener("click",()=>{console.log("Kliknięto przycisk anulowania w modalu"),a(),s()}),function(){let e=document.querySelector(".modal-overlay");e.addEventListener("click",a=>{a.target===e&&(console.log("Kliknięto poza modalem, zamykanie modala"),s())})}()}function s(){console.log("Zamykanie modala");let e=document.querySelector(".modal-overlay");e&&e.remove()}function d(e){console.log("Pokazanie modala z opcjami:",e);let a=document.createElement("div");a.innerHTML=r(e),document.body.appendChild(a.firstElementChild),c(e.confirmAction,e.cancelAction)}async function u(){console.log("Rozpoczęto pobieranie balansu");let e=document.getElementById("balance-amount");try{let a=await fetch(`${l}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),o=await a.json();return console.log("Pobrano dane balansu:",o),e&&(e.textContent=`${o.balance.toFixed(2)} EUR`),o.balance}catch(a){return console.error("Błąd podczas pobierania balansu:",a),e&&(e.textContent="Error while loading balance"),null}}async function m(){console.log("Inicjalizacja Balance");let e=document.getElementById("balance-amount"),a=document.getElementById("update-balance-btn"),o=document.getElementById("show-reports-btn");if(!e||!a||!o){console.error("Elementy DOM potrzebne do działania nie istnieją.");return}async function n(a){console.log("Aktualizacja balansu:",a);try{let o=await fetch(`${l}/users/balance`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({balance:parseFloat(a)})}),n=await o.json();console.log("Zaktualizowano balans:",n),e.textContent=`${n.balance.toFixed(2)} EUR`,0===n.balance&&(console.log("Pokazanie modala, ponieważ balans wynosi 0"),b())}catch(e){console.error("Błąd podczas aktualizacji balansu:",e),d({message:"An error occurred while updating the balance sheet",confirmLabel:"OK",confirmAction:()=>{}})}}return a.addEventListener("click",()=>{console.log("Kliknięto przycisk aktualizacji bilansu");let e=`
      <div class="balance-form">
        <div class="form-group">
          <label for="new-balance">New balance:</label>
          <input type="number" id="new-balance" step="0.01" required>
        </div>
        <div class="btn-group">
          <button id="confirm-balance" class="btn btn-primary">Confirm</button>
          <button id="cancel-balance" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    `,a=document.querySelector(".balance-container");a.insertAdjacentHTML("beforeend",e);let o=document.getElementById("confirm-balance"),t=document.getElementById("cancel-balance"),i=document.getElementById("new-balance");o.addEventListener("click",async()=>{let e=i.value;if(e){var o,t;console.log("Potwierdzono nowy balans:",e),o="Are you sure you want to update your balance?",t=async()=>{await n(e),a.removeChild(document.querySelector(".balance-form"))},console.log("Pokazanie modala potwierdzającego z wiadomością:",o),d({message:o,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{console.log("Potwierdzono akcję"),t()},cancelAction:()=>{console.log("Anulowano akcję")}})}}),t.addEventListener("click",()=>{console.log("Anulowano aktualizację balansu"),a.removeChild(document.querySelector(".balance-form"))})}),o.addEventListener("click",()=>{console.log("Przejście do raportów")}),await u(),{updateBalance:n,refreshBalance:u}}let g=!1;function b(){g||(console.log("Pokazanie modala dla zerowego balansu"),d({message:"Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",confirmLabel:"OK",confirmAction:()=>{g=!1,s()}}),g=!0)}async function p(){0===await u()&&b()}async function y(e){let a=document.getElementById("transaction-list");async function o(){console.log("Pobieranie listy transakcji");try{let o=await fetch(`${l}/transactions`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),n=await o.json();console.log("Pobrano transakcje:",n),console.log("Renderowanie transakcji"),a.innerHTML=n.map(e=>`
        <li data-id="${e._id}">
          <div class="transaction-info">
            <span class="transaction-icon">${"income"===e.type?"\uD83D\uDCC8":"\uD83D\uDCC9"}</span>
            <div class="transaction-details">
              <span class="category">${e.category}</span>
              <span class="description">${e.description}</span>
            </div>
          </div>
          <span class="transaction-amount ${e.type}">${e.amount.toFixed(2)} EUR</span>
          <button class="delete-transaction btn-icon">\u{1F5D1}\u{FE0F}</button>
        </li>
      `).join(""),document.querySelectorAll(".delete-transaction").forEach(a=>{a.addEventListener("click",async a=>{let o=a.target.closest("li").dataset.id;console.log("Próba usunięcia transakcji o ID:",o),function(e,a){let o=document.getElementById("confirmation-modal-container");console.log("Pokazanie modala potwierdzającego z wiadomością:",e),o.innerHTML=r({message:e,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{a(),o.innerHTML=""},cancelAction:()=>{o.innerHTML=""}}),c(()=>{a(),o.innerHTML=""},()=>{o.innerHTML=""})}("Are you sure you want to delete the transaction?",async()=>{try{let n=await fetch(`${l}/transactions/${o}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});if(!n.ok)throw Error("Błąd podczas usuwania transakcji");let t=await n.json();a.target.closest("li").remove(),console.log("Transakcja usunięta pomyślnie"),alert("Transaction deleted successfully"),e&&e(t.newBalance)}catch(e){console.error("Błąd podczas usuwania transakcji:",e),alert("An error occurred while deleting the transaction")}})})})}catch(e){console.error("Błąd pobierania transakcji:",e),a.innerHTML="<li>Error loading transactions</li>"}}return await o(),{refreshTransactions:o}}var f={};async function w(){console.log("Inicjalizacja HomePage");let e=await m(),a=await y(async a=>{console.log("Zaktualizowano listę transakcji, nowy balans:",a),await e.updateBalance(a)});!function(e){console.log("Inicjalizacja formularza transakcji");let a=document.getElementById("transaction-form");a.addEventListener("submit",async o=>{o.preventDefault();let n=document.getElementById("transaction-type").value,t=document.getElementById("transaction-category").value,i=parseFloat(document.getElementById("transaction-amount").value),r=document.getElementById("transaction-description").value;console.log("Dodawanie nowej transakcji:",{type:n,category:t,amount:i,description:r});try{let o=await fetch(`${l}/transactions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({type:n,category:t,amount:i,description:r})});if(!o.ok)throw Error("Błąd podczas dodawania transakcji");let c=await o.json();console.log("Transakcja dodana pomyślnie:",c),d({message:"Transaction added successfully",confirmLabel:"OK",confirmAction:async()=>{s(),a.reset(),e&&await e(c.transaction,c.newBalance),await p()}})}catch(e){console.error("Błąd podczas dodawania transakcji:",e),d({message:"An error occurred while adding the transaction.",confirmLabel:"OK",confirmAction:()=>{}})}})}(async(o,n)=>{console.log("Dodano transakcję, nowy balans:",n),await e.updateBalance(n),await a.refreshTransactions()}),0===await v()&&b(),function(e){let a=document.getElementById("logout-btn");a&&(console.log("Inicjalizacja przycisku wylogowania"),a.addEventListener("click",e))}(()=>{console.log("Pokazanie modala wylogowania"),console.log("Pokazanie modala wylogowania"),d({message:"Are you sure you want to log out?",confirmLabel:"YES",cancelLabel:"NO",confirmAction:i,cancelAction:()=>{}})})}async function v(){console.log("Pobieranie aktualnego balansu");try{let e=await fetch(`${l}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),a=await e.json();return console.log("Pobrano aktualny balans:",a.balance),a.balance}catch(e){return console.error("Błąd podczas pobierania balansu:",e),null}}async function h(e){e.preventDefault();let a=document.getElementById("email").value,o=document.getElementById("password").value;try{console.log("Próba logowania użytkownika:",a);let e=await fetch(`${l}/users/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:a,password:o})}),n=await e.json();e.ok?(console.log("Zalogowano pomyślnie:",n),localStorage.setItem("userToken",n.token),E()):(console.error("Błąd logowania:",n.message||"Nieznany błąd"),alert(`Login error: ${n.message}`))}catch(e){console.error("Wystąpił problem podczas logowania:",e),alert("There was a problem logging in. Please try again later.")}}f=new URL("logo-small.856212bd.svg",import.meta.url).toString();var k={};function E(){let a=localStorage.getItem("userToken"),o=document.getElementById("app");a?(o.innerHTML=(console.log("Renderowanie HomePage"),`
      <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${/*@__PURE__*/e(f)}" alt="Kapu$ta Logo">
        </div>
        ${console.log("Renderowanie przycisku wylogowania"),`
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  `}
      </header>
      <main class="main-content">
        ${console.log("Renderowanie komponentu Balance"),`
    <div class="balance-container">
      <h2>BALANCE</h2>
      <p id="balance-amount" class="balance-amount">Loading...</p>
      <div class="balance-actions">
        <button id="update-balance-btn" class="btn btn-primary">Update balance sheet</button>
        <button id="show-reports-btn" class="btn btn-secondary">Go to reports</button>
      </div>
    </div>
    <div id="confirmation-modal-container"></div>
    <div id="zero-balance-modal-container"></div>
  `}
        <div class="transactions-container">
          ${console.log("Renderowanie formularza transakcji"),`
    <div class="transaction-form-container">
      <h3>Add transaction</h3>
      <form id="transaction-form" class="transaction-form">
        <div class="form-group">
          <select id="transaction-type" required>
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-category" placeholder="Category" required>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Sum" step="0.01" required>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Add</button>
          <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  `}
          ${console.log("Renderowanie listy transakcji"),`
    <div class="transaction-container">
      <h3>List of transactions</h3>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  `}
        </div>
      </main>
    </div>
  `),w()):(o.innerHTML=(console.log("Renderowanie strony logowania"),`
    <div id="auth-container" class="auth-container">
      <div id="login-section" class="login-section">
        <div class="logo">
          <img src="${/*@__PURE__*/e(k)}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          ${console.log("Renderowanie formularza logowania"),`
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
    </form>
  `}
        </div>
      </div>
      <div id="register-section" style="display: none;">
        ${console.log("Renderowanie formularza rejestracji"),`
    <form id="register-form">
      <h2>Registration</h2>
      <div>
        <label for="register-name">Name:</label>
        <input type="text" id="register-name" name="name" required>
      </div>
      <div>
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" name="email" required>
      </div>
      <div>
        <label for="register-password">Password:</label>
        <input type="password" id="register-password" name="password" required>
      </div>
      <button type="submit">Sign up</button>
    </form>
  `}
        <button id="switch-to-login">Log in</button>
      </div>
    </div>
  `),function(){let e=document.getElementById("login-form"),a=document.getElementById("switch-to-register"),o=document.getElementById("switch-to-login"),n=document.getElementById("login-section"),t=document.getElementById("register-section");console.log("Inicjalizacja formularzy autoryzacji"),e.addEventListener("submit",h),a.addEventListener("click",()=>{console.log("Przełączanie na formularz rejestracji"),n.style.display="none",t.style.display="block"}),o.addEventListener("click",()=>{console.log("Przełączanie na formularz logowania"),t.style.display="none",n.style.display="block"}),function(e){let a=document.getElementById("register-form");console.log("Inicjalizacja formularza rejestracji"),a.addEventListener("submit",async o=>{o.preventDefault();let n=Object.fromEntries(new FormData(a).entries());try{console.log("Próba rejestracji użytkownika:",n.email);let a=await fetch("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(a.ok)console.log("Rejestracja zakończona pomyślnie"),alert("Registration successful! You can now log in."),e();else{let e=await a.json();console.error("Błąd rejestracji:",e.message),alert(`Registration error: ${e.message}`)}}catch(e){console.error("Błąd podczas rejestracji:",e),alert("An error occurred while registering. Please try again later.")}})}(()=>{console.log("Rejestracja zakończona pomyślnie, powrót do logowania"),t.style.display="none",n.style.display="block"})}())}k=new URL("logo-big.afadb933.svg",import.meta.url).toString(),document.addEventListener("DOMContentLoaded",E),window.addEventListener("storage",e=>{"userToken"===e.key&&E()});
//# sourceMappingURL=index.38c35ecb.js.map
