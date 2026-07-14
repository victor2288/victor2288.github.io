const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const serviceSelect = document.querySelector('#service-select');
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    if (status) status.textContent = 'Please complete the required fields before preparing the inquiry.';
    return;
  }

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const organization = String(data.get('organization') || '').trim();
  const email = String(data.get('email') || '').trim();
  const service = String(data.get('service') || 'Not sure yet').trim();
  const message = String(data.get('message') || '').trim();

  const subject = `Service inquiry from ${organization}`;
  const body = [
    `Name: ${name}`,
    `Organization: ${organization}`,
    `Reply email: ${email}`,
    `Service of interest: ${service}`,
    '',
    'Outcome, decision, or responsibility to clarify:',
    message,
    '',
    'Visitor privacy notice acknowledged: Yes',
    'Please do not include passwords, sensitive records, configuration exports, or confidential incident evidence.'
  ].join('\n');

  // Replace this address with the approved ceity.com inquiry address before publication.
  const destination = 'inquiries@ceity.com';
  window.location.href = `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (status) status.textContent = 'Your email application should open with the inquiry prepared. No information was uploaded by this website.';
});


const privacyBanner = document.querySelector('#privacy-banner');
const privacyAcknowledge = document.querySelector('#privacy-acknowledge');
const privacyKey = 'vy-privacy-notice-acknowledged-v1';

try {
  if (privacyBanner && localStorage.getItem(privacyKey) !== 'yes') {
    privacyBanner.hidden = false;
  }
} catch (error) {
  if (privacyBanner) privacyBanner.hidden = false;
}

privacyAcknowledge?.addEventListener('click', () => {
  try { localStorage.setItem(privacyKey, 'yes'); } catch (error) { /* browser storage unavailable */ }
  if (privacyBanner) privacyBanner.hidden = true;
});
