import { isAxiosError } from 'axios';
import { sdk } from '../../utils';

describe('GET /message', () => {
  it('should return not found', async () => {
    sdk.messageControllerFindAll('644140dd8a960216b30324ca').catch((err) => {
      if (isAxiosError(err)) {
        console.log(err, 'IVAN4O');

        const {
          response: { status, data },
        } = err || {};
        expect(status).toEqual(404);
        expect(data).toEqual({
          error: 'Not Found',
        });
      }
    });
  });
});
