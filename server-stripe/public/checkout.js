// This is your test publishable API key.
const stripe = Stripe("pk_test_51OsujPRxkP3Lfe5p64m35SZcCV2g9UnkGOjSdFu9dB1Uk9xOjnVOC68aYUQeDnYdWBj6bO1KIz476OzmcUAc7ZjT00PoeJesRY");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
  const response = await fetch("/create-checkout-session", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}