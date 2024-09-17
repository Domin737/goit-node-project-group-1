let e,t,n,r;function i(e){return e&&e.__esModule?e.default:e}var a,s,o,l,c,u,d=globalThis,h=(...e)=>{};const p="http://localhost:3000/api";async function f(){try{let e=localStorage.getItem("userToken");if(!e)throw Error("No authentication token");if(h(`API_URL w handleLogout: ${p}`),!(await fetch(`${p}/users/logout`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).ok)throw Error("Error while logging out");localStorage.removeItem("userToken"),localStorage.removeItem("userName"),localStorage.removeItem("userEmail"),window.location.href="/login"}catch(e){console.error("function handleLogout - Error while logging out:",e),alert(`An error occurred while logging out: ${e.message}`)}}function m(){h("function closeModal - Zamknięcie modalu");let e=document.querySelector(".modal-overlay");e&&e.remove()}function g(e){h("function showModal - Wyświetlanie modalu z opcjami:",e);let t=document.createElement("div");t.innerHTML=function({message:e,confirmAction:t,confirmLabel:n="YES",cancelAction:r=null,cancelLabel:i="NO"}){return h("function Modal - Tworzenie modalu z wiadomością:",e),`
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <p>${e}</p>
          <div class="modal-footer">
            <button id="modal-confirm-btn" class="btn btn-primary">${n}</button>
            ${r?`<button id="modal-cancel-btn" class="btn btn-secondary">${i}</button>`:""}
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">&times;</button>
      </div>
    </div>
  `}(e),document.body.appendChild(t.firstElementChild),function(e,t=null){let n=document.getElementById("modal-confirm-btn"),r=document.getElementById("modal-close-btn");n.addEventListener("click",()=>{h("function setupModal - Kliknięto przycisk potwierdzenia w modalu"),e(),m()}),r.addEventListener("click",()=>{h("function setupModal - Kliknięto przycisk zamknięcia modalu"),m()}),t&&document.getElementById("modal-cancel-btn").addEventListener("click",()=>{h("function setupModal - Kliknięto przycisk anulowania w modalu"),t(),m()}),function(){let e=document.querySelector(".modal-overlay");e.addEventListener("click",t=>{t.target===e&&(h("function setupOutsideClickModal - Kliknięto poza modalem, zamykanie modalu"),m())})}()}(e.confirmAction,e.cancelAction)}async function v(){h("function fetchBalance - Rozpoczęto pobieranie salda");let e=document.getElementById("balance-amount");try{let t=await fetch(`${p}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),n=await t.json();return h("function fetchBalance - Pobieranie danych salda zakończone:",n),e&&(e.textContent=`${n.balance.toFixed(2)} EUR`),n.balance}catch(t){return console.error("function fetchBalance - Błąd podczas pobierania salda:",t),e&&(e.textContent="Błąd podczas ładowania salda"),null}}async function y(){h("function setupBalance - Inicjalizacja salda");let e=document.getElementById("balance-amount"),t=document.getElementById("update-balance-btn"),n=document.getElementById("show-reports-btn"),r=document.querySelector("#balance-form"),i=r.querySelector("#confirm-balance"),a=r.querySelector("#cancel-balance"),s=r.querySelector("#new-balance");if(!e||!t||!n){console.error("function setupBalance - Nie znaleziono niezbędnych elementów DOM");return}async function o(t){h("function updateBalance - Aktualizacja salda:",t);try{let n=await fetch(`${p}/users/balance`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({balance:parseFloat(t)})}),r=await n.json();h("function updateBalance - Saldo zaktualizowane:",r),e.textContent=`${r.balance.toFixed(2)} EUR`,0===r.balance&&(h("function updateBalance - Wyświetlanie modalu, ponieważ saldo wynosi 0"),b())}catch(e){console.error("function updateBalance - Błąd podczas aktualizacji salda:",e),g({message:"function updateBalance - Wystąpił błąd podczas aktualizacji salda",confirmLabel:"OK",confirmAction:()=>{}})}}return r.style.display="none",t.addEventListener("click",()=>{h("updateBalanceBtn - Kliknięto przycisk aktualizacji salda"),r.style.display="block"}),i.addEventListener("click",async()=>{let e=s.value;if(e){var t,n;h("confirmBalanceBtn - Nowe saldo potwierdzone:",e),t="Czy na pewno chcesz zaktualizować saldo?",n=async()=>{await o(e),r.style.display="none"},h("function showConfirmationModal - Wyświetlanie modalu potwierdzenia z wiadomością:",t),g({message:t,confirmLabel:"YES",cancelLabel:"NO",confirmAction:()=>{h("function showConfirmationModal [showModal] - Akcja potwierdzona"),n()},cancelAction:()=>{h("function showConfirmationModal [showModal] - Akcja anulowana")}})}}),a.addEventListener("click",()=>{h("cancelBalanceBtn - Aktualizacja salda została anulowana"),r.style.display="none"}),n.addEventListener("click",e=>{e.preventDefault(),h("showReportsBtn - Przejście do sekcji raportów"),h("navigateToReports - Nawigacja do sekcji raportów")}),await v(),{updateBalance:o,refreshBalance:v}}let w=!1;function b(){w||(h("function showZeroBalanceModal - Wyświetlanie modalu dla zerowego salda"),g({message:"Witaj! Aby rozpocząć, wprowadź aktualne saldo swojego konta! Nie możesz wydawać pieniędzy, dopóki ich nie masz :)",confirmLabel:"OK",confirmAction:()=>{w=!1,m()}}),w=!0)}async function I(){0===await v()&&b()}const _={expense:{type:"expense",categories:["Transport","Products","Health","Alcohol","Entertainment","Housing","Technique","Communication","Hobbies","Education","Other"]},income:{type:"income",categories:["Salary","Additional income"]}};let E=null;const T=e=>{var t;let n=_[e];E=n.type,t=n.categories,document.querySelector("#transaction-category").innerHTML='<option disabled selected value="">Product category</option>'+t.map(e=>{let t=e.toLowerCase().split(" ").join("_");return`<option value="${t}">${e}</option>`}).join("")},k=()=>`
  <div class="summary-list-container">
    <h2 class="summary-title">Summary</h2>
    <ul id="summary-list" class="summary-list">
    </ul>
  </div>
  `;async function S(e){try{let t=await fetch(`${p}/transactions?type=${e}`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});if(!t.ok)throw Error("Failed to fetch transactions");let n=await t.json();!function(e){h("renderSummaryList",e);let t=document.getElementById("summary-list");if(!t){console.error("renderSummaryList - Nie znaleziono elementu #summary-list");return}let n=["January","February","March","April","May","June","July","August","September","October","November","December"],r={};e.forEach(e=>{let t=new Date(e.date),i=n[t.getMonth()],a=t.getFullYear(),s=`${a} ${i}`,o=e.amount;r[s]=(r[s]||0)+o});let i=Object.keys(r).sort((e,t)=>{let[n,r]=e.split(" "),[i,a]=t.split(" "),s=new Date(`${r} 1, ${n}`);return new Date(`${a} 1, ${i}`)-s});t.innerHTML=i.map(e=>`
        <li>
          <span class="month">${e}</span>
          <span class="amount">${r[e].toFixed(2)}</span>
        </li>
      `).join("")}(n)}catch(n){console.error(`SummaryList - B\u{142}\u{105}d podczas pobierania transakcji typu ${e}:`,n);let t=document.getElementById("summary-list");t&&(t.innerHTML="<li>Error loading summary</li>")}}async function C(e,t){let n=document.getElementById("transaction-list");async function r(){h(`TransactionList - Pobieranie transakcji typu ${t}`);try{let e=await fetch(`${p}/transactions?type=${t}`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),r=await e.json();h(`TransactionList - Pobrano transakcje typu ${t}:`,r),h(`TransactionList - Renderowanie transakcji typu ${t}`),n.innerHTML=r.map(e=>`
            <li data-id="${e._id}">
              <div class="transaction-info">
                <div class="transaction-details">
                  <span class="date">${function(e){let t=new Date(e),n=String(t.getDate()).padStart(2,"0"),r=String(t.getMonth()+1).padStart(2,"0"),i=t.getFullYear();return`${n}.${r}.${i}`}(e.date)}</span>
                  <span class="description">${e.description}</span>
                  <span class="category">${function(e,t){for(let n of _[e]?.categories||[])if(n.toLowerCase().split(" ").join("_")===t)return n;return t}(e.type,e.category)}</span>
                </div>
              </div>
              <span class="transaction-amount ${e.type}">${e.amount.toFixed(2)} EUR</span>
              <button class="delete-transaction btn-icon">\u{1F5D1}\u{FE0F}</button>
            </li>
          `).join("")}catch(e){console.error(`TransactionList - B\u{142}\u{105}d podczas pobierania transakcji typu ${t}:`,e),n.innerHTML="<li>Error loading transactions</li>"}}return n.addEventListener("click",async n=>{if(n.target.classList.contains("delete-transaction")){let r=n.target.closest("li").dataset.id;h(`TransactionList - Pr\xf3ba usuni\u{119}cia transakcji typu ${t} o ID:`,r),g({message:"Are you sure you want to delete this transaction?",confirmLabel:"YES",cancelLabel:"NO",confirmAction:async()=>{try{let i=await fetch(`${p}/transactions/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}});if(!i.ok)throw Error("Error while deleting transaction");let a=await i.json();n.target.closest("li").remove(),h(`TransactionList - Transakcja typu ${t} usuni\u{119}ta pomy\u{15B}lnie`),alert(`${t.charAt(0).toUpperCase()+t.slice(1)} transaction deleted successfully`),e&&e(a.newBalance),S(t)}catch(e){console.error(`TransactionList - B\u{142}\u{105}d podczas usuwania transakcji typu ${t}:`,e),alert(`An error occurred while deleting the ${t} transaction`)}},cancelAction:()=>{}})}}),await r(),{refreshTransactions:r}}var A={};async function O(){h("HomePage - Inicjalizacja strony głównej"),e=await y(),h("HomePage - Konfiguracja zakładek"),document.querySelectorAll(".tab-button").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");h(`HomePage - Klikni\u{119}to zak\u{142}adk\u{119} ${t}`),R(t)})}),document.getElementById("arrow-left").addEventListener("click",()=>{R("income"===document.querySelector(".tab-button.active").getAttribute("data-tab")?"expense":"income")}),document.getElementById("arrow-right").addEventListener("click",()=>{R("expense"===document.querySelector(".tab-button.active").getAttribute("data-tab")?"income":"expense")}),function(e){h("function setupTransactionForm - Inicjalizacja formularza transakcji");let t=document.getElementById("transaction-form"),n=t.querySelector("#transaction-date");n.value=new Date().toISOString().slice(0,10);let r=t.querySelector("#transaction-amount");r.addEventListener("input",()=>{let e=parseFloat(r.value);Number.isNaN(e)||e<=0?r.setCustomValidity("Amount must be greater than zero."):r.setCustomValidity("")});let i=t.querySelector("#transaction-description");i.addEventListener("input",()=>{""===i.value.trim()?i.setCustomValidity("Description is required."):i.setCustomValidity("")});let a=t.querySelector("#transaction-category");a.addEventListener("change",()=>{""===a.value?a.setCustomValidity("Please select a category."):a.setCustomValidity("")}),n.addEventListener("change",()=>{n.value?n.setCustomValidity(""):n.setCustomValidity("Please select a date.")}),t.addEventListener("submit",async s=>{if(s.preventDefault(),!t.checkValidity()){t.reportValidity();return}let o=n.value,l=a.value,c=parseFloat(r.value),u=i.value.trim();h("function setupTransactionForm - Dodawanie nowej transakcji:",{type:E,date:o,category:l,amount:c,description:u});try{let r=await fetch(`${p}/transactions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("userToken")}`},body:JSON.stringify({type:E,date:o,category:l,amount:c,description:u})});if(!r.ok)throw Error("Error while adding transaction");let i=await r.json();h("function setupTransactionForm - Transakcja dodana pomyślnie:",i),g({message:"Transaction added successfully",confirmLabel:"OK",confirmAction:async()=>{m(),t.reset(),n.value=new Date().toISOString().slice(0,10),e&&await e(i.transaction,i.newBalance),await I()}})}catch(e){console.error("function setupTransactionForm - Błąd podczas dodawania transakcji:",e),g({message:"An error occurred while adding the transaction.",confirmLabel:"OK",confirmAction:()=>{m()}})}})}(async(t,n)=>{h("HomePage - Dodano transakcję, nowy bilans:",n),await e.updateBalance(n);let r=document.querySelector(".tab-button.active").getAttribute("data-tab");await P(r)}),0===await N()&&b(),function(e){let t=document.getElementById("logout-btn");t&&(h("function setupLogoutButton - Inicjalizacja przycisku wylogowania"),t.addEventListener("click",e))}(()=>{h("HomePage - Wyświetlanie modalu wylogowania"),h("HomePage - Wyświetlanie modalu wylogowania"),g({message:"Are you sure you want to log out?",confirmLabel:"YES",cancelLabel:"NO",confirmAction:f,cancelAction:()=>{}})}),await P("expense"),await L()}function R(e){document.querySelectorAll(".tab-button").forEach(e=>e.classList.remove("active")),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),P(e)}async function P(t){h(`HomePage - Aktualizacja listy transakcji dla ${t}`);let n=document.getElementById("transaction-list-container"),r=document.querySelector("#summary-list-container");n.innerHTML=function({type:e}){return h(`TransactionList - Renderowanie listy transakcji dla ${e}`),`
    <div class="transaction-container">
      <h3>List of ${"income"===e?"Income":"Expenses"}</h3>
      <div class="transaction-list-header">
        <div class="transaction-info">
          <div class="transaction-details">
            <span class="date">DATE</span>
            <span class="description">DESCRIPTION</span>
            <span class="category">CATEGORY</span>
          </div>
        </div>
        <span class="transaction-amount">SUM</span>
        <span class="delete-placeholder"></span>
      </div>
      <ul id="transaction-list" class="transaction-list"></ul>
    </div>
  `}({type:t}),r.innerHTML=k(),await C(async n=>{h(`HomePage - Zaktualizowano list\u{119} ${t}, nowy bilans:`,n),await e.updateBalance(n)},t),S(t),T(t)}async function L(){try{let e=await fetch(`${p}/users/current`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),t=await e.json();document.getElementById("user-avatar").src=t.avatarURL,document.getElementById("user-name").textContent=t.name}catch(e){console.error("HomePage - Błąd podczas ładowania informacji o użytkowniku:",e)}}async function N(){h("HomePage - Pobieranie aktualnego bilansu");try{let e=await fetch(`${p}/users/balance`,{headers:{Authorization:`Bearer ${localStorage.getItem("userToken")}`}}),t=await e.json();return h("HomePage - Pobrano aktualny bilans:",t.balance),t.balance}catch(e){return console.error("HomePage - Błąd podczas pobierania bilansu:",e),null}}A=new URL("logo-small.856212bd.svg",import.meta.url).toString();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var D={},M=D={};function U(){throw Error("setTimeout has not been defined")}function j(){throw Error("clearTimeout has not been defined")}function z(e){if(o===setTimeout)return setTimeout(e,0);if((o===U||!o)&&setTimeout)return o=setTimeout,setTimeout(e,0);try{return o(e,0)}catch(t){try{return o.call(null,e,0)}catch(t){return o.call(this,e,0)}}}!function(){try{o="function"==typeof setTimeout?setTimeout:U}catch(e){o=U}try{l="function"==typeof clearTimeout?clearTimeout:j}catch(e){l=j}}();var B=[],x=!1,$=-1;function F(){x&&c&&(x=!1,c.length?B=c.concat(B):$=-1,B.length&&V())}function V(){if(!x){var e=z(F);x=!0;for(var t=B.length;t;){for(c=B,B=[];++$<t;)c&&c[$].run();$=-1,t=B.length}c=null,x=!1,function(e){if(l===clearTimeout)return clearTimeout(e);if((l===j||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(e);try{l(e)}catch(t){try{return l.call(null,e)}catch(t){return l.call(this,e)}}}(e)}}function H(e,t){this.fun=e,this.array=t}function W(){}M.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];B.push(new H(e,t)),1!==B.length||x||z(V)},H.prototype.run=function(){this.fun.apply(null,this.array)},M.title="browser",M.browser=!0,M.env={},M.argv=[],M.version="",M.versions={},M.on=W,M.addListener=W,M.once=W,M.off=W,M.removeListener=W,M.removeAllListeners=W,M.emit=W,M.prependListener=W,M.prependOnceListener=W,M.listeners=function(e){return[]},M.binding=function(e){throw Error("process.binding is not supported")},M.cwd=function(){return"/"},M.chdir=function(e){throw Error("process.chdir is not supported")},M.umask=function(){return 0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:(i<2048?t[n++]=i>>6|192:((64512&i)==55296&&r+1<e.length&&(64512&e.charCodeAt(r+1))==56320?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128):t[n++]=i>>12|224,t[n++]=i>>6&63|128),t[n++]=63&i|128)}return t},K=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let a=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&a)}else if(i>239&&i<365){let a=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(a>>10)),t[r++]=String.fromCharCode(56320+(1023&a))}else{let a=e[n++],s=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&a)<<6|63&s)}}return t.join("")},G={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let t=0;t<e.length;t+=3){let i=e[t],a=t+1<e.length,s=a?e[t+1]:0,o=t+2<e.length,l=o?e[t+2]:0,c=i>>2,u=(3&i)<<4|s>>4,d=(15&s)<<2|l>>6,h=63&l;o||(h=64,a||(d=64)),r.push(n[c],n[u],n[d],n[h])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(q(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):K(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let t=0;t<e.length;){let i=n[e.charAt(t++)],a=t<e.length?n[e.charAt(t)]:0,s=++t<e.length?n[e.charAt(t)]:64,o=++t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==a||null==s||null==o)throw new J;let l=i<<2|a>>4;if(r.push(l),64!==s){let e=a<<4&240|s>>2;if(r.push(e),64!==o){let e=s<<6&192|o;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class J extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Y=function(e){let t=q(e);return G.encodeByteArray(t,!0)},X=function(e){return Y(e).replace(/\./g,"")},Z=function(e){try{return G.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null},Q=()=>/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==d)return d;throw Error("Unable to locate global object.")})().__FIREBASE_DEFAULTS__,ee=()=>{if(void 0===D||void 0===D.env)return;let e=void 0;if(e)return JSON.parse(e)},et=()=>{let e;if("undefined"==typeof document)return;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}let t=e&&Z(e[1]);return t&&JSON.parse(t)},en=()=>{try{return Q()||ee()||et()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},er=e=>{var t,n;return null===(n=null===(t=en())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},ei=()=>{var e;return null===(e=en())||void 0===e?void 0:e.config},ea=e=>{var t;return null===(t=en())||void 0===t?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}class el extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,el.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ec.prototype.create)}}class ec{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?i.replace(eu,(e,t)=>{let r=n[t];return null!=r?String(r):`<${t}?>`}):"Error",s=`${this.serviceName}: ${a} (${r}).`;return new el(r,s,n)}}const eu=/\{\$([^}]+)}/g;function ed(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let n=e[i],a=t[i];if(eh(n)&&eh(a)){if(!ed(n,a))return!1}else if(n!==a)return!1}for(let e of r)if(!n.includes(e))return!1;return!0}function eh(e){return null!==e&&"object"==typeof e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ep(e){let t=[];for(let[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function ef(e){let t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){let[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function em(e){let t=e.indexOf("?");if(!t)return"";let n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class eg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw Error("Missing Observer.");void 0===(r=!function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?{next:e,error:t,complete:n}:e).next&&(r.next=ev),void 0===r.error&&(r.error=ev),void 0===r.complete&&(r.complete=ev);let i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ev(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(e){return e&&e._delegate?e._delegate:e}class ew{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eb="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let e=new es;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{let n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if("EAGER"===e.instantiationMode)try{this.getOrInitializeService({instanceIdentifier:eb})}catch(e){}for(let[e,t]of this.instancesDeferred.entries()){let n=this.normalizeInstanceIdentifier(e);try{let e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e=eb){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=eb){return this.instances.has(e)}getOptions(e=eb){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[e,t]of this.instancesDeferred.entries())n===this.normalizeInstanceIdentifier(e)&&t.resolve(r);return r}onInit(e,t){var n;let r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);let a=this.instances.get(r);return a&&e(a,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let r of n)try{r(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:e===eb?void 0:e,options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}return n||null}normalizeInstanceIdentifier(e=eb){return this.component?this.component.multipleInstances?e:eb:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new eI(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eE=[];(a=u||(u={}))[a.DEBUG=0]="DEBUG",a[a.VERBOSE=1]="VERBOSE",a[a.INFO=2]="INFO",a[a.WARN=3]="WARN",a[a.ERROR=4]="ERROR",a[a.SILENT=5]="SILENT";const eT={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},ek=u.INFO,eS={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},eC=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=eS[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class eA{constructor(e){this.name=e,this._logLevel=ek,this._logHandler=eC,this._userLogHandler=null,eE.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?eT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}}const eO=(e,t)=>t.some(t=>e instanceof t),eR=new WeakMap,eP=new WeakMap,eL=new WeakMap,eN=new WeakMap,eD=new WeakMap;let eM={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return eP.get(e);if("objectStoreNames"===t)return e.objectStoreNames||eL.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return eU(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function eU(e){var r;if(e instanceof IDBRequest)return function(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("success",i),e.removeEventListener("error",a)},i=()=>{t(eU(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener("success",i),e.addEventListener("error",a)});return t.then(t=>{t instanceof IDBCursor&&eR.set(t,e)}).catch(()=>{}),eD.set(t,e),t}(e);if(eN.has(e))return eN.get(e);let i="function"==typeof(r=e)?r!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(r)?function(...e){return r.apply(ej(this),e),eU(eR.get(this))}:function(...e){return eU(r.apply(ej(this),e))}:function(e,...t){let n=r.call(ej(this),e,...t);return eL.set(n,e.sort?e.sort():[e]),eU(n)}:(r instanceof IDBTransaction&&function(e){if(eP.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",a),e.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",i),e.addEventListener("error",a),e.addEventListener("abort",a)});eP.set(e,t)}(r),eO(r,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])))?new Proxy(r,eM):r;return i!==e&&(eN.set(e,i),eD.set(i,e)),i}const ej=e=>eD.get(e),ez=["get","getKey","getAll","getAllKeys","count"],eB=["put","add","delete","clear"],ex=new Map;function e$(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&"string"==typeof t))return;if(ex.get(t))return ex.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=eB.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||ez.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?"readwrite":"readonly"),s=a.store;return r&&(s=s.index(t.shift())),(await Promise.all([s[n](...t),i&&a.done]))[0]};return ex.set(t,a),a}eM={...r=eM,get:(e,t,n)=>e$(e,t)||r.get(e,t,n),has:(e,t)=>!!e$(e,t)||r.has(e,t)};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eF{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(!function(e){let t=e.getComponent();return(null==t?void 0:t.type)==="VERSION"}(e))return null;{let t=e.getImmediate();return`${t.library}/${t.version}`}}).filter(e=>e).join(" ")}}const eV="@firebase/app",eH="0.10.10",eW=new eA("@firebase/app"),eq="[DEFAULT]",eK={[eV]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","@firebase/vertexai-preview":"fire-vertex","fire-js":"fire-js",firebase:"fire-js-all"},eG=new Map,eJ=new Map,eY=new Map;function eX(e,t){try{e.container.addComponent(t)}catch(n){eW.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function eZ(e){let t=e.name;if(eY.has(t))return eW.debug(`There were multiple attempts to register component ${t}.`),!1;for(let n of(eY.set(t,e),eG.values()))eX(n,e);for(let t of eJ.values())eX(t,e);return!0}function eQ(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function e0(e){return void 0!==e.settings}const e1=new ec("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new ew("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw e1.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e3="10.13.1";function e6(e,t={}){let n=e;"object"!=typeof t&&(t={name:t});let r=Object.assign({name:eq,automaticDataCollectionEnabled:!1},t),i=r.name;if("string"!=typeof i||!i)throw e1.create("bad-app-name",{appName:String(i)});if(n||(n=ei()),!n)throw e1.create("no-options");let a=eG.get(i);if(a){if(ed(n,a.options)&&ed(r,a.config))return a;throw e1.create("duplicate-app",{appName:i})}let s=new e_(i);for(let e of eY.values())s.addComponent(e);let o=new e2(n,r,s);return eG.set(i,o),o}function e4(e,t,n){var r;let i=null!==(r=eK[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);let a=i.match(/\s|\//),s=t.match(/\s|\//);if(a||s){let e=[`Unable to register library "${i}" with version "${t}":`];a&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),eW.warn(e.join(" "));return}eZ(new ew(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}const e5="firebase-heartbeat-store";let e8=null;function e9(){return e8||(e8=(function(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let s=indexedDB.open(e,1),o=eU(s);return r&&s.addEventListener("upgradeneeded",e=>{r(eU(s.result),e.oldVersion,e.newVersion,eU(s.transaction),e)}),n&&s.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),o.then(e=>{a&&e.addEventListener("close",()=>a()),i&&e.addEventListener("versionchange",e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),o})("firebase-heartbeat-database",0,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(e5)}catch(e){console.warn(e)}}}).catch(e=>{throw e1.create("idb-open",{originalErrorMessage:e.message})})),e8}async function e7(e){try{let t=(await e9()).transaction(e5),n=await t.objectStore(e5).get(tt(e));return await t.done,n}catch(e){if(e instanceof el)eW.warn(e.message);else{let t=e1.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});eW.warn(t.message)}}}async function te(e,t){try{let n=(await e9()).transaction(e5,"readwrite"),r=n.objectStore(e5);await r.put(t,tt(e)),await n.done}catch(e){if(e instanceof el)eW.warn(e.message);else{let t=e1.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});eW.warn(t.message)}}}function tt(e){return`${e.name}!${e.options.appId}`}class tn{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ti(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{let n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=tr();if((null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,(null===(t=this._heartbeatsCache)||void 0===t?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;return this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{let t=new Date(e.date).valueOf();return Date.now()-t<=2592e6}),this._storage.overwrite(this._heartbeatsCache)}catch(e){eW.warn(e)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,(null===(e=this._heartbeatsCache)||void 0===e?void 0:e.heartbeats)==null||0===this._heartbeatsCache.heartbeats.length)return"";let t=tr(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){let n=[],r=e.slice();for(let i of e){let e=n.find(e=>e.agent===i.agent);if(e){if(e.dates.push(i.date),ta(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),ta(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=X(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return eW.warn(e),""}}}function tr(){return new Date().toISOString().substring(0,10)}class ti{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}).then(()=>!0).catch(()=>!1)}async read(){if(!await this._canUseIndexedDBPromise)return{heartbeats:[]};{let e=await e7(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return te(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){let n=await this.read();return te(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function ta(e){return X(JSON.stringify({version:2,heartbeats:e})).length}function ts(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)0>t.indexOf(r[i])&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function to(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}eZ(new ew("platform-logger",e=>new eF(e),"PRIVATE")),eZ(new ew("heartbeat",e=>new tn(e),"PRIVATE")),e4(eV,eH,""),e4(eV,eH,"esm2017"),e4("fire-js",""),/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */e4("firebase","10.13.1","app"),"function"==typeof SuppressedError&&SuppressedError;const tl=new ec("auth","Firebase",to()),tc=new eA("@firebase/auth");function tu(e,...t){tc.logLevel<=u.ERROR&&tc.error(`Auth (${e3}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function td(e,...t){throw tm(e,...t)}function th(e,...t){return tm(e,...t)}function tp(e,t,n){return new ec("auth","Firebase",Object.assign(Object.assign({},to()),{[t]:n})).create(t,{appName:e.name})}function tf(e){return tp(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function tm(e,...t){if("string"!=typeof e){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return tl.create(e,...t)}function tg(e,t,...n){if(!e)throw tm(t,...n)}function tv(e){let t="INTERNAL ASSERTION FAILED: "+e;throw tu(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ty(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function tw(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e,t){var n;this.shortDelay=e,this.longDelay=t,n="Short delay should be less than long delay!",t>e||tv(n),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(eo())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&("http:"===tw()||"https:"===tw()||function(){let e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(e,t){var n,r;n=e.emulator,r="Emulator should always be set here",n||tv(r);let{url:i}=e.emulator;return t?`${i}${t.startsWith("/")?t.slice(1):t}`:i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void tv("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void tv("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void tv("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},tT=new tb(3e4,6e4);function tk(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function tS(e,t,n,r,i={}){return tC(e,i,async()=>{let i={},a={};r&&("GET"===t?a=r:i={body:JSON.stringify(r)});let s=ep(Object.assign({key:e.config.apiKey},a)).slice(1),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/json",e.languageCode&&(o["X-Firebase-Locale"]=e.languageCode),t_.fetch()(tO(e,e.config.apiHost,n,s),Object.assign({method:t,headers:o,referrerPolicy:"no-referrer"},i))})}async function tC(e,t,n){e._canInitEmulator=!1;let r=Object.assign(Object.assign({},tE),t);try{let t=new tR(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let a=await i.json();if("needConfirmation"in a)throw tP(e,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{let[t,n]=(i.ok?a.errorMessage:a.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw tP(e,"credential-already-in-use",a);if("EMAIL_EXISTS"===t)throw tP(e,"email-already-in-use",a);if("USER_DISABLED"===t)throw tP(e,"user-disabled",a);let s=r[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(n)throw tp(e,s,n);td(e,s)}}catch(t){if(t instanceof el)throw t;td(e,"network-request-failed",{message:String(t)})}}async function tA(e,t,n,r,i={}){let a=await tS(e,t,n,r,i);return"mfaPendingCredential"in a&&td(e,"multi-factor-auth-required",{_serverResponse:a}),a}function tO(e,t,n,r){let i=`${t}${n}?${r}`;return e.config.emulator?tI(e.config,i):`${e.config.apiScheme}://${i}`}class tR{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(th(this.auth,"network-request-failed")),tT.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function tP(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=th(e,t,r);return i.customData._tokenResponse=n,i}function tL(e){return void 0!==e&&void 0!==e.enterprise}class tN{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}}async function tD(e,t){return tS(e,"GET","/v2/recaptchaConfig",tk(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tM(e,t){return tS(e,"POST","/v1/accounts:delete",t)}async function tU(e,t){return tS(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tj(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function tz(e,t=!1){let n=ey(e),r=await n.getIdToken(t),i=tx(r);tg(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");let a="object"==typeof i.firebase?i.firebase:void 0,s=null==a?void 0:a.sign_in_provider;return{claims:i,token:r,authTime:tj(tB(i.auth_time)),issuedAtTime:tj(tB(i.iat)),expirationTime:tj(tB(i.exp)),signInProvider:s||null,signInSecondFactor:(null==a?void 0:a.sign_in_second_factor)||null}}function tB(e){return 1e3*Number(e)}function tx(e){let[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return tu("JWT malformed, contained fewer than 3 sections"),null;try{let e=Z(n);if(!e)return tu("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return tu("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function t$(e){let t=tx(e);return tg(t,"internal-error"),tg(void 0!==t.exp,"internal-error"),tg(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tF(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof el&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(!e)return this.errorBackoff=3e4,Math.max(0,(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tH{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=tj(this.lastLoginAt),this.creationTime=tj(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tW(e){var t;let n=e.auth,r=await e.getIdToken(),i=await tF(e,tU(n,{idToken:r}));tg(null==i?void 0:i.users.length,n,"internal-error");let a=i.users[0];e._notifyReloadListener(a);let s=(null===(t=a.providerUserInfo)||void 0===t?void 0:t.length)?tK(a.providerUserInfo):[],o=[...e.providerData.filter(e=>!s.some(t=>t.providerId===e.providerId)),...s],l=e.isAnonymous,c=!(e.email&&a.passwordHash)&&!(null==o?void 0:o.length);Object.assign(e,{uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:o,metadata:new tH(a.createdAt,a.lastLoginAt),isAnonymous:!!l&&c})}async function tq(e){let t=ey(e);await tW(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function tK(e){return e.map(e=>{var{providerId:t}=e,n=ts(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tG(e,t){let n=await tC(e,{},async()=>{let n=ep({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,a=tO(e,r,"/v1/token",`key=${i}`),s=await e._getAdditionalHeaders();return s["Content-Type"]="application/x-www-form-urlencoded",t_.fetch()(a,{method:"POST",headers:s,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function tJ(e,t){return tS(e,"POST","/v2/accounts:revokeToken",tk(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){tg(e.idToken,"internal-error"),tg(void 0!==e.idToken,"internal-error"),tg(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):t$(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){tg(0!==e.length,"internal-error");let t=t$(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(tg(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await tG(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){let{refreshToken:n,accessToken:r,expirationTime:i}=t,a=new tY;return n&&(tg("string"==typeof n,"internal-error",{appName:e}),a.refreshToken=n),r&&(tg("string"==typeof r,"internal-error",{appName:e}),a.accessToken=r),i&&(tg("number"==typeof i,"internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tY,this.toJSON())}_performRefresh(){return tv("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tX(e,t){tg("string"==typeof e||void 0===e,"internal-error",{appName:t})}class tZ{constructor(e){var{uid:t,auth:n,stsTokenManager:r}=e,i=ts(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new tV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new tH(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await tF(this,this.stsTokenManager.getToken(this.auth,e));return tg(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return tz(this,e)}reload(){return tq(this)}_assign(e){this!==e&&(tg(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new tZ(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){tg(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await tW(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(e0(this.auth.app))return Promise.reject(tf(this.auth));let e=await this.getIdToken();return await tF(this,tM(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,r,i,a,s,o,l,c;let u=null!==(n=t.displayName)&&void 0!==n?n:void 0,d=null!==(r=t.email)&&void 0!==r?r:void 0,h=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,p=null!==(a=t.photoURL)&&void 0!==a?a:void 0,f=null!==(s=t.tenantId)&&void 0!==s?s:void 0,m=null!==(o=t._redirectEventId)&&void 0!==o?o:void 0,g=null!==(l=t.createdAt)&&void 0!==l?l:void 0,v=null!==(c=t.lastLoginAt)&&void 0!==c?c:void 0,{uid:y,emailVerified:w,isAnonymous:b,providerData:I,stsTokenManager:_}=t;tg(y&&_,e,"internal-error");let E=tY.fromJSON(this.name,_);tg("string"==typeof y,e,"internal-error"),tX(u,e.name),tX(d,e.name),tg("boolean"==typeof w,e,"internal-error"),tg("boolean"==typeof b,e,"internal-error"),tX(h,e.name),tX(p,e.name),tX(f,e.name),tX(m,e.name),tX(g,e.name),tX(v,e.name);let T=new tZ({uid:y,auth:e,email:d,emailVerified:w,displayName:u,isAnonymous:b,photoURL:p,phoneNumber:h,tenantId:f,stsTokenManager:E,createdAt:g,lastLoginAt:v});return I&&Array.isArray(I)&&(T.providerData=I.map(e=>Object.assign({},e))),m&&(T._redirectEventId=m),T}static async _fromIdTokenResponse(e,t,n=!1){let r=new tY;r.updateFromServerResponse(t);let i=new tZ({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await tW(i),i}static async _fromGetAccountInfoResponse(e,t,n){let r=t.users[0];tg(void 0!==r.localId,"internal-error");let i=void 0!==r.providerUserInfo?tK(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(null==i?void 0:i.length),s=new tY;s.updateFromIdToken(n);let o=new tZ({uid:r.localId,auth:e,stsTokenManager:s,isAnonymous:a});return Object.assign(o,{uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new tH(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(null==i?void 0:i.length)}),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tQ=new Map;function t0(e){var t,n;t="Expected a class definition",e instanceof Function||tv(t);let r=tQ.get(e);return r?(n="Instance stored in cache mismatched with class",r instanceof e||tv(n)):(r=new e,tQ.set(e,r)),r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t1{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t2(e,t,n){return`firebase:${e}:${t}:${n}`}t1.type="NONE";class t3{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=t2(this.userKey,r.apiKey,i),this.fullPersistenceKey=t2("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?tZ._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new t3(t0(t1),e,n);let r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),i=r[0]||t0(t1),a=t2(n,e.config.apiKey,e.name),s=null;for(let n of t)try{let t=await n._get(a);if(t){let r=tZ._fromJSON(e,t);n!==i&&(s=r),i=n;break}}catch(e){}let o=r.filter(e=>e._shouldAllowMigration);return i._shouldAllowMigration&&o.length&&(i=o[0],s&&await i._set(a,s.toJSON()),await Promise.all(t.map(async e=>{if(e!==i)try{await e._remove(a)}catch(e){}}))),new t3(i,e,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t6(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";{if(t9(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(t4(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(ne(t))return"Blackberry";if(nt(t))return"Webos";if(t5(t))return"Safari";if((t.includes("chrome/")||t8(t))&&!t.includes("edge/"))return"Chrome";if(t7(t))return"Android";let n=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==n?void 0:n.length)===2)return n[1]}return"Other"}function t4(e=eo()){return/firefox\//i.test(e)}function t5(e=eo()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function t8(e=eo()){return/crios\//i.test(e)}function t9(e=eo()){return/iemobile/i.test(e)}function t7(e=eo()){return/android/i.test(e)}function ne(e=eo()){return/blackberry/i.test(e)}function nt(e=eo()){return/webos/i.test(e)}function nn(e=eo()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function nr(e=eo()){return nn(e)||t7(e)||nt(e)||ne(e)||/windows phone/i.test(e)||t9(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(e,t=[]){let n;switch(e){case"Browser":n=t6(eo());break;case"Worker":n=`${t6(eo())}-${e}`;break;default:n=e}let r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${e3}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{let r=e(t);n(r)}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ns(e,t={}){return tS(e,"GET","/v2/passwordPolicy",tk(e,t))}class no{constructor(e){var t,n,r,i;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=a.minPasswordLength)&&void 0!==t?t:6,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),void 0!==a.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),void 0!==a.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),void 0!==a.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),void 0!==a.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(n=e.allowedNonAlphanumericCharacters)||void 0===n?void 0:n.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(i=e.forceUpgradeOnSignin)&&void 0!==i&&i,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,r,i,a,s;let o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=null===(t=o.meetsMinPasswordLength)||void 0===t||t),o.isValid&&(o.isValid=null===(n=o.meetsMaxPasswordLength)||void 0===n||n),o.isValid&&(o.isValid=null===(r=o.containsLowercaseLetter)||void 0===r||r),o.isValid&&(o.isValid=null===(i=o.containsUppercaseLetter)||void 0===i||i),o.isValid&&(o.isValid=null===(a=o.containsNumericCharacter)||void 0===a||a),o.isValid&&(o.isValid=null===(s=o.containsNonAlphanumericCharacter)||void 0===s||s),o}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new nc(this),this.idTokenSubscription=new nc(this),this.beforeStateQueue=new na(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=tl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=t0(t)),this._initializationPromise=this.queue(async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await t3.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await tU(this,{idToken:e}),n=await tZ._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(e0(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let n=await this.assertedPersistence.getCurrentUser(),r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,a=null==r?void 0:r._redirectEventId,s=await this.tryRedirectSignIn(e);(!n||n===a)&&(null==s?void 0:s.user)&&(r=s.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(tg(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await tW(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(e0(this.app))return Promise.reject(tf(this));let t=e?ey(e):null;return t&&tg(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&tg(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return e0(this.app)?Promise.reject(tf(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return e0(this.app)?Promise.reject(tf(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(t0(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new no(await ns(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ec("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await tJ(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&t0(e)||this._popupRedirectResolver;tg(t,this,"argument-error"),this.redirectPersistenceManager=await t3.create(this,[t0(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i="function"==typeof t?t:t.next.bind(t),a=!1,s=this._isInitialized?Promise.resolve():this._initializationPromise;if(tg(s,this,"internal-error"),s.then(()=>{a||i(this.currentUser)}),"function"==typeof t){let i=e.addObserver(t,n,r);return()=>{a=!0,i()}}{let n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return tg(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ni(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){tc.logLevel<=u.WARN&&tc.warn(`Auth (${e3}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}class nc{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){let n=new eg(e,void 0);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return tg(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nu={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function nd(e){return`__${e}${Math.floor(1e6*Math.random())}`}class nh{constructor(e){this.type="recaptcha-enterprise",this.auth=ey(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{tD(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0===r.recaptchaKey)n(Error("recaptcha Enterprise site key undefined"));else{let n=new tN(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function r(t,n,r){let i=window.grecaptcha;tL(i)?i.enterprise.ready(()=>{i.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n("NO_RECAPTCHA")})}):r(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,i)=>{n(this.auth).then(n=>{if(!t&&tL(window.grecaptcha))r(n,e,i);else{var a;if("undefined"==typeof window){i(Error("RecaptchaVerifier is only supported in browser"));return}let t=nu.recaptchaEnterpriseScript;0!==t.length&&(t+=n),(a=t,nu.loadJS(a)).then(()=>{r(n,e,i)}).catch(e=>{i(e)})}}).catch(e=>{i(e)})})}}async function np(e,t,n,r=!1){let i;let a=new nh(e);try{i=await a.verify(n)}catch(e){i=await a.verify(n,!0)}let s=Object.assign({},t);return r?Object.assign(s,{captchaResp:i}):Object.assign(s,{captchaResponse:i}),Object.assign(s,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(s,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),s}async function nf(e,t,n,r){var i;if(null===(i=e._getRecaptchaConfig())||void 0===i||!i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return r(e,t).catch(async i=>{if("auth/missing-recaptcha-token"!==i.code)return Promise.reject(i);{console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let i=await np(e,t,n,"getOobCode"===n);return r(e,i)}});{let i=await np(e,t,n,"getOobCode"===n);return r(e,i)}}function nm(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function ng(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tv("not implemented")}_getIdTokenResponse(e){return tv("not implemented")}_linkToIdToken(e,t){return tv("not implemented")}_getReauthenticationResolver(e){return tv("not implemented")}}async function ny(e,t){return tS(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nw(e,t){return tA(e,"POST","/v1/accounts:signInWithPassword",tk(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nb(e,t){return tA(e,"POST","/v1/accounts:signInWithEmailLink",tk(e,t))}async function nI(e,t){return tA(e,"POST","/v1/accounts:signInWithEmailLink",tk(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_ extends nv{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new n_(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new n_(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return nf(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",nw);case"emailLink":return nb(e,{email:this._email,oobCode:this._password});default:td(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return nf(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ny);case"emailLink":return nI(e,{idToken:t,email:this._email,oobCode:this._password});default:td(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nE(e,t){return tA(e,"POST","/v1/accounts:signInWithIdp",tk(e,t))}class nT extends nv{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new nT(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):td("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r}=t,i=ts(t,["providerId","signInMethod"]);if(!n||!r)return null;let a=new nT(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){return nE(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,nE(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,nE(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ep(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nk(e,t){return tS(e,"POST","/v1/accounts:sendVerificationCode",tk(e,t))}async function nS(e,t){return tA(e,"POST","/v1/accounts:signInWithPhoneNumber",tk(e,t))}async function nC(e,t){let n=await tA(e,"POST","/v1/accounts:signInWithPhoneNumber",tk(e,t));if(n.temporaryProof)throw tP(e,"account-exists-with-different-credential",n);return n}const nA={USER_NOT_FOUND:"user-not-found"};async function nO(e,t){return tA(e,"POST","/v1/accounts:signInWithPhoneNumber",tk(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),nA)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR extends nv{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new nR({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new nR({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return nS(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return nC(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return nO(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}=e;return n||t||r||i?new nR({verificationId:t,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}class nP{constructor(e){var t,n,r,i,a,s;let o=ef(em(e)),l=null!==(t=o.apiKey)&&void 0!==t?t:null,c=null!==(n=o.oobCode)&&void 0!==n?n:null,u=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=o.mode)&&void 0!==r?r:null);tg(l&&c&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=c,this.continueUrl=null!==(i=o.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(a=o.languageCode)&&void 0!==a?a:null,this.tenantId=null!==(s=o.tenantId)&&void 0!==s?s:null}static parseLink(e){let t=function(e){let t=ef(em(e)).link,n=t?ef(em(t)).deep_link_id:null,r=ef(em(e)).deep_link_id;return(r?ef(em(r)).link:null)||r||n||t||e}(e);try{return new nP(t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nL{constructor(){this.providerId=nL.PROVIDER_ID}static credential(e,t){return n_._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=nP.parseLink(t);return tg(n,"argument-error"),n_._fromEmailAndCode(e,n.code,n.tenantId)}}nL.PROVIDER_ID="password",nL.EMAIL_PASSWORD_SIGN_IN_METHOD="password",nL.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nN{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD extends nN{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nM extends nD{constructor(){super("facebook.com")}static credential(e){return nT._fromParams({providerId:nM.PROVIDER_ID,signInMethod:nM.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nM.credentialFromTaggedObject(e)}static credentialFromError(e){return nM.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nM.credential(e.oauthAccessToken)}catch(e){return null}}}nM.FACEBOOK_SIGN_IN_METHOD="facebook.com",nM.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nU extends nD{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return nT._fromParams({providerId:nU.PROVIDER_ID,signInMethod:nU.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return nU.credentialFromTaggedObject(e)}static credentialFromError(e){return nU.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return nU.credential(t,n)}catch(e){return null}}}nU.GOOGLE_SIGN_IN_METHOD="google.com",nU.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nj extends nD{constructor(){super("github.com")}static credential(e){return nT._fromParams({providerId:nj.PROVIDER_ID,signInMethod:nj.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nj.credentialFromTaggedObject(e)}static credentialFromError(e){return nj.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nj.credential(e.oauthAccessToken)}catch(e){return null}}}nj.GITHUB_SIGN_IN_METHOD="github.com",nj.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nz extends nD{constructor(){super("twitter.com")}static credential(e,t){return nT._fromParams({providerId:nz.PROVIDER_ID,signInMethod:nz.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nz.credentialFromTaggedObject(e)}static credentialFromError(e){return nz.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return nz.credential(t,n)}catch(e){return null}}}nz.TWITTER_SIGN_IN_METHOD="twitter.com",nz.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){return new nB({user:await tZ._fromIdTokenResponse(e,n,r),providerId:nx(n),_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){return await e._updateTokensIfNecessary(n,!0),new nB({user:e,providerId:nx(n),_tokenResponse:n,operationType:t})}}function nx(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n$ extends el{constructor(e,t,n,r){var i;super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,n$.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new n$(e,t,n,r)}}function nF(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw n$._fromErrorAndOperation(e,n,t,r);throw n})}async function nV(e,t,n=!1){let r=await tF(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return nB._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nH(e,t,n=!1){let{auth:r}=e;if(e0(r.app))return Promise.reject(tf(r));let i="reauthenticate";try{let a=await tF(e,nF(r,i,t,e),n);tg(a.idToken,r,"internal-error");let s=tx(a.idToken);tg(s,r,"internal-error");let{sub:o}=s;return tg(e.uid===o,r,"user-mismatch"),nB._forOperation(e,i,a)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&td(r,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nW(e,t,n=!1){if(e0(e.app))return Promise.reject(tf(e));let r="signIn",i=await nF(e,r,t),a=await nB._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(a.user),a}new WeakMap;const nq="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nK{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(nq,"1"),this.storage.removeItem(nq),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class nG extends nK{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nr(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);(function(){let e=eo();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0})()&&10===document.documentMode&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}nG.type="LOCAL";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nJ extends nK{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}nJ.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nY{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let n=new nY(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:n,data:r}=e.data,i=this.handlersMap[n];if(!(null==i?void 0:i.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:n});let a=Array.from(i).map(async t=>t(e.origin,r)),s=await Promise.all(a.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:n,response:s})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nX(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}nY.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nZ{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r,i;let a="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!a)throw Error("connection_unavailable");return new Promise((s,o)=>{let l=nX("",20);a.port1.start();let c=setTimeout(()=>{o(Error("unsupported_event"))},n);i={messageChannel:a,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(c),r=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(r),s(e.data.response);break;default:clearTimeout(c),clearTimeout(r),o(Error("invalid_response"))}}},this.handlers.add(i),a.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[a.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nQ(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function n0(){return void 0!==nQ().WorkerGlobalScope&&"function"==typeof nQ().importScripts}async function n1(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n2="firebaseLocalStorageDb",n3="firebaseLocalStorage",n6="fbase_key";class n4{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function n5(e,t){return e.transaction([n3],t?"readwrite":"readonly").objectStore(n3)}function n8(){let e=indexedDB.open(n2,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(n3,{keyPath:n6})}catch(e){n(e)}}),e.addEventListener("success",async()=>{let n=e.result;n.objectStoreNames.contains(n3)?t(n):(n.close(),await new n4(indexedDB.deleteDatabase(n2)).toPromise(),t(await n8()))})})}async function n9(e,t,n){return new n4(n5(e,!0).put({[n6]:t,value:n})).toPromise()}async function n7(e,t){let n=n5(e,!1).get(t),r=await new n4(n).toPromise();return void 0===r?null:r.value}function re(e,t){return new n4(n5(e,!0).delete(t)).toPromise()}class rt{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await n8()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return n0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=nY._getInstance(n0()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await n1(),!this.activeServiceWorker)return;this.sender=new nZ(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await n8();return await n9(e,nq,"1"),await re(e,nq),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>n9(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>n7(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>re(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new n4(n5(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],n=new Set;if(0!==e.length)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}async function rn(e,t,n){var r,i,a;let s=await n.verify();try{let o;if(tg("string"==typeof s,e,"argument-error"),tg("recaptcha"===n.type,e,"argument-error"),o="string"==typeof t?{phoneNumber:t}:t,"session"in o){let t=o.session;if("phoneNumber"in o)return tg("enroll"===t.type,e,"internal-error"),(await (i={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:s}},tS(e,"POST","/v2/accounts/mfaEnrollment:start",tk(e,i)))).phoneSessionInfo.sessionInfo;{tg("signin"===t.type,e,"internal-error");let n=(null===(r=o.multiFactorHint)||void 0===r?void 0:r.uid)||o.multiFactorUid;return tg(n,e,"missing-multi-factor-info"),(await (a={mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:s}},tS(e,"POST","/v2/accounts/mfaSignIn:start",tk(e,a)))).phoneResponseInfo.sessionInfo}}{let{sessionInfo:t}=await nk(e,{phoneNumber:o.phoneNumber,recaptchaToken:s});return t}}finally{n._reset()}}rt.type="LOCAL",nd("rcb"),new tb(3e4,6e4);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e){this.providerId=rr.PROVIDER_ID,this.auth=ey(e)}verifyPhoneNumber(e,t){return rn(this.auth,e,ey(t))}static credential(e,t){return nR._fromVerification(e,t)}static credentialFromResult(e){return rr.credentialFromTaggedObject(e)}static credentialFromError(e){return rr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?nR._fromTokenResponse(t,n):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(e,t){return t?t0(t):(tg(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}rr.PROVIDER_ID="phone",rr.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra extends nv{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return nE(e,this._buildIdpRequest())}_linkToIdToken(e,t){return nE(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return nE(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function rs(e){return nW(e.auth,new ra(e),e.bypassAuthState)}function ro(e){let{auth:t,user:n}=e;return tg(n,t,"internal-error"),nH(n,new ra(e),e.bypassAuthState)}async function rl(e){let{auth:t,user:n}=e;return tg(n,t,"internal-error"),nV(n,new ra(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:s}=e;if(a){this.reject(a);return}let o={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(s)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rs;case"linkViaPopup":case"linkViaRedirect":return rl;case"reauthViaPopup":case"reauthViaRedirect":return ro;default:td(this.auth,"internal-error")}}resolve(e){var t,n;t=this.pendingPromise,n="Pending promise was never set",t||tv(n),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){var t,n;t=this.pendingPromise,n="Pending promise was never set",t||tv(n),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=new tb(2e3,1e4);async function rd(e,t,n){if(e0(e.app))return Promise.reject(th(e,"operation-not-supported-in-this-environment"));let r=ey(e);!function(e,t,n){if(!(t instanceof n))throw n.name!==t.constructor.name&&td(e,"argument-error"),tp(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,nN);let i=ri(r,n);return new rh(r,"signInViaPopup",t,i).executeNotNull()}class rh extends rc{constructor(e,t,n,r,i){super(e,t,r,i),this.provider=n,this.authWindow=null,this.pollId=null,rh.currentPopupAction&&rh.currentPopupAction.cancel(),rh.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return tg(e,this.auth,"internal-error"),e}async onExecution(){var e,t;e=1===this.filter.length,t="Popup operations only handle one event",e||tv(t);let n=nX();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],n),this.authWindow.associatedEvent=n,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(th(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(th(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rh.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(th(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ru.get())};e()}}rh.currentPopupAction=null;const rp=new Map;class rf extends rc{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=rp.get(this.auth._key());if(!e){try{let t=await rm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}rp.set(this.auth._key(),e)}return this.bypassAuthState||rp.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rm(e,t){let n=t2("pendingRedirect",t.config.apiKey,t.name),r=t0(e._redirectPersistence);if(!await r._isAvailable())return!1;let i=await r._get(n)==="true";return await r._remove(n),i}function rg(e,t){rp.set(e._key(),t)}async function rv(e,t,n=!1){if(e0(e.app))return Promise.reject(tf(e));let r=ey(e),i=ri(r,t),a=new rf(r,i,n),s=await a.execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}class ry{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rb(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!rb(e)){let r=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(th(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(rw(e))}saveEventToCache(e){this.cachedEventUids.add(rw(e)),this.lastProcessedEventTime=Date.now()}}function rw(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function rb({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rI(e,t={}){return tS(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rE=/^https?/;async function rT(e){if(e.config.emulator)return;let{authorizedDomains:t}=await rI(e);for(let e of t)try{if(function(e){let t=ty(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){let i=new URL(e);return""===i.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!rE.test(n))return!1;if(r_.test(e))return r===e;let i=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}(e))return}catch(e){}td(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk=new tb(3e4,6e4);function rS(){let e=nQ().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let rC=null;/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA=new tb(5e3,15e3),rO={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},rR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function rP(e){let t=await (rC=rC||new Promise((t,n)=>{var r,i,a,s;function o(){rS(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{rS(),n(th(e,"network-request-failed"))},timeout:rk.get()})}if(null===(i=null===(r=nQ().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else if(null===(a=nQ().gapi)||void 0===a?void 0:a.load)o();else{let t=nd("iframefcb");return nQ()[t]=()=>{gapi.load?o():n(th(e,"network-request-failed"))},(s=`${nu.gapiScript}?onload=${t}`,nu.loadJS(s)).catch(e=>n(e))}}).catch(e=>{throw rC=null,e})),n=nQ().gapi;return tg(n,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;tg(t.authDomain,e,"auth-domain-config-required");let n=t.emulator?tI(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:e3},i=rR.get(e.config.apiHost);i&&(r.eid=i);let a=e._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${ep(r).slice(1)}`}(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:rO,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=th(e,"network-request-failed"),a=nQ().setTimeout(()=>{r(i)},rA.get());function s(){nQ().clearTimeout(a),n(t)}t.ping(s).then(s,()=>{r(i)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class rN{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}const rD=encodeURIComponent("fac");async function rM(e,t,n,r,i,a){tg(e.config.authDomain,e,"auth-domain-config-required"),tg(e.config.apiKey,e,"invalid-api-key");let s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:e3,eventId:i};if(t instanceof nN)for(let[n,r]of(t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",!function(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())&&(s.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(a||{})))s[n]=r;if(t instanceof nD){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(s.scopes=e.join(","))}for(let t of(e.tenantId&&(s.tid=e.tenantId),Object.keys(s)))void 0===s[t]&&delete s[t];let o=await e._getAppCheckToken(),l=o?`#${rD}=${encodeURIComponent(o)}`:"";return`${function({config:e}){return e.emulator?tI(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${ep(s).slice(1)}${l}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rU="webStorageSupport",rj=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=nJ,this._completeRedirectFn=rv,this._overrideRedirectResult=rg}async _openPopup(e,t,n,r){var i,a,s;a=null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,s="_initialize() not called before _openPopup()",a||tv(s);let o=await rM(e,t,n,ty(),r);return function(e,t,n,r=500,i=600){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString(),o="",l=Object.assign(Object.assign({},rL),{width:r.toString(),height:i.toString(),top:a,left:s}),c=eo().toLowerCase();n&&(o=t8(c)?"_blank":n),t4(c)&&(t=t||"http://localhost",l.scrollbars="yes");let u=Object.entries(l).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=eo()){var t;return nn(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(c)&&"_self"!==o)return function(e,t){let n=document.createElement("a");n.href=e,n.target=t;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}(t||"",o),new rN(null);let d=window.open(t||"",o,u);tg(d,e,"popup-blocked");try{d.focus()}catch(e){}return new rN(d)}(e,o,nX())}async _openRedirect(e,t,n,r){var i;return await this._originValidation(e),i=await rM(e,t,n,ty(),r),nQ().location.href=i,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){var n;let{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(n="If manager is not set, promise should be",r||tv(n),r)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await rP(e),n=new ry(e);return t.register("authEvent",t=>(tg(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(rU,{type:rU},n=>{var r;let i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[rU];void 0!==i&&t(!!i),td(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rT(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nr()||t5()||nn()}};class rz{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return tv("unexpected MultiFactorSessionType")}}}class rB extends rz{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new rB(e)}_finalizeEnroll(e,t,n){return tS(e,"POST","/v2/accounts/mfaEnrollment:finalize",tk(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return tS(e,"POST","/v2/accounts/mfaSignIn:finalize",tk(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class rx extends rz{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new rx(t,void 0,e)}static _fromEnrollmentId(e,t){return new rx(t,e)}async _finalizeEnroll(e,t,n){return tg(void 0!==this.secret,e,"argument-error"),tS(e,"POST","/v2/accounts/mfaEnrollment:finalize",tk(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){tg(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let n={verificationCode:this.otp};return tS(e,"POST","/v2/accounts/mfaSignIn:finalize",tk(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n}))}}class r${constructor(e,t,n,r,i,a,s){this.sessionInfo=a,this.auth=s,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(e,t){return new r$(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let r=!1;return(rF(e)||rF(t))&&(r=!0),r&&(rF(e)&&(e=(null===(n=this.auth.currentUser)||void 0===n?void 0:n.email)||"unknownuser"),rF(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function rF(e){return void 0===e||(null==e?void 0:e.length)===0}var rV="@firebase/auth",rH="1.7.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rW{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){tg(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}const rq=ea("authIdTokenMaxAge")||300;let rK=null;const rG=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>rq)return;let i=null==n?void 0:n.token;rK!==i&&(rK=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};nu={loadJS:e=>new Promise((t,n)=>{var r,i;let a=document.createElement("script");a.setAttribute("src",e),a.onload=t,a.onerror=e=>{let t=th("internal-error");t.customData=e,n(t)},a.type="text/javascript",a.charset="UTF-8",(null!==(i=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==i?i:document).appendChild(a)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},s="Browser",eZ(new ew("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=n.options;tg(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});let l=new nl(n,r,i,{apiKey:a,authDomain:o,clientPlatform:s,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ni(s)});return function(e,t){let n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(t0);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),eZ(new ew("auth-internal",e=>new rW(ey(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),e4(rV,rH,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(s)),e4(rV,rH,"esm2017");const rJ=function(e=function(e=eq){let t=eG.get(e);if(!t&&e===eq&&ei())return e6();if(!t)throw e1.create("no-app",{appName:e});return t}()){let t=eQ(e,"auth");if(t.isInitialized())return t.getImmediate();let n=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let n=eQ(e,"auth");if(n.isInitialized()){let e=n.getImmediate();if(ed(n.getOptions(),null!=t?t:{}))return e;td(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:rj,persistence:[rt,nG,nJ]}),r=ea("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){var i,a;let t=rG(e.toString());i=()=>t(n.currentUser),ey(n).beforeAuthStateChanged(t,i),a=e=>t(e),ey(n).onIdTokenChanged(a,void 0,void 0)}}let s=er("auth");return s&&function(e,t,n){let r=ey(e);tg(r._canInitEmulator,r,"emulator-config-failed"),tg(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");let i=nm(t),{host:a,port:s}=function(e){let t=nm(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};let r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:ng(r.substr(e.length+1))}}{let[e,t]=r.split(":");return{host:e,port:ng(t)}}}(t),o=null===s?"":`:${s}`;r.config.emulator={url:`${i}//${a}${o}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:s,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(n,`http://${s}`),n}(e6({apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0,measurementId:void 0})),rY=new nU,rX=async()=>{try{return(await rd(rJ,rY)).user}catch(e){throw console.error("Error logging in with Google:",e),e}};async function rZ(e){e.preventDefault();try{h("function handleGoogleLogin - User attempting to log in with Google");let e=await rX();if(e){h("function handleGoogleLogin - Successfully logged in with Google:",e);let t=await e.getIdToken(),n=await fetch(`${p}/users/google-login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t})}),r=await n.json();n.ok?(localStorage.setItem("userToken",r.token),r2()):(console.error("function handleGoogleLogin - Google login error:",r.message||"Unknown error"),alert(`Login error: ${r.message}`))}}catch(e){console.error("function handleGoogleLogin - Error logging in with Google:",e),alert("There was a problem logging in with Google. Please try again later.")}}async function rQ(e){e.preventDefault();let t=document.getElementById("email").value,n=document.getElementById("password").value;if(!t||!n){alert("Please fill out both the email and password fields.");return}try{h("function handleLogin - User login attempt:",t);let e=await fetch(`${p}/users/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}),r=await e.json();e.ok?(h("function handleLogin - Successfully logged in:",r),localStorage.setItem("userToken",r.token),r2()):(console.error("function handleLogin - Login error:",r.message||"Unknown error"),alert(`Login error: ${r.message}`))}catch(e){console.error("function handleLogin - There was a problem logging in:",e),alert("There was a problem logging in. Please try again later.")}}async function r0(e){e.preventDefault();try{h("function handleGoogleRegister - User attempting to register/login with Google");let e=await rX();if(e){h("function handleGoogleRegister - Successfully registered/logged in with Google:",e);let t=await e.getIdToken(),n=await fetch(`${p}/users/google-login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t})}),r=await n.json();n.ok?(localStorage.setItem("userToken",r.token),r2()):(console.error("Registration error:",r.message||"Unknown error"),alert("An error occurred during Google registration. Please try again later."))}}catch(e){console.error("Registration error:",e),alert("An error occurred during Google registration. Please try again later.")}}var r1={};function r2(){try{let e=localStorage.getItem("userToken"),t=document.getElementById("app");e?(t.innerHTML=(h("HomePage - Renderowanie strony głównej"),`
    <div class="container">
      <header class="header">
        <div class="logo">
          <img src="${/*@__PURE__*/i(A)}" alt="Kapu$ta Logo">
        </div>
        <div class="user-info">
          <img id="user-avatar" class="user-avatar" alt="User Avatar" />
          <span id="user-name"></span>
        </div>
        ${h("function LogoutButton - Renderowanie przycisku wylogowania"),`
    <button id="logout-btn" class="btn btn-secondary">Exit</button>
  `}
      </header>
      <main class="main-content">
        ${h("function Balance - Renderowanie komponentu Balance"),`
    <div class="balance-container">
      <h2>BALANCE</h2>
      <p id="balance-amount" class="balance-amount">Loading...</p>
      <button id="update-balance-btn" class="btn btn-primary">Update</button>
      <div class="balance-actions">
        <button id="show-reports-btn" class="btn btn-reports">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="currentColor"/>
          </svg>
          Reports
        </button>
      </div>
    </div>
    <div id="confirmation-modal-container"></div>
    <div id="zero-balance-modal-container"></div>

    <!-- Statyczny formularz w HTML, pocz\u{105}tkowo ukryty -->
    <div id="balance-form" style="display: none;">
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
    </div>
  `}
        <div class="tabs">
          <button id="arrow-left" class="arrow-button">\u{25C0}</button>
          <button class="btn btn-outline tab-button active" data-tab="expense">EXPENSES</button>
          <button class="btn btn-outline tab-button" data-tab="income">INCOME</button>
          <button id="arrow-right" class="arrow-button">\u{25B6}</button>
        </div>
        ${function(e=""){return h("function TransactionForm - Renderowanie formularza transakcji"),`
    <div class="transaction-form-container">
      <h3>Add transaction</h3>
      <form id="transaction-form" class="transaction-form">
        <div class="form-group">
          <input type="date" id="transaction-date" required>
        </div>
        <div class="form-group">
          <input type="text" id="transaction-description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <select id="transaction-category" required>
          </select>
        </div>
        <div class="form-group">
          <input type="number" id="transaction-amount" placeholder="Amount" step="0.01" required>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Input</button>
          <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
      </form>
    </div>
  `}()}
        <div class="transaction-view">
          <div id="transaction-list-container"></div>
          <div id="summary-list-container"></div>
        </div>
      </main>
    </div>
  `),O()):(t.innerHTML=(h("function LoginPage - Renderowanie strony logowania"),`
    <div id="auth-container" class="auth-container">
      <div id="login-section" class="login-section">
        <div class="logo">
          <img src="${/*@__PURE__*/i(r1)}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          ${h("function Login - Login form rendering"),`
    <form id="login-form">
      <div class="google-section">
        <button id="google-login-btn" class="btn btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo">
          Log in with Google
        </button>
      </div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      
      <button type="submit" class="btn btn-primary">Log in</button>
      <button id="switch-to-register" class="btn btn-secondary">Registration</button>
    </form>
  `}
        </div>
      </div>
      <div id="register-section" class="register-section" style="display: none;">
        <div class="logo">
          <img src="${/*@__PURE__*/i(r1)}" alt="Kapu$ta Logo">
        </div>
        <div class="auth-form">
          ${h("function RegisterForm - Rendering of registration form"),`
    <form id="register-form">
      <div class="google-section">
        <button id="google-register-btn" class="btn btn-google">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo">
          Sign up with Google
        </button>
      </div>
      <label for="register-name">Name:</label>
      <input type="text" id="register-name" name="name" required />
      
      <label for="register-email">Email:</label>
      <input type="email" id="register-email" name="email" required />
      
      <label for="register-password">Password:</label>
      <input type="password" id="register-password" name="password" required />
      
      <button type="submit" class="btn btn-primary">Register</button>
      <button id="switch-to-login" class="btn btn-secondary">Return to login</button>
    </form>
  `}
        </div>
      </div>
    </div>
  `),function(){let e=document.getElementById("switch-to-register");document.getElementById("switch-to-login");let t=document.getElementById("login-section"),n=document.getElementById("register-section");h("function setupAuthForms - Inicjalizacja formularzy autoryzacji"),function(){let e=document.getElementById("login-form"),t=document.getElementById("google-login-btn");e.addEventListener("submit",rQ),t.addEventListener("click",e=>{e.preventDefault(),rZ(e)})}(),e.addEventListener("click",e=>{e.preventDefault(),h("function setupAuthForms - Przełączanie na formularz rejestracji"),t.style.display="none",n.style.display="flex"}),function(e){let t=document.getElementById("register-form");h("function setupRegisterForm - Initializing the registration form"),t.addEventListener("submit",async n=>{n.preventDefault();let r=Object.fromEntries(new FormData(t).entries());try{h("function setupRegisterForm - User registration attempt:",r.email);let t=await fetch(`${p}/users/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(t.ok)h("function setupRegisterForm - Registration completed successfully"),alert("Registration successful! You can now log in."),e();else{let e=await t.json();console.error("Registration error:",e.message),alert("An error occurred during registration. Please try again later.")}}catch(e){console.error("Registration error:",e),alert("An error occurred during registration. Please try again later.")}}),document.getElementById("google-register-btn").addEventListener("click",e=>{e.preventDefault(),r0(e)}),document.getElementById("switch-to-login").addEventListener("click",e=>{e.preventDefault(),h("function setupRegisterForm - Switching to login form"),document.getElementById("register-section").style.display="none",document.getElementById("login-section").style.display="flex"})}(()=>{h("function setupAuthForms - Rejestracja zakończona sukcesem, powrót do logowania"),n.style.display="none",t.style.display="flex"})}())}catch(t){console.error("Error rendering the application:",t);let e=document.getElementById("app");e&&(e.innerHTML="<p>An unexpected error occurred. Please try again later.</p>")}}r1=new URL("logo-big.afadb933.svg",import.meta.url).toString(),document.addEventListener("DOMContentLoaded",r2),window.addEventListener("storage",e=>{"userToken"===e.key&&r2()});
//# sourceMappingURL=index.cc4db5e9.js.map
