for (const form of document.querySelectorAll('.listing-form')) {
  form.addEventListener('submit', async (event) => {
    if (!form.reportValidity()) return;
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.listing-status');
    button.disabled = true;
    status.textContent = form.dataset.sending;
    status.classList.remove('is-error');
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
        credentials: 'same-origin',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      status.textContent = form.dataset.success;
    } catch {
      status.textContent = form.dataset.error;
      status.classList.add('is-error');
    } finally {
      button.disabled = false;
    }
  });
}
