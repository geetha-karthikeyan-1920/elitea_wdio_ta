import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createCheckout, openAddressBook, selectSavedAddress } from '../src/addressBook.js';

const addresses = [
  {
    id: 'addr-us-1',
    userId: 'user-1',
    recipient: 'Ada Lovelace',
    line1: '1 Market Street',
    line2: 'Suite 200',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
  },
  {
    id: 'addr-us-2',
    userId: 'user-1',
    recipient: 'Ada Lovelace',
    line1: '88 Pine Street',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'US',
  },
  {
    id: 'addr-ca',
    userId: 'user-1',
    recipient: 'Ada Lovelace',
    line1: '10 King Street',
    city: 'Toronto',
    state: 'ON',
    postalCode: 'M5H',
    country: 'CA',
  },
  {
    id: 'addr-other-user',
    userId: 'user-2',
    recipient: 'Grace Hopper',
    line1: '2 Navy Way',
    city: 'Arlington',
    state: 'VA',
    postalCode: '22202',
    country: 'US',
  },
];

function checkout() {
  return createCheckout({ userId: 'user-1', addresses });
}

test('opening the address book shows only the signed-in user US addresses', () => {
  const opened = openAddressBook(checkout());

  assert.equal(opened.addressBookOpen, true);
  assert.deepEqual(opened.visibleAddresses.map((address) => address.id), ['addr-us-1', 'addr-us-2']);
  assert.equal(opened.step, 'shipping');
});

test('selecting a saved address fills the shipping form and advances checkout', () => {
  const opened = openAddressBook(checkout());
  const selected = selectSavedAddress(opened, 'addr-us-1');

  assert.equal(selected.addressBookOpen, false);
  assert.equal(selected.selectedAddressId, 'addr-us-1');
  assert.equal(selected.step, 'payment');
  assert.deepEqual(selected.shippingForm, {
    recipient: 'Ada Lovelace',
    line1: '1 Market Street',
    line2: 'Suite 200',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
  });
});

test('an empty address book opens without advancing checkout', () => {
  const opened = openAddressBook(createCheckout({ userId: 'user-1', addresses: [] }));

  assert.equal(opened.addressBookOpen, true);
  assert.deepEqual(opened.visibleAddresses, []);
  assert.equal(opened.step, 'shipping');
});

test('missing user, missing book, unknown address, and incomplete address fail clearly', () => {
  assert.throws(() => createCheckout({ addresses }), /Signed-in user is missing/);
  assert.throws(() => createCheckout({ userId: 'user-1' }), /Address book is missing/);
  assert.throws(
    () => openAddressBook(createCheckout({ userId: 'user-1', addresses, step: 'cart' })),
    /Shipping address screen is not active/,
  );
  assert.throws(
    () => selectSavedAddress(checkout(), 'addr-us-1'),
    /Address book modal is not open/,
  );

  const opened = openAddressBook(checkout());
  assert.throws(() => selectSavedAddress(opened, 'addr-ca'), /Address not found: addr-ca/);
  assert.throws(
    () => selectSavedAddress(opened, 'addr-other-user'),
    /Address not found: addr-other-user/,
  );
  assert.throws(() => selectSavedAddress(opened, 'missing'), /Address not found: missing/);

  const incomplete = openAddressBook(createCheckout({
    userId: 'user-1',
    addresses: [{
      id: 'addr-bad',
      userId: 'user-1',
      line1: '1 Main Street',
      city: 'Austin',
      state: 'TX',
      postalCode: '',
      country: 'US',
    }],
  }));
  assert.throws(
    () => selectSavedAddress(incomplete, 'addr-bad'),
    /Address field is missing: postalCode/,
  );
});

test('address book lookup stays within the one second budget and does not read credentials', async () => {
  const book = Array.from({ length: 200 }, (_, index) => ({
    id: `addr-${index}`,
    userId: 'user-1',
    recipient: 'Ada Lovelace',
    line1: `${index} Market Street`,
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US',
  }));
  const started = Date.now();
  const opened = openAddressBook(createCheckout({ userId: 'user-1', addresses: book }));
  const elapsed = Date.now() - started;

  assert.equal(opened.visibleAddresses.length, 200);
  assert.ok(elapsed < 1000);

  const source = await readFile(path.join(process.cwd(), 'src', 'addressBook.js'), 'utf8');
  assert.equal(source.includes('process.env'), false);
  assert.equal(source.includes('JIRA_API_TOKEN'), false);
  assert.equal(source.includes('GITHUB_TOKEN'), false);
  assert.equal(JSON.stringify(opened.visibleAddresses[0]).includes('JIRA_API_TOKEN'), false);
});
