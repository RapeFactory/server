import http, { IncomingMessage, ServerResponse } from 'http';
import requestListener from './request';

const PORT = 1337;
const HOST = 'localhost';

type requestListener = (req: IncomingMessage, res: ServerResponse) => void;

class MyServer extends http.Server {
  constructor(requestListener?: requestListener) {
    super(requestListener);
  }

  start() {
    this.listen(PORT, HOST, () =>
      console.log(`Server start on ${HOST}:${PORT}`),
    );
  }
}

const server = new MyServer();
server.on('request', requestListener);

export default server;
