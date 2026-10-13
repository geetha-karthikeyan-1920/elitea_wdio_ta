import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  activeFilterSelections,
  applyAdvancedFilters,
  backToResults,
  clearAdvancedFilters,
  createSearchSession,
  getResultPrices,
  listAdvancedFilterControls,
  listBasicFilterControls,
  listSupportedCurrencies,
  openAdvancedFilters,
  openStayDetails,
  selectCurrency,
} from '../src/staysSearch.js';

const stays = [
  {
    id: 'stay-1',
    name: 'Harbor Hotel',
    freeCancellation: true,
    guestRating: 8.6,
    amenities: ['wifi', 'pool'],
    price: { amount: 100, currency: 'USD' },
  },
  {
    id: 'stay-2',
    name: 'City Inn',
    freeCancellation: false,
    guestRating: 7.2,
    amenities: ['wifi'],
    price: { amount: 80, currency: 'USD' },
  },
];

const rates = {
  'USD->EUR': 0.92,
  'USD->GBP': 0.78,
  'USD->JPY': 149.25,
  'USD->AED': 3.67,
};

function session() {
  return createSearchSession({ stays, rates });
}

test('advanced filters are additional controls and applying them updates results', () => {
  const opened = openAdvancedFilters(session());
  const basicIds = new Set(listBasicFilterControls(opened).map((filter) => filter.id));
  const advanced = listAdvancedFilterControls(opened);

  assert.equal(opened.advancedPanelOpen, true);
  assert.ok(advanced.length > 0);
  assert.ok(advanced.every((filter) => !basicIds.has(filter.id)));

  const filtered = applyAdvancedFilters(opened, {
    freeCancellation: true,
    amenity: 'pool',
  });
  const results = getResultPrices(filtered);

  assert.deepEqual(results.map((stay) => stay.id), ['stay-1']);
  assert.deepEqual(activeFilterSelections(filtered), [
    { id: 'freeCancellation', label: 'Free cancellation', value: true },
    { id: 'amenity', label: 'Amenity', value: 'pool' },
  ]);
  assert.equal(results[0].price.formatted, 'USD (840) 100.00');
});

test('clearing advanced filters restores the unfiltered result list', () => {
  const opened = openAdvancedFilters(session());
  const filtered = applyAdvancedFilters(opened, { minGuestRating: 8 });
  assert.deepEqual(getResultPrices(filtered).map((stay) => stay.id), ['stay-1']);

  const cleared = clearAdvancedFilters(filtered);
  const results = getResultPrices(cleared);

  assert.deepEqual(activeFilterSelections(cleared), []);
  assert.deepEqual(results.map((stay) => stay.id), ['stay-1', 'stay-2']);
});

test('currency selection displays story currency codes and persists across details navigation', () => {
  const currencies = listSupportedCurrencies();
  assert.deepEqual(
    currencies.map((currency) => currency.label),
    ['USD (840)', 'EUR (978)', 'GBP (826)', 'AED (784)', 'JPY (392)'],
  );

  const selected = selectCurrency(openAdvancedFilters(session()), 'EUR');
  const results = getResultPrices(selected);
  assert.equal(results[0].price.label, 'EUR (978)');
  assert.equal(results[0].price.formatted, 'EUR (978) 92.00');

  const details = openStayDetails(selected, 'stay-1');
  assert.equal(details.session.selectedCurrency, 'EUR');
  assert.equal(details.stay.price.formatted, 'EUR (978) 92.00');

  const returned = backToResults(details.session);
  assert.equal(returned.selectedCurrency, 'EUR');
  assert.equal(getResultPrices(returned)[1].price.formatted, 'EUR (978) 73.60');
});

test('missing stays, unknown filters, unknown currencies, and missing rates fail clearly', () => {
  assert.throws(() => createSearchSession(), /Stay results are missing/);

  const opened = openAdvancedFilters(session());
  assert.throws(
    () => applyAdvancedFilters(opened, { unknownFilter: true }),
    /Advanced filter not found: unknownFilter/,
  );
  assert.throws(
    () => applyAdvancedFilters(opened, { amenity: '' }),
    /Advanced filter value is missing: amenity/,
  );
  assert.throws(
    () => selectCurrency(opened, 'XYZ'),
    /Currency not found: XYZ/,
  );
  assert.throws(
    () => openStayDetails(opened, 'missing-stay'),
    /Stay not found: missing-stay/,
  );

  const noRates = selectCurrency(createSearchSession({ stays, rates: {} }), 'GBP');
  assert.throws(
    () => getResultPrices(noRates),
    /Currency rate not found: USD->GBP/,
  );

  const missingPrice = createSearchSession({
    stays: [{ id: 'stay-3', name: 'No Price', price: {} }],
    rates,
  });
  assert.throws(
    () => getResultPrices(openAdvancedFilters(missingPrice)),
    /Stay price is missing: stay-3/,
  );
});

test('applying filters before the panel is open is rejected', () => {
  assert.throws(
    () => applyAdvancedFilters(session(), { amenity: 'wifi' }),
    /Advanced filters panel is not open/,
  );
});

test('stays search output does not read or echo credentials', async () => {
  const source = await readFile(path.join(process.cwd(), 'src', 'staysSearch.js'), 'utf8');
  assert.equal(source.includes('process.env'), false);
  assert.equal(source.includes('JIRA_API_TOKEN'), false);
  assert.equal(source.includes('GITHUB_TOKEN'), false);

  const priced = getResultPrices(selectCurrency(session(), 'JPY'));
  const serialized = JSON.stringify(priced);
  assert.equal(serialized.includes('JIRA_API_TOKEN'), false);
  assert.equal(priced[0].price.formatted, 'JPY (392) 14925');
});
