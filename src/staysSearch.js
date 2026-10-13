const STORY_CURRENCIES = [
  { code: 'USD', numericCode: '840' },
  { code: 'EUR', numericCode: '978' },
  { code: 'GBP', numericCode: '826' },
  { code: 'AED', numericCode: '784' },
  { code: 'JPY', numericCode: '392' },
];

const ILLUSTRATIVE_FILTER_CATALOG = {
  basic: [
    { id: 'maxPrice', label: 'Maximum price' },
    { id: 'minStars', label: 'Minimum star rating' },
  ],
  advanced: [
    { id: 'freeCancellation', label: 'Free cancellation' },
    { id: 'minGuestRating', label: 'Minimum guest rating' },
    { id: 'amenity', label: 'Amenity' },
  ],
};

function cloneSession(session) {
  return {
    ...session,
    stays: session.stays,
    catalog: session.catalog,
    rates: session.rates,
    activeAdvancedFilters: { ...session.activeAdvancedFilters },
  };
}

function findCurrency(code) {
  if (typeof code !== 'string') {
    return undefined;
  }

  const normalized = code.trim().toUpperCase();
  return STORY_CURRENCIES.find((currency) => currency.code === normalized);
}

function currencyLabel(currency) {
  return `${currency.code} (${currency.numericCode})`;
}

function assertAdvancedBeyondBasic(catalog) {
  const basicIds = new Set((catalog.basic ?? []).map((filter) => filter.id));
  const advanced = catalog.advanced ?? [];

  if (advanced.length === 0) {
    throw new Error('Advanced filters are not available');
  }

  const overlap = advanced.filter((filter) => basicIds.has(filter.id));
  if (overlap.length > 0) {
    throw new Error('Advanced filters must be beyond the basic filters');
  }
}

function normalizeSelections(catalog, selections) {
  if (selections == null || typeof selections !== 'object' || Array.isArray(selections)) {
    throw new Error('Advanced filter selections are missing');
  }

  const allowed = new Map((catalog.advanced ?? []).map((filter) => [filter.id, filter]));
  const normalized = {};

  for (const [id, value] of Object.entries(selections)) {
    if (!allowed.has(id)) {
      throw new Error(`Advanced filter not found: ${id}`);
    }

    if (value == null || value === '') {
      throw new Error(`Advanced filter value is missing: ${id}`);
    }

    normalized[id] = value;
  }

  return normalized;
}

function stayMatches(stay, filters) {
  if (filters.freeCancellation === true && stay.freeCancellation !== true) {
    return false;
  }

  if (filters.minGuestRating != null && !(Number(stay.guestRating) >= Number(filters.minGuestRating))) {
    return false;
  }

  if (filters.amenity != null && !(stay.amenities ?? []).includes(filters.amenity)) {
    return false;
  }

  return true;
}

function convertAmount(amount, baseCurrency, selectedCurrency, rates) {
  if (baseCurrency === selectedCurrency) {
    return amount;
  }

  const rateKey = `${baseCurrency}->${selectedCurrency}`;
  const rate = rates?.[rateKey];

  if (rate == null) {
    throw new Error(`Currency rate not found: ${rateKey}`);
  }

  if (!Number.isFinite(Number(rate)) || Number(rate) <= 0) {
    throw new Error(`Currency rate is invalid: ${rateKey}`);
  }

  const digits = selectedCurrency === 'JPY' ? 0 : 2;
  return Number((amount * Number(rate)).toFixed(digits));
}

function priceForStay(session, stay) {
  if (stay?.price == null || stay.price.amount == null || !stay.price.currency) {
    throw new Error(`Stay price is missing: ${stay?.id ?? 'unknown'}`);
  }

  const currency = findCurrency(session.selectedCurrency);
  if (!currency) {
    throw new Error(`Currency not found: ${session.selectedCurrency}`);
  }

  const amount = convertAmount(
    stay.price.amount,
    stay.price.currency,
    currency.code,
    session.rates,
  );
  const formattedAmount = currency.code === 'JPY' ? String(amount) : amount.toFixed(2);

  return {
    code: currency.code,
    numericCode: currency.numericCode,
    label: currencyLabel(currency),
    amount,
    formatted: `${currencyLabel(currency)} ${formattedAmount}`,
  };
}

function visibleStays(session) {
  return session.stays.filter((stay) => stayMatches(stay, session.activeAdvancedFilters));
}

export function listSupportedCurrencies() {
  return STORY_CURRENCIES.map((currency) => ({
    ...currency,
    label: currencyLabel(currency),
  }));
}

export function createSearchSession({
  stays,
  catalog = ILLUSTRATIVE_FILTER_CATALOG,
  rates = {},
  selectedCurrency = 'USD',
} = {}) {
  if (!Array.isArray(stays)) {
    throw new Error('Stay results are missing');
  }

  const currency = findCurrency(selectedCurrency);
  if (!currency) {
    throw new Error(`Currency not found: ${selectedCurrency}`);
  }

  assertAdvancedBeyondBasic(catalog);

  return {
    stays,
    catalog,
    rates,
    selectedCurrency: currency.code,
    activeAdvancedFilters: {},
    advancedPanelOpen: false,
    view: 'results',
    selectedStayId: null,
  };
}

export function openAdvancedFilters(session) {
  assertAdvancedBeyondBasic(session.catalog);

  return {
    ...cloneSession(session),
    advancedPanelOpen: true,
  };
}

export function listAdvancedFilterControls(session) {
  return (session.catalog.advanced ?? []).map((filter) => ({ ...filter }));
}

export function listBasicFilterControls(session) {
  return (session.catalog.basic ?? []).map((filter) => ({ ...filter }));
}

export function applyAdvancedFilters(session, selections) {
  if (!session.advancedPanelOpen) {
    throw new Error('Advanced filters panel is not open');
  }

  const activeAdvancedFilters = normalizeSelections(session.catalog, selections);

  return {
    ...cloneSession(session),
    activeAdvancedFilters,
  };
}

export function clearAdvancedFilters(session) {
  return {
    ...cloneSession(session),
    activeAdvancedFilters: {},
  };
}

export function activeFilterSelections(session) {
  return Object.entries(session.activeAdvancedFilters).map(([id, value]) => {
    const filter = session.catalog.advanced.find((item) => item.id === id);
    return {
      id,
      label: filter?.label ?? id,
      value,
    };
  });
}

export function selectCurrency(session, code) {
  const currency = findCurrency(code);
  if (!currency) {
    throw new Error(`Currency not found: ${code}`);
  }

  return {
    ...cloneSession(session),
    selectedCurrency: currency.code,
  };
}

export function getResultPrices(session) {
  return visibleStays(session).map((stay) => ({
    id: stay.id,
    name: stay.name,
    price: priceForStay(session, stay),
  }));
}

export function openStayDetails(session, stayId) {
  const stay = session.stays.find((item) => item.id === stayId);
  if (!stay) {
    throw new Error(`Stay not found: ${stayId}`);
  }

  return {
    session: {
      ...cloneSession(session),
      view: 'details',
      selectedStayId: stayId,
    },
    stay: {
      id: stay.id,
      name: stay.name,
      price: priceForStay(session, stay),
    },
  };
}

export function backToResults(session) {
  return {
    ...cloneSession(session),
    view: 'results',
    selectedStayId: null,
  };
}
