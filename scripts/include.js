document.addEventListener("DOMContentLoaded", () => {
  const canonical = document.getElementById("canonical-url");

  if (canonical) {
    canonical.href = window.location.href;
  }
});