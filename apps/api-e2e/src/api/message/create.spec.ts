import { isAxiosError } from 'axios';
import { sdk } from '../../utils';

describe('GET /message', () => {
  it('should return not found', async () => {
    const res = await sdk.messageControllerCreateMessage({
      chatId: '644140dd8a960216b30324ca',
      message: 'inv',
      seenBy: [''],
      sender: 'igor',
      userId: '644140dd8a960216b30324ca',
    });
    console.log(res);
    expect(res.data).toBe(undefined);
  });
});
