async function e(){try{let e=localStorage.getItem("userToken");if(!e)throw Error("Brak tokenu uwierzytelniającego");if(!(await fetch("/api/users/logout",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).ok)throw Error("Błąd podczas wylogowywania");localStorage.removeItem("userToken"),localStorage.removeItem("userName"),localStorage.removeItem("userEmail"),window.location.href="/login"}catch(e){console.error("Błąd podczas wylogowywania:",e),alert(`Wyst\u{105}pi\u{142} b\u{142}\u{105}d podczas wylogowywania: ${e.message}`)}}const t="http://localhost:3000/api";function n({message:e,confirmAction:t,confirmLabel:n="YES",cancelAction:a=null,cancelLabel:o="NO"}){return`
      <div class="modal">
        <div class="modal-content">
          <p>${e}</p>
          <button id="modal-confirm-btn">${n}</button>
          ${a?`<button id="modal-cancel-btn">${o}</button>`:""}
        </div>
      </div>
    `}function a(e,t=null){document.getElementById("modal-confirm-btn").addEventListener("click",e),t&&document.getElementById("modal-cancel-btn").addEventListener("click",t)}async function o(){let e=document.getElementById("balance-amount");async function o(){try{let n=await fetch(`${t}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),a=await n.json();e.textContent=`${a.balance.toFixed(2)} EUR`}catch(t){console.error("Błąd podczas pobierania bilansu:",t),e.textContent="Błąd podczas ładowania bilansu"}}async function i(o){try{let i=await fetch(`${t}/users/balance`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({balance:parseFloat(o)})}),r=await i.json();e.textContent=`${r.balance.toFixed(2)} EUR`,0===r.balance&&function(){let e=document.getElementById("zero-balance-modal-container");e.innerHTML=n({message:"Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",confirmLabel:"OK",confirmAction:()=>{e.innerHTML=""}}),a(()=>{e.innerHTML=""}),setupOutsideClickModal(e,".modal")}()}catch(e){console.error("Błąd podczas aktualizacji bilansu:",e),alert("Wystąpił błąd podczas aktualizacji bilansu")}}return document.getElementById("update-balance-btn").addEventListener("click",async()=>{let e=prompt("Podaj nowy bilans:");null!==e&&function(e,t){let o=document.getElementById("confirmation-modal-container");o.innerHTML=n({message:e,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{t(),o.innerHTML=""},cancelAction:()=>{o.innerHTML=""}}),a(()=>{t(),o.innerHTML=""},()=>{o.innerHTML=""})}("Czy na pewno chcesz zaktualizować bilans?",async()=>{await i(e)})}),await o(),{updateBalance:i,refreshBalance:o}}async function i(e){let o=document.getElementById("transaction-list");async function i(){try{var i;let r=await fetch(`${t}/transactions`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});i=await r.json(),o.innerHTML=i.map(e=>`
        <li data-id="${e._id}">
          ${"income"===e.type?"\uD83D\uDCC8":"\uD83D\uDCC9"}
          ${e.category} - ${e.amount.toFixed(2)} EUR
          (${e.description})
          <button class="delete-transaction">Usu\u{144}</button>
        </li>
      `).join(""),document.querySelectorAll(".delete-transaction").forEach(o=>{o.addEventListener("click",async o=>{let i=o.target.closest("li").dataset.id;(function(e,t){let o=document.getElementById("confirmation-modal-container");o.innerHTML=n({message:e,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{t(),o.innerHTML=""},cancelAction:()=>{o.innerHTML=""}}),a(()=>{t(),o.innerHTML=""},()=>{o.innerHTML=""})})("Czy na pewno chcesz usunąć transakcję?",async()=>{try{let n=await fetch(`${t}/transactions/${i}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});if(!n.ok)throw Error("Błąd podczas usuwania transakcji");let a=await n.json();o.target.closest("li").remove(),alert("Transakcja usunięta pomyślnie"),e&&e(a.newBalance)}catch(e){console.error("Błąd podczas usuwania transakcji:",e),alert("Wystąpił błąd podczas usuwania transakcji")}})})})}catch(e){console.error("Błąd podczas pobierania transakcji:",e),o.innerHTML="<li>Błąd podczas ładowania transakcji</li>"}}return await i(),{refreshTransactions:i}}async function r(){let r=await o(),s=await i(async e=>{await r.updateBalance(e),0===e&&c()});!function(e){let n=document.getElementById("transaction-form");n.addEventListener("submit",async a=>{a.preventDefault();let o=document.getElementById("transaction-type").value,i=document.getElementById("transaction-category").value,r=parseFloat(document.getElementById("transaction-amount").value),c=document.getElementById("transaction-description").value;try{let a=await fetch(`${t}/transactions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({type:o,category:i,amount:r,description:c})});if(!a.ok)throw Error("Błąd podczas dodawania transakcji");let l=await a.json();alert("Transakcja dodana pomyślnie"),n.reset(),e&&e(l.transaction,l.newBalance)}catch(e){console.error("Błąd podczas dodawania transakcji:",e),alert("Wystąpił błąd podczas dodawania transakcji")}})}(async(e,t)=>{await r.updateBalance(t),await s.refreshTransactions(),0===t&&c()}),0===await l()&&c(),function(e){let t=document.getElementById("logout-btn");t&&t.addEventListener("click",e)}(()=>{(function(){let t=document.getElementById("logout-modal-container");t.innerHTML=n({message:"Czy na pewno chcesz się wylogować?",confirmLabel:"Tak",cancelLabel:"Nie",confirmAction:()=>{e(),t.innerHTML=""},cancelAction:()=>{t.innerHTML=""}}),a(()=>{e(),t.innerHTML=""},()=>{t.innerHTML=""})})()})}function c(){var e;let t=document.getElementById("zero-balance-modal-container");t.innerHTML=n({message:"Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",confirmLabel:"OK",confirmAction:()=>{t.innerHTML=""}}),a(()=>{t.innerHTML=""}),e=".modal",document.addEventListener("click",n=>{let a=document.querySelector(e);a&&!a.contains(n.target)&&(t.innerHTML="")})}async function l(){try{let e=await fetch(`${t}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});return(await e.json()).balance}catch(e){return console.error("Błąd podczas pobierania bilansu:",e),null}}async function s(e){e.preventDefault();let n=document.getElementById("email").value,a=document.getElementById("password").value;try{let e=await fetch(`${t}/users/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:a})}),o=await e.json();e.ok?(console.log("Zalogowano pomyślnie:",o),localStorage.setItem("userToken",o.token),d()):(console.error("Błąd logowania:",o.message||"Nieznany błąd"),alert(`B\u{142}\u{105}d logowania: ${o.message}`))}catch(e){console.error("Wystąpił problem z logowaniem:",e),alert("Wystąpił problem z logowaniem. Spróbuj ponownie później.")}}function d(){let e=localStorage.getItem("userToken"),t=document.getElementById("app");e?(t.innerHTML=`
    <div id="home-page">
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      
    <div id="balance-container">
      <h2>Bilans</h2>
      <p id="balance-amount">\u{141}adowanie...</p>
      <button id="update-balance-btn">Aktualizuj bilans</button>
    </div>
  
      
    <div id="transaction-form-container">
      <h2>Dodaj transakcj\u{119}</h2>
      <form id="transaction-form">
        <select id="transaction-type" required>
          <option value="">Wybierz typ</option>
          <option value="income">Przych\xf3d</option>
          <option value="expense">Wydatek</option>
        </select>
        <input type="text" id="transaction-category" placeholder="Kategoria" required>
        <input type="number" id="transaction-amount" placeholder="Kwota" step="0.01" required>
        <input type="text" id="transaction-description" placeholder="Opis" required>
        <button type="submit">Dodaj</button>
      </form>
    </div>
  
      
    <div id="transaction-list-container">
      <h2>Lista transakcji</h2>
      <ul id="transaction-list"></ul>
    </div>
  
      
    <button id="logout-btn">Wyloguj</button>
  
      
      <!-- Modale -->
      <div id="confirmation-modal-container"></div>
      <div id="logout-modal-container"></div>
      <div id="zero-balance-modal-container"></div>
    </div>
  `,r()):(t.innerHTML=`
    <div id="auth-container">
      <div id="login-section">
        <h2>Logowanie</h2>
        ${`
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Has\u{142}o:</label>
      <input type="password" id="password" required />
      
      <button type="submit">Zaloguj</button>
    </form>
  `}
        <button id="switch-to-register">Zarejestruj si\u{119}</button>
      </div>
      <div id="register-section" style="display: none;">
        ${`
    <form id="register-form">
      <h2>Rejestracja</h2>
      <div>
        <label for="register-name">Imi\u{119}:</label>
        <input type="text" id="register-name" name="name" required>
      </div>
      <div>
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" name="email" required>
      </div>
      <div>
        <label for="register-password">Has\u{142}o:</label>
        <input type="password" id="register-password" name="password" required>
      </div>
      <button type="submit">Zarejestruj si\u{119}</button>
    </form>
  `}
        <button id="switch-to-login">Powr\xf3t do logowania</button>
      </div>
    </div>
  `,function(){let e=document.getElementById("login-form"),t=document.getElementById("switch-to-register"),n=document.getElementById("switch-to-login"),a=document.getElementById("login-section"),o=document.getElementById("register-section");e.addEventListener("submit",s),t.addEventListener("click",()=>{a.style.display="none",o.style.display="block"}),n.addEventListener("click",()=>{o.style.display="none",a.style.display="block"}),function(e){let t=document.getElementById("register-form");t.addEventListener("submit",async n=>{n.preventDefault();let a=Object.fromEntries(new FormData(t).entries());try{let t=await fetch("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(t.ok)alert("Rejestracja udana! Możesz się teraz zalogować."),e();else{let e=await t.json();alert(`B\u{142}\u{105}d rejestracji: ${e.message}`)}}catch(e){console.error("Błąd podczas rejestracji:",e),alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.")}})}(()=>{o.style.display="none",a.style.display="block"})}())}document.addEventListener("DOMContentLoaded",d),window.addEventListener("storage",e=>{"userToken"===e.key&&d()});
//# sourceMappingURL=index.b14c8036.js.map
