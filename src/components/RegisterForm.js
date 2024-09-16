// src/components/RegisterForm.js
import log from '../utils/logger';

export default function RegisterForm() {
  log('function RegisterForm - Rendering of registration form');
  return `
    <form id="register-form">
      <h2>Registration</h2>
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
      
      <button type="submit" class="btn btn-primary">Sign up</button>
      <button id="switch-to-login" class="btn btn-secondary">Log in</button>
    </form>
  `;
}

export function setupRegisterForm(onRegisterSuccess) {
  const form = document.getElementById('register-form');
  log('function setupRegisterForm - Initializing the registration form');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      log(
        'function setupRegisterForm - User registration attempt:',
        userData.email
      );
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        log('function setupRegisterForm - Registration completed successfully');
        alert('Registration successful! You can now log in.');
        onRegisterSuccess();
      } else {
        const errorData = await response.json();
        console.error(
          'function setupRegisterForm - Registration error:',
          errorData.message
        );
        alert(`Registration error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(
        'function setupRegisterForm - Error during registration:',
        error
      );
      alert('An error occurred while registering. Please try again later.');
    }
  });

  // Obsługa przycisku przełączania na logowanie
  const switchToLoginBtn = document.getElementById('switch-to-login');
  switchToLoginBtn.addEventListener('click', event => {
    event.preventDefault();
    log('function setupRegisterForm - Switching to login form');
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'flex';
  });
}
