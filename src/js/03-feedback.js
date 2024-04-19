import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}, 500);

form.addEventListener('input', saveStateToLocalStorage);

document.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const currentState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log('Form submitted:', currentState);

  localStorage.removeItem('feedback-form-state');
});
