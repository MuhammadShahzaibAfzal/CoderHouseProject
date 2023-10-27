class ErrorHandlerService extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static notFound(message = "Not Found") {
    return new ErrorHandlerService(404, message);
  }

  static unAuthorized(message = "Un Authorized") {
    return new ErrorHandlerService(401, message);
  }

  static badRequest(message = "Bad Request") {
    return new ErrorHandlerService(400, message);
  }

  static forbidden(message = "Not Allowed") {
    return new ErrorHandlerService(403, message);
  }

  static validationError(message = "All fields are required") {
    return new ErrorHandlerService(422, message);
  }
}

export default ErrorHandlerService;
