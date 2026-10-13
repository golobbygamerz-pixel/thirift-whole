/* THRIFT SUPPLY
   Shared frontend utilities.
   Demo only — no live inventory or payment processing.
*/

(() => {
  "use strict";

  const SELLER_WHATSAPP = ""; // Add seller's number with country code, digits only.

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  function getWhatsAppUrl(message) {
    if (!/^[0-9]{10,15}$/.test(SELLER_WHATSAPP)) {
      showToast("Seller WhatsApp number has not been configured.");
      return null;
    }

    return "https://wa.me/" + SELLER_WHATSAPP +
      "?text=" + encodeURIComponent(message);
  }

  function openWhatsApp(message) {
    const url = getWhatsAppUrl(message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  function initMobileNavigation() {
    document.querySelectorAll(".menu-button").forEach((button) => {
      button.addEventListener("click", () => {
        document.getElementById("shop")?.scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  }

  function initFooterYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  // Expose utilities for pages that explicitly need them.
  window.ThriftSupply = Object.freeze({
    formatPrice,
    showToast,
    openWhatsApp
  });

  document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initFooterYear();
  });
})();