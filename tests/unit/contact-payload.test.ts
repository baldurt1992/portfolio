import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseContactPayload } from '../../shared/contact-payload.ts'

describe('parseContactPayload', () => {
  const valid = {
    name: 'Andrés',
    email: 'lead@example.com',
    message: 'Hola, quiero una landing',
    token: 'turnstile-token'
  }

  it('accepts a valid payload', () => {
    const result = parseContactPayload(valid)
    assert.equal(result.ok, true)
    if (result.ok) {
      assert.equal(result.data.email, 'lead@example.com')
    }
  })

  it('rejects header injection in name', () => {
    const result = parseContactPayload({
      ...valid,
      name: 'Ada\r\nBcc: evildoer@example.com'
    })
    assert.equal(result.ok, true)
    if (result.ok) {
      assert.equal(result.data.name.includes('\n'), false)
      assert.equal(result.data.name.includes('\r'), false)
    }
  })

  it('rejects missing token', () => {
    const result = parseContactPayload({ ...valid, token: '  ' })
    assert.deepEqual(result, { ok: false, error: 'token_required' })
  })

  it('rejects invalid email', () => {
    const result = parseContactPayload({ ...valid, email: 'not-an-email' })
    assert.deepEqual(result, { ok: false, error: 'invalid_payload' })
  })

  it('rejects oversized message', () => {
    const result = parseContactPayload({ ...valid, message: 'x'.repeat(4001) })
    assert.deepEqual(result, { ok: false, error: 'invalid_payload' })
  })
})
