import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { resolveCanonicalRedirect } from '../../server/utils/resolveCanonicalRedirect.ts'

const apex = 'https://baldurdev.com'

describe('resolveCanonicalRedirect', () => {
  it('does not redirect an already canonical apex URL', () => {
    assert.equal(
      resolveCanonicalRedirect({
        host: 'baldurdev.com',
        pathname: '/showcase/',
        search: '',
        siteOrigin: apex
      }),
      null
    )
  })

  it('collapses www and missing slash in one hop', () => {
    assert.equal(
      resolveCanonicalRedirect({
        host: 'www.baldurdev.com',
        pathname: '/en/showcase',
        search: '?utm=gsc',
        siteOrigin: apex
      }),
      'https://baldurdev.com/en/showcase/?utm=gsc'
    )
  })

  it('adds a trailing slash on localhost without touching the host', () => {
    assert.equal(
      resolveCanonicalRedirect({
        host: 'localhost',
        pathname: '/showcase',
        search: '',
        siteOrigin: apex
      }),
      '/showcase/'
    )
  })

  it('skips hashed assets and XML routes', () => {
    assert.equal(
      resolveCanonicalRedirect({
        host: 'www.baldurdev.com',
        pathname: '/sitemap.xml',
        search: '',
        siteOrigin: apex
      }),
      null
    )
    assert.equal(
      resolveCanonicalRedirect({
        host: 'www.baldurdev.com',
        pathname: '/_nuxt/entry.js',
        search: '',
        siteOrigin: apex
      }),
      null
    )
  })
})
