document.addEventListener("DOMContentLoaded", function () {
  // Base URL for Netlify Functions (dynamic for local vs. production)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const functionBaseUrl = isLocal
    ? '/.netlify/functions' // For local testing with netlify dev
    : 'https://paint-gh.netlify.app/.netlify/functions'; // 

  // Fetch and display prices from Stripe
  async function loadPrices() {
    try {
      const response = await fetch(`${functionBaseUrl}/get-prices`);
      if (!response.ok) {
        throw new Error('Failed to fetch prices');
      }
      const prices = await response.json();

      // Update price displays in the DOM
      const priceElements = document.querySelectorAll('.price');
      priceElements.forEach(element => {
        const lookupKey = element.dataset.lookupKey;
        const priceData = prices.find(price => price.lookup_key === lookupKey);
        if (priceData) {
          element.textContent = `Price: ${new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: priceData.currency,
          }).format(priceData.amount)}`;
        } else {
          element.textContent = 'Price: Not available';
        }
      });
    } catch (error) {
      console.error('Error loading prices:', error);
      document.querySelectorAll('.price').forEach(element => {
        element.textContent = 'Price: Error';
      });
    }
  }

  // Call loadPrices immediately
  loadPrices();

  // Lightbox Configuration
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
      fitImagesInViewport: true,
      positionFromTop: 50,
      disableScrolling: false,
      showImageNumberLabel: false,
      alwaysShowNavOnTouchDevices: true
    });
  } else {
    console.error('Lightbox failed to load - check script order');
  }

    // Dynamic adjective switcher for hero section
  const words = ["Neat", "Fast", "Best", "Smart"];
  let i = 0;

  setInterval(() => {
    const el = document.getElementById("dynamic-adjective");
    if (el) {
      el.classList.remove("fade-in");
      void el.offsetWidth; // force reflow
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.add("fade-in");
    }
  }, 2000);

  // Form Submission and Validation
  (function () {
    'use strict';
    const form = document.getElementById('contact-form');
    if (!form) {
      console.warn('Contact form not found');
      return;
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Bootstrap validation
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        botField: formData.get('bot-field'),
      };

      try {
        const response = await fetch(`${functionBaseUrl}/send-mail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Message sent successfully!');
          window.location.href = '/thankyou.html';
        } else {
          const errorData = await response.json();
          alert(`Failed to send message: ${errorData.message || 'Please try again.'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  })();

  // Stripe Checkout Integration with Quantity Support
  function buy(lookupKey, color) {
    const quantityInput = document.getElementById(`quantity-${color}`);
    if (!quantityInput) {
      alert(`Quantity input for ${color} not found.`);
      return;
    }

    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }

    // Fetch prices to get the price_id for the lookup_key
    fetch(`${functionBaseUrl}/get-prices`)
      .then(res => res.json())
      .then(prices => {
        const priceData = prices.find(price => price.lookup_key === lookupKey);
        if (!priceData) {
          alert('Price not found for this product.');
          return;
        }

        return fetch(`${functionBaseUrl}/create-checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ priceId: priceData.price_id, quantity }),
        });
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Checkout error: ' + (data.error || 'Unknown error'));
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Failed to start checkout.');
      });
  }

  // Attach click handlers to buttons
  const buyYellowBtn = document.getElementById('buy-yellow');
  const buyBlueBtn = document.getElementById('buy-blue');

  if (buyYellowBtn) {
    buyYellowBtn.addEventListener('click', () => {
      const lookupKey = buyYellowBtn.dataset.lookupKey;
      buy(lookupKey, 'yellow');
    });
  }

  if (buyBlueBtn) {
    buyBlueBtn.addEventListener('click', () => {
      const lookupKey = buyBlueBtn.dataset.lookupKey;
      buy(lookupKey, 'blue');
    });
  }
});
