
/* =========================================
   MULTIMANTTRA SOLUTIONS
   HOMEPAGE JAVASCRIPT
========================================= */


/* ---------- MOBILE NAVIGATION ---------- */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", function () {

    const isOpen = mainNav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

  });

  // Close menu after clicking a navigation link

  mainNav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      mainNav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");

    });

  });

}


/* ---------- FOOTER YEAR ---------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ---------- CONTACT FORM ---------- */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("contactSubmit");


// Google Apps Script Web App URL
// This is the same endpoint used for your existing form.

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7atbnveQRq49CewnZXRodeZSH4WuuWwcpHu_UORdZ9gXzgukj87kPeYo7FYKKdw8/exec";


if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Clear previous status

    formStatus.textContent = "";
    formStatus.className = "form-status";


    // Check form validity

    if (!contactForm.checkValidity()) {

      contactForm.reportValidity();
      return;

    }


    // Get form values

    const formData = new FormData(contactForm);

    const data = {

      name: formData.get("name").trim(),

      phone: formData.get("phone").trim(),

      email: formData.get("email").trim(),

      city: formData.get("city").trim(),

      business_category: formData.get("business_category"),

      message: formData.get("message").trim(),

      source: "Multimanttra Solutions Homepage",

      submitted_at: new Date().toLocaleString("en-IN")

    };


    // Prevent multiple submissions

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";


    try {

      const response = await fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify(data)

      });


      const result = await response.text();


      if (!response.ok || result.trim().toLowerCase() !== "success") {

        throw new Error("Unable to submit the enquiry.");

      }


      // Success message

      formStatus.textContent =
        "Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.";

      formStatus.classList.add("success");


      // Reset form

      contactForm.reset();


    } catch (error) {

      console.error("Contact form error:", error);

      formStatus.textContent =
        "Sorry, something went wrong. Please try again or contact us directly.";

      formStatus.classList.add("error");

    } finally {

      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Enquiry <span>→</span>';

    }

  });

}
