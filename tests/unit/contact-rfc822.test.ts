import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildContactEmailHtml,
  buildContactEmailText
} from '../../shared/contact-email-template.ts'
import { buildContactRfc822 } from '../../shared/contact-rfc822.ts'

describe('buildContactRfc822', () => {
  it('sends multipart HTML+text and keeps Reply-To as the visitor', () => {
    const raw = buildContactRfc822({
      fromEmail: 'contact@baldurdev.com',
      fromName: 'BaldurDev',
      to: 'contact@baldurdev.com',
      replyTo: 'lead@example.com',
      subject: 'Contacto desde el sitio — Andrés',
      text: 'Hola',
      html: '<p>Hola</p>'
    })

    assert.match(raw, /Reply-To: lead@example\.com/)
    assert.match(raw, /Subject: =\?UTF-8\?B\?/)
    assert.match(raw, /multipart\/alternative/)
    assert.match(raw, /text\/html/)
    assert.equal(raw.includes('\n\n'), false)
  })
})

describe('buildContactEmailHtml', () => {
  it('escapes HTML in the visitor message', () => {
    const html = buildContactEmailHtml({
      name: 'Ada',
      email: 'ada@example.com',
      message: '<script>alert(1)</script>'
    })

    assert.equal(html.includes('<script>'), false)
    assert.match(html, /&lt;script&gt;/)
    assert.match(html, /BaldurDev/)
    assert.match(html, /#fb923c/)
  })
})

describe('buildContactEmailText', () => {
  it('includes name, email and message', () => {
    const text = buildContactEmailText({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Quiero una landing'
    })

    assert.match(text, /Ada/)
    assert.match(text, /ada@example.com/)
    assert.match(text, /Quiero una landing/)
  })
})
