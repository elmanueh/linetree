import HttpError from '@/utils/httpError'

async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  return response.json()
}

async function post<T>(url: string, data: T): Promise<string | undefined> {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }

  const location = response.headers.get('Location')
  return location?.split('/').pop()
}

async function put<T>(url: string, data: T): Promise<void> {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }
}

async function patch<T>(url: string, data: T): Promise<void> {
  const response = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, response.statusText, error)
  }
}

async function del(url: string): Promise<void> {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
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
