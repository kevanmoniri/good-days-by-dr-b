(() => {
  const box = document.querySelector('[data-local-finder]');
  if (!box) return;
  const form = box.querySelector('form');
  const field = form.elements.zip;
  const results = box.querySelector('.zip-results');
  const status = box.querySelector('[role=status]');
  const error = box.querySelector('.zip-error');
  const clearButton = box.querySelector('.zip-clear');
  const storageKey = 'good-days.local-zip';
  const valid = zip => /^\d{5}$/.test(zip) && zip !== '00000';
  function display(zip) {
    const active = valid(zip);
    results.hidden = !active;
    clearButton.hidden = !active;
    status.textContent = active ? 'Local searches for ZIP ' + zip : '';
    field.value = active ? zip : '';
    if (active) {
      box.querySelector('[data-meals]').href = 'https://www.mealsonwheelsamerica.org/find-meals-and-services/?pc=' + zip;
      box.querySelector('[data-community]').href = 'https://www.findhelp.org/search_results/' + zip;
    }
  }
  function clearError() {
    error.hidden = true;
    field.removeAttribute('aria-invalid');
  }
  field.addEventListener('input', clearError);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const zip = field.value.trim();
    if (!valid(zip)) {
      error.hidden = false;
      field.setAttribute('aria-invalid','true');
      field.focus();
      return;
    }
    clearError();
    try { sessionStorage.setItem(storageKey, zip); } catch {}
    display(zip);
  });
  clearButton.addEventListener('click', () => {
    try { sessionStorage.removeItem(storageKey); } catch {}
    clearError();
    display('');
    status.textContent = 'ZIP code cleared.';
    field.focus();
  });
  function restore() {
    try { display(sessionStorage.getItem(storageKey) || ''); } catch {}
  }
  restore();
  window.addEventListener('pageshow', event => { if (event.persisted) restore(); });
})();
