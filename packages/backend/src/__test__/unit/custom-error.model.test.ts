import { CustomError } from '../../utils/custom-error.model';

describe('CustomError new instance', () => {
  const error = new CustomError('Bad', 404);
  it('errorMsg should be Bad', () => {
    expect(error.Message).toBe('Bad');
  });

  it('status should be 404', () => {
    expect(error.status).toBe(404);
  });
});

const obj = [
  {
    type: 'badRequest',
    message: 'Bad request',
    status: 400,
  },
  {
    type: 'conflict',
    message: 'Something went wrong',
    status: 409,
  },
  {
    type: 'forbidden',
    message: 'Forbidden',
    status: 403,
  },
  {
    type: 'internal',
    message: 'Internal server error',
    status: 500,
  },
  {
    type: 'unauthorized',
    message: 'Not permitted',
    status: 401,
  },
  {
    type: 'notFound',
    message: 'Not found',
    status: 404,
  },
];

describe('CustomError static methods', () => {
  obj.forEach((element) => {
    test(`CustomError.${element.type}(${element.message})`, () => {
      const type = element.type;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(CustomError[type](element.message)).toEqual({
        Message: element.message,
        status: element.status,
      });
    });
  });
});