// Print the full text, including notes that extend beyond the visible field.
function refreshPaper() {
  document.querySelectorAll('.write textarea').forEach(field => {
    field.nextElementSibling.textContent = field.value;
  });
}
document.addEventListener('input', refreshPaper);
window.addEventListener('beforeprint', refreshPaper);
