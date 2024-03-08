export class ChatWebSocket {
  private static instance: ChatWebSocket;
  private wsInstance: WebSocket;

  private constructor(url: string) {
    this.wsInstance = new WebSocket(url);
  }

  public static getInstance(url: string): ChatWebSocket {
    if (!ChatWebSocket.instance) {
      ChatWebSocket.instance = new ChatWebSocket(url);
    }

    return ChatWebSocket.instance;
  }

  public emit<T>(event: string, data: T) {
    const msg = {
      event,
      data,
    };
    this.wsInstance.send(JSON.stringify(msg));
  }
  public on<T>(event: string): T {
    let msg: T = undefined as T;
    this.wsInstance.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.event === event) {
        msg = data;
      }
    };
    return msg;
  }
}

const t1 = ChatWebSocket.getInstance('ws://some-api-ws/ws');
