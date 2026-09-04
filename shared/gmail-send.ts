const LOG_TAG = '[GmailSend]'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'

export interface GmailOAuthCredentials {
  clientId: string
  clientSecret: string
  refreshToken: string
}

async function refreshAccessToken(credentials: GmailOAuthCredentials): Promise<string> {
  const body = new URLSearchParams({
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
    refresh_token: credentials.refreshToken,
    grant_type: 'refresh_token'
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  })

  if (!res.ok) {
    console.error(
      JSON.stringify({ tag: LOG_TAG, message: 'refresh token falló', status: res.status })
    )
    throw new Error('gmail_token_refresh_failed')
  }

  const data = (await res.json()) as { access_token?: string }
  if (!data.access_token) {
    console.error(JSON.stringify({ tag: LOG_TAG, message: 'refresh sin access_token' }))
    throw new Error('gmail_token_refresh_failed')
  }

  return data.access_token
}

export async function sendGmailRawMessage(
  credentials: GmailOAuthCredentials,
  raw: string
): Promise<void> {
  const accessToken = await refreshAccessToken(credentials)

  const res = await fetch(SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  })

  if (!res.ok) {
    console.error(
      JSON.stringify({ tag: LOG_TAG, message: 'messages.send falló', status: res.status })
    )
    throw new Error('gmail_send_failed')
  }
}
