class APIError extends Error {
  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static create(status, message, errors = []) {
    return new APIError(status, message, errors)
  }

  static unknownError() {
    return new APIError(500, 'Unknown error')
  }
}

export default APIError
