export class CustomError {
  Message: string;
  status: number;

  /**
   * Creates a CustomError with status code , message and additionalInfo(optional)
   * @param {string} Message - The error message.
   * @param {number} status - The error status code.
   */
  constructor(Message: string, status: number) {
    this.Message = Message;
    this.status = status;
  }

  /**
   * Create error with status 400 and add message.
   * @param {string} msg - The error message.
   */
  static badRequest(msg = 'Bad Request') {
    return new CustomError(msg, 400);
  }

  /**
   * Create error with status 401 and add message.
   * @param {string} msg - The error message.
   */
  static unauthorized(msg: string) {
    return new CustomError(msg, 401);
  }

  /**
   * Create error with status 403 and add message.
   * @param {string} msg - The error message.
   */
  static forbidden(msg: string) {
    return new CustomError(msg, 403);
  }

  /**
   * Create error with status 404 and add message.
   * @param {string} msg - The error message.
   */
  static notFound(msg: string) {
    return new CustomError(msg, 404);
  }

  /**
   * Create error with status 409 and add message.
   * @param {string} msg - The error message.
   */
  static conflict(msg: string) {
    return new CustomError(msg, 409);
  }

  /**
   * Create error with status 500 and add message.
   * @param {string} msg - The error message.
   */
  static internal(msg: string) {
    return new CustomError(msg, 500);
  }
}
