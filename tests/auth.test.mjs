import test from 'node:test';
import assert from 'node:assert/strict';
import { authConfigured, passwordMatches } from '../lib/auth.js';

test('admin password requires 12 characters while session secret still requires 32', () => {
  const previousPassword = process.env.ADMIN_PASSWORD;
  const previousSecret = process.env.SESSION_SECRET;
  try {
    process.env.SESSION_SECRET = 's'.repeat(32);
    process.env.ADMIN_PASSWORD = 'p'.repeat(11);
    assert.equal(authConfigured(), false);
    process.env.ADMIN_PASSWORD = 'p'.repeat(12);
    assert.equal(authConfigured(), true);
    assert.equal(passwordMatches('p'.repeat(12)), true);
    assert.equal(passwordMatches('incorrect-password'), false);
    process.env.SESSION_SECRET = 's'.repeat(31);
    assert.equal(authConfigured(), false);
  } finally {
    if (previousPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = previousPassword;
    if (previousSecret === undefined) delete process.env.SESSION_SECRET;
    else process.env.SESSION_SECRET = previousSecret;
  }
});
