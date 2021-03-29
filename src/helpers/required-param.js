class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} cannot be null or undefined`)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError)
    }
  }
}

export default function requiredParam(param) {
  return new RequiredParameterError(param)
}
