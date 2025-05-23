import HttpError from '@/utils/httpError'

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response.json()
}

async function post(
  url: string,
  data?: Record<string, unknown>
): Promise<Response> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response
}

async function put<T>(url: string, data: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response.json()
}

async function patch<T>(
  url: string,
  data: Record<string, unknown>
): Promise<T> {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response.json()
}

async function del(url: string): Promise<void> {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }
}

export const HttpService = { get, patch, post, put, del }
