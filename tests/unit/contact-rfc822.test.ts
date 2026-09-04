import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildContactRfc822 } from '../../shared/contact-rfc822.ts'

describe('buildContactRfc822', () => {
  it('encodes a non-ASCII subject and keeps Reply-To as the visitor', () => {
    const raw = buildContactRfc822({
      fromEmail: 'contact@baldurdev.com',
      fromName: 'Baldur Dev',
      to: 'contact@baldurdev.com',
      replyTo: 'lead@example.com',
      subject: 'Contacto desde el sitio — Andrés',
      text: 'Hola\n\n— Andrés\nlead@example.com'
    })

    assert.match(raw, /Reply-To: lead@example\.com/)
    assert.match(raw, /Subject: =\?UTF-8\?B\?/)
    assert.equal(raw.includes('\n\n'), false)
  })
})
