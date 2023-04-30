import { sdk } from '../../utils';

const TEST_MESSAGE = {
  chatId: '644140dd8a960216b30324ca',
  message: 'inv',
  seenBy: [''],
  sender: 'igor',
  userId: '644140dd8a960216b30324ca',
};

const messageIds: string[] = [];

describe('POST /message', () => {
  afterAll(async () => {
    messageIds.forEach(async (id) => {
      await sdk.messageApi.messageControllerDeleteMessage(id);
    });
  });
  it('should create a message', async () => {
    const res = await sdk.messageApi.messageControllerCreateMessage(
      TEST_MESSAGE
    );
    const {
      data: { _id },
    } = res;
    messageIds.push(_id);
    for (const key in TEST_MESSAGE) {
      expect(res.data[key]).toEqual(TEST_MESSAGE[key]);
    }
  });
});
