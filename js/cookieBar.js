// Cookie Bar functionality
export function initializeCookieBar() {
  const cookieBar = document.getElementById("cookie-bar");
  const acceptButton = document.getElementById("accept-cookies");

  if (!cookieBar || !acceptButton) return;

  // Check if user has already accepted cookies (old or new key)
  const cookiesAccepted =
    localStorage.getItem("mahjongCookiesAccepted") ||
    localStorage.getItem("trafficTrapCookiesAccepted");

  if (cookiesAccepted) {
    // If cookies already accepted, hide the bar immediately and disable animation
    cookieBar.style.display = "none";
    return;
  }

  // Show cookie bar after a short delay
  setTimeout(() => {
    cookieBar.classList.add("show");
  }, 1000);

  // Handle accept button click
  acceptButton.addEventListener("click", function () {
    localStorage.setItem("mahjongCookiesAccepted", "true");
    localStorage.setItem("trafficTrapCookiesAccepted", "true");
    cookieBar.classList.remove("show");

    // Add success animation
    this.textContent = "Accepted!";
    this.style.backgroundColor = "var(--success-color)";

    setTimeout(() => {
      this.textContent = "Accept & Play";
      this.style.backgroundColor = "";
    }, 2000);
  });

  // Remove Escape key handler (do not allow closing by Esc)
}
