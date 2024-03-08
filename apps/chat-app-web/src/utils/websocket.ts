type EventHandler = (
  event: Event | MessageEvent | CloseEvent | ErrorEvent
) => void;

export class WebSocketWrapper {
  private static instance: WebSocketWrapper | null = null;
  private socket: WebSocket | null = null;
  private eventHandlers: Map<string, EventHandler[]> = new Map();

  // Private constructor to ensure singleton pattern
  private constructor(private url: string) {}

  // Singleton access method
  public static getInstance(url: string): WebSocketWrapper {
    if (!WebSocketWrapper.instance) {
      WebSocketWrapper.instance = new WebSocketWrapper(url);
    }
    return WebSocketWrapper.instance;
  }

  // Simplified connection method with callback support for open/close events
  public connect(onOpen?: EventHandler, onClose?: EventHandler): void {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = (event) => {
        console.log('WebSocket is connected');
        onOpen?.(event);
      };

      this.socket.onmessage = (event) => {
        this.notifyHandlers('message', event);
      };

      this.socket.onerror = (event) => {
        this.notifyHandlers('error', event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket is disconnected');
        onClose?.(event);
        this.clearHandlers(); // Optional: Clear event handlers on close
      };
    }
  }

  // Send message method supporting different data types
  public sendMessage(data: string | ArrayBuffer | Blob): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.error('WebSocket is not connected or not ready.');
    }
  }

  // Close the WebSocket connection
  public disconnect(code?: number, reason?: string): void {
    this.socket?.close(code, reason);
  }

  // Register event handlers for 'message' and 'error' events
  public on(event: 'message' | 'error', handler: EventHandler): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)?.push(handler);
  }

  // Notify all registered handlers for a specific event
  private notifyHandlers(eventType: string, event: Event | MessageEvent): void {
    this.eventHandlers.get(eventType)?.forEach((handler) => handler(event));
  }

  // Optionally clear all event handlers, useful when the connection is closed
  private clearHandlers(): void {
    this.eventHandlers.clear();
  }

  // Expose the raw WebSocket for advanced use cases
  public get rawSocket(): WebSocket | null {
    return this.socket;
  }
}
