// src/components/RegisterForm.js
export default function RegisterForm() {
  console.log('function RegisterForm - Rendering of registration form');
  return `
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
  `;
}

export function setupRegisterForm(onRegisterSuccess) {
  const form = document.getElementById('register-form');
  console.log(
    'function setupRegisterForm - Initializing the registration form'
  );

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      console.log(
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
        console.log(
          'function setupRegisterForm - Registration completed successfully'
        );
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
