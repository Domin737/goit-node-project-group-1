// src/components/RegisterForm.js
import log from '../utils/logger';

export default function RegisterForm() {
  log('function RegisterForm - Rendering of registration form');
  return `
    <div class="auth-container">
      <div class="login-section">
        <div class="auth-form">
          <div class="auth-form-logo">
            <img src="../images/logo-big.svg" alt="Logo" />
          </div>
          <form id="register-form">
            <h2>Registration</h2>
            <div class="form-group">
              <label for="register-name">Name:</label>
              <input type="text" id="register-name" name="name" required>
            </div>
            <div class="form-group">
              <label for="register-email">Email:</label>
              <input type="email" id="register-email" name="email" required>
            </div>
            <div class="form-group">
              <label for="register-password">Password:</label>
              <input type="password" id="register-password" name="password" required>
            </div>
            <button type="submit" class="btn-primary">Sign up</button>
          </form>
          <div class="auth-switch">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
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
}
