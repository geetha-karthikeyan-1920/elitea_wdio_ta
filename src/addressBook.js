const REQUIRED_FIELDS = ['line1', 'city', 'state', 'postalCode'];

function emptyForm() {
  return {
    recipient: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
}

function isUsAddress(address) {
  return String(address?.country ?? '').trim().toUpperCase() === 'US';
}

function belongsToUser(address, userId) {
  return address?.userId === userId;
}

function requireAddressField(address, field) {
  if (address?.[field] == null || String(address[field]).trim() === '') {
    throw new Error(`Address field is missing: ${field}`);
  }
}

function toShippingForm(address) {
  for (const field of REQUIRED_FIELDS) {
    requireAddressField(address, field);
  }

  return {
    recipient: address.recipient ?? '',
    line1: address.line1,
    line2: address.line2 ?? '',
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    country: 'US',
  };
}

function copySession(checkout) {
  return {
    ...checkout,
    shippingForm: { ...checkout.shippingForm },
  };
}

export function createCheckout({ userId, addresses, step = 'shipping' } = {}) {
  if (userId == null || String(userId).trim() === '') {
    throw new Error('Signed-in user is missing');
  }

  if (!Array.isArray(addresses)) {
    throw new Error('Address book is missing');
  }

  return {
    userId: String(userId),
    addresses,
    step,
    addressBookOpen: false,
    visibleAddresses: [],
    shippingForm: emptyForm(),
    selectedAddressId: null,
  };
}

export function savedUsAddresses(checkout) {
  return checkout.addresses.filter(
    (address) => belongsToUser(address, checkout.userId) && isUsAddress(address),
  );
}

export function openAddressBook(checkout) {
  if (checkout.step !== 'shipping') {
    throw new Error('Shipping address screen is not active');
  }

  const visibleAddresses = savedUsAddresses(checkout).map((address) => ({
    id: address.id,
    recipient: address.recipient ?? '',
    line1: address.line1 ?? '',
    city: address.city ?? '',
    state: address.state ?? '',
    postalCode: address.postalCode ?? '',
    country: 'US',
  }));

  return {
    ...copySession(checkout),
    addressBookOpen: true,
    visibleAddresses,
  };
}

export function selectSavedAddress(checkout, addressId) {
  if (!checkout.addressBookOpen) {
    throw new Error('Address book modal is not open');
  }

  const address = checkout.addresses.find(
    (item) => item.id === addressId && belongsToUser(item, checkout.userId) && isUsAddress(item),
  );

  if (!address) {
    throw new Error(`Address not found: ${addressId}`);
  }

  return {
    ...copySession(checkout),
    addressBookOpen: false,
    selectedAddressId: address.id,
    shippingForm: toShippingForm(address),
    step: 'payment',
  };
}
