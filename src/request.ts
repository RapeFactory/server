import { IncomingMessage, ServerResponse } from 'http';

import router from './router';

export default function requestListener(
  req: IncomingMessage,
  res: ServerResponse,
): void {
  router({ req, res });
}
