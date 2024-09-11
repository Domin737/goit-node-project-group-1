// src/components/RegisterForm.js

export default function RegisterForm() {
  return `
    <form id="register-form">
      <h2>Rejestracja</h2>
      <div>
        <label for="register-name">Imię:</label>
        <input type="text" id="register-name" name="name" required>
      </div>
      <div>
        <label for="register-email">Email:</label>
        <input type="email" id="register-email" name="email" required>
      </div>
      <div>
        <label for="register-password">Hasło:</label>
        <input type="password" id="register-password" name="password" required>
      </div>
      <button type="submit">Zarejestruj się</button>
    </form>
  `;
}

export function setupRegisterForm(onRegisterSuccess) {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Rejestracja udana! Możesz się teraz zalogować.');
        onRegisterSuccess();
      } else {
        const errorData = await response.json();
        alert(`Błąd rejestracji: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.');
    }
  });
}
