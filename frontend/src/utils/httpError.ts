class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: string
  ) {
    super(`${status} - ${statusText}`)
    this.name = 'HttpError'
  }
}

export default HttpError
