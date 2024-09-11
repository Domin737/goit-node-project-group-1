async function e(){try{let e=localStorage.getItem("userToken");if(!e)throw Error("Brak tokenu uwierzytelniającego");if(!(await fetch("/api/users/logout",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).ok)throw Error("Błąd podczas wylogowywania");localStorage.removeItem("userToken"),localStorage.removeItem("userName"),localStorage.removeItem("userEmail"),window.location.href="/login"}catch(e){console.error("Błąd podczas wylogowywania:",e),alert(`Wyst\u{105}pi\u{142} b\u{142}\u{105}d podczas wylogowywania: ${e.message}`)}}async function t(e){e.preventDefault();let t=document.getElementById("email").value,n=document.getElementById("password").value;try{let e=await fetch("http://localhost:3000/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:n})}),i=await e.json();e.ok?(console.log("Zalogowano pomyślnie:",i),localStorage.setItem("userToken",i.token),o()):(console.error("Błąd logowania:",i.message||"Nieznany błąd"),alert(`B\u{142}\u{105}d logowania: ${i.message}`))}catch(e){console.error("Wystąpił problem z logowaniem:",e),alert("Wystąpił problem z logowaniem. Spróbuj ponownie później.")}}function o(){let o=localStorage.getItem("userToken"),n=document.getElementById("app");o?(n.innerHTML=`
    <div>
      <h1>Witaj w aplikacji Kapu$ta!</h1>
      <p>To jest strona g\u{142}\xf3wna aplikacji.</p>
      
    <button id="logout-btn">Wyloguj</button>
  
    </div>
    <div id="logout-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <p>Czy na pewno chcesz opu\u{15B}ci\u{107} aplikacj\u{119}?</p>
        <button id="confirm-logout">Tak</button>
        <button id="cancel-logout">Nie</button>
      </div>
    </div>
  `,function(){!function(e){let t=document.getElementById("logout-btn");t&&t.addEventListener("click",e)}(()=>{document.getElementById("logout-modal").style.display="block"});let t=document.getElementById("confirm-logout"),o=document.getElementById("cancel-logout"),n=document.getElementById("logout-modal");t.addEventListener("click",()=>{e(),n.style.display="none"}),o.addEventListener("click",()=>{n.style.display="none"})}()):(n.innerHTML=`
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
  `,function(){let e=document.getElementById("login-form"),o=document.getElementById("switch-to-register"),n=document.getElementById("switch-to-login"),i=document.getElementById("login-section"),a=document.getElementById("register-section");e.addEventListener("submit",t),o.addEventListener("click",()=>{i.style.display="none",a.style.display="block"}),n.addEventListener("click",()=>{a.style.display="none",i.style.display="block"}),function(e){let t=document.getElementById("register-form");t.addEventListener("submit",async o=>{o.preventDefault();let n=Object.fromEntries(new FormData(t).entries());try{let t=await fetch("/api/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(t.ok)alert("Rejestracja udana! Możesz się teraz zalogować."),e();else{let e=await t.json();alert(`B\u{142}\u{105}d rejestracji: ${e.message}`)}}catch(e){console.error("Błąd podczas rejestracji:",e),alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.")}})}(()=>{a.style.display="none",i.style.display="block"})}())}document.addEventListener("DOMContentLoaded",o),window.addEventListener("storage",e=>{"userToken"===e.key&&o()});
//# sourceMappingURL=index.21f38ec9.js.map
