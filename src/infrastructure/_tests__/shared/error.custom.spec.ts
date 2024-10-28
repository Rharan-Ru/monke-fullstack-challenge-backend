import { CustomError } from '../../../shared/utils/error.custom';

describe('CustomError', () => {
  it('should create an error with the given message and status', () => {
    const errorMessage = 'Something went wrong';
    const statusCode = 400;

    const customError = new CustomError(errorMessage, statusCode);

    expect(customError.message).toBe(errorMessage);
    expect(customError.status).toBe(statusCode);
    expect(customError.name).toBe('CustomError');
  });

  it('should default to status 500 if no status is provided', () => {
    const errorMessage = 'Internal server error';

    const customError = new CustomError(errorMessage);

    expect(customError.status).toBe(500);
  });

  it('should be an instance of Error and CustomError', () => {
    const errorMessage = 'Something went wrong';

    const customError = new CustomError(errorMessage);

    expect(customError).toBeInstanceOf(Error);
    expect(customError).toBeInstanceOf(CustomError);
  });
});
