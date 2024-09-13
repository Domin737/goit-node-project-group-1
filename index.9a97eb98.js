function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,n={},a={},o=t.parcelRequiref702;async function r(){try{let e=localStorage.getItem("userToken");if(!e)throw Error("No authentication token");if(!(await fetch("/api/users/logout",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).ok)throw Error("Error while logging out");localStorage.removeItem("userToken"),localStorage.removeItem("userName"),localStorage.removeItem("userEmail"),window.location.href="/login"}catch(e){console.error("Error while logging out:",e),alert(`An error occurred while logging out: ${e.message}`)}}null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},t.parcelRequiref702=o),(0,o.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,a=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)a.set(t[n],{baseUrl:e,path:t[n+1]})}}),o("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["9vqfN","index.9a97eb98.js","hyzl4","logo-small.856212bd.svg","kPl59","logo-big.afadb933.svg","5h9CN","index.56c6be1c.css"]'));const i="http://localhost:3000/api";function l({message:e,confirmAction:t,confirmLabel:n="YES",cancelAction:a=null,cancelLabel:o="NO"}){return`
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p>${e}</p>
          <div class="modal-footer">
            <button id="modal-confirm-btn" class="btn btn-primary">${n}</button>
            ${a?`<button id="modal-cancel-btn" class="btn btn-secondary">${o}</button>`:""}
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
    </div>
  `}function c(e,t=null){let n=document.getElementById("modal-confirm-btn"),a=document.getElementById("modal-close-btn");n.addEventListener("click",()=>{e(),s()}),a.addEventListener("click",s),t&&document.getElementById("modal-cancel-btn").addEventListener("click",()=>{t(),s()}),function(){let e=document.querySelector(".modal-overlay");e.addEventListener("click",t=>{t.target===e&&s()})}()}function s(){let e=document.querySelector(".modal-overlay");e&&e.remove()}function d(e){let t=document.createElement("div");t.innerHTML=l(e),document.body.appendChild(t.firstElementChild),c(e.confirmAction,e.cancelAction)}async function u(){let e=document.getElementById("balance-amount"),t=document.getElementById("update-balance-btn"),n=document.getElementById("show-reports-btn");if(!e||!t||!n){console.error("Elementy DOM potrzebne do działania nie istnieją.");return}async function a(){try{let t=await fetch(`${i}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),n=await t.json();e.textContent=`${n.balance.toFixed(2)} EUR`}catch(t){console.error("Error while retrieving balance:",t),e.textContent="Error while loading balance"}}async function o(t){try{let n=await fetch(`${i}/users/balance`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({balance:parseFloat(t)})}),a=await n.json();e.textContent=`${a.balance.toFixed(2)} EUR`,0===a.balance&&function(){let e=document.getElementById("zero-balance-modal-container");if(!e){console.error("Element zero-balance-modal-container nie istnieje.");return}e.innerHTML=l({message:"Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",confirmLabel:"OK",confirmAction:()=>{e.innerHTML=""}}),c(()=>{e.innerHTML=""})}()}catch(e){console.error("Error updating balance:",e),alert("An error occurred while updating the balance sheet")}}return t.addEventListener("click",()=>{let e=`
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
    `,t=document.querySelector(".balance-container");t.insertAdjacentHTML("beforeend",e);let n=document.getElementById("confirm-balance"),a=document.getElementById("cancel-balance"),r=document.getElementById("new-balance");n.addEventListener("click",async()=>{let e=r.value;e&&function(e,t){let n=document.getElementById("confirmation-modal-container");if(!n){console.error("Element confirmation-modal-container nie istnieje.");return}n.innerHTML=l({message:e,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{t(),n.innerHTML=""},cancelAction:()=>{n.innerHTML=""}}),c(()=>{t(),n.innerHTML=""},()=>{n.innerHTML=""})}("Are you sure you want to update your balance?",async()=>{await o(e),t.removeChild(document.querySelector(".balance-form"))})}),a.addEventListener("click",()=>{t.removeChild(document.querySelector(".balance-form"))})}),n.addEventListener("click",()=>{console.log("Go to reports")}),await a(),{updateBalance:o,refreshBalance:a}}async function m(e){let t=document.getElementById("transaction-list");async function n(){try{var n;let a=await fetch(`${i}/transactions`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});n=await a.json(),t.innerHTML=n.map(e=>`
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
      `).join(""),document.querySelectorAll(".delete-transaction").forEach(t=>{t.addEventListener("click",async t=>{let n=t.target.closest("li").dataset.id;(function(e,t){let n=document.getElementById("confirmation-modal-container");n.innerHTML=l({message:e,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{t(),n.innerHTML=""},cancelAction:()=>{n.innerHTML=""}}),c(()=>{t(),n.innerHTML=""},()=>{n.innerHTML=""})})("Are you sure you want to delete the transaction?",async()=>{try{let a=await fetch(`${i}/transactions/${n}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});if(!a.ok)throw Error("Error deleting transaction");let o=await a.json();t.target.closest("li").remove(),alert("Transaction deleted successfully"),e&&e(o.newBalance)}catch(e){console.error("Error while deleting transaction:",e),alert("An error occurred while deleting the transaction")}})})})}catch(e){console.error("Error downloading transaction:",e),t.innerHTML="<li>Error loading transaction</li>"}}return await n(),{refreshTransactions:n}}var g={};async function b(){let e=await u(),t=await m(async t=>{await e.updateBalance(t),0===t&&p()});!function(e){let t=document.getElementById("transaction-form");t.addEventListener("submit",async n=>{n.preventDefault();let a=document.getElementById("transaction-type").value,o=document.getElementById("transaction-category").value,r=parseFloat(document.getElementById("transaction-amount").value),l=document.getElementById("transaction-description").value;try{let n=await fetch(`${i}/transactions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({type:a,category:o,amount:r,description:l})});if(!n.ok)throw Error("Error while adding transaction");let c=await n.json();d({message:"Transaction added successfully",confirmLabel:"OK",confirmAction:()=>{}}),t.reset(),e&&e(c.transaction,c.newBalance)}catch(e){console.error("Error while adding transaction:",e),d({message:"An error occurred while adding the transaction.",confirmLabel:"OK",confirmAction:()=>{}})}})}(async(n,a)=>{await e.updateBalance(a),await t.refreshTransactions(),0===a&&p()}),0===await y()&&p(),function(e){let t=document.getElementById("logout-btn");t&&t.addEventListener("click",e)}(()=>{d({message:"Are you sure you want to log out?",confirmLabel:"YES",cancelLabel:"NO",confirmAction:r,cancelAction:()=>{}})})}function p(){d({message:"Hello! To get started, enter the current balance of your account! You can't spend money until you have it :)",confirmLabel:"OK",confirmAction:()=>{}})}async function y(){try{let e=await fetch(`${i}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});return(await e.json()).balance}catch(e){return console.error("Error while retrieving balance:",e),null}}async function f(e){e.preventDefault();let t=document.getElementById("email").value,n=document.getElementById("password").value;try{let e=await fetch(`${i}/users/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}),a=await e.json();e.ok?(console.log("Successfully logged in:",a),localStorage.setItem("userToken",a.token),h()):(console.error("Login error:",a.message||"Unknown error"),alert(`Login error: ${a.message}`))}catch(e){console.error("There was a problem logging in:",e),alert("There was a problem logging in. Please try again later.")}}g=new URL("logo-small.856212bd.svg",import.meta.url).toString();var v={};function h(){let t=localStorage.getItem("userToken"),n=document.getElementById("app");t?(n.innerHTML=`
      <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${/*@__PURE__*/e(g)}" alt="Kapu$ta Logo">
        </div>
        
    <button id="logout-btn" class="btn btn-secondary">Log out</button>
  
      </header>
      <main class="main-content">
        
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
  
        <div class="transactions-container">
          
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
  
          
    <div class="transaction-container">
      <h3>List of transactions</h3>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  
        </div>
      </main>
    </div>
  `,b()):(n.innerHTML=`
    <div id="auth-container" class="auth-container">
      <div id="login-section" class="login-section">
        <div class="logo">
          <img src="${/*@__PURE__*/e(v)}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
    </form>
  

        </div>
      </div>
      <div id="register-section" style="display: none;">
        
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
  
        <button id="switch-to-login">Log in</button>
      </div>
    </div>
  `,function(){let e=document.getElementById("login-form"),t=document.getElementById("switch-to-register"),n=document.getElementById("switch-to-login"),a=document.getElementById("login-section"),o=document.getElementById("register-section");e.addEventListener("submit",f),t.addEventListener("click",()=>{a.style.display="none",o.style.display="block"}),n.addEventListener("click",()=>{o.style.display="none",a.style.display="block"}),function(e){let t=document.getElementById("register-form");t.addEventListener("submit",async n=>{n.preventDefault();let a=Object.fromEntries(new FormData(t).entries());try{let t=await fetch("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(t.ok)alert("Registration successful! You can now log in."),e();else{let e=await t.json();alert(`Registration error: ${e.message}`)}}catch(e){console.error("Registration error:",e),alert("An error occurred while registering. Please try again later.")}})}(()=>{o.style.display="none",a.style.display="block"})}())}v=new URL("logo-big.afadb933.svg",import.meta.url).toString(),document.addEventListener("DOMContentLoaded",h),window.addEventListener("storage",e=>{"userToken"===e.key&&h()});
//# sourceMappingURL=index.9a97eb98.js.map
