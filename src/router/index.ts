import url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import root from './root';
import big from './big';

function parseUrlQuery(query: string): { [key: string]: string } {
  if (query) {
    return query.split('&').reduce((obj, prop) => {
      const [param, value] = prop.split('=');
      return {
        ...obj,
        [decodeURIComponent(param)]: decodeURIComponent(value),
      };
    }, {});
  } else {
    return {};
  }
}

export type Context = { req: IncomingMessage; res: ServerResponse };

export default function({ req, res }: Context): void {
  const { pathname, query } = url.parse(req.url || '');
  const params = parseUrlQuery(query || '');

  if (pathname && routers.hasOwnProperty(pathname)) {
    const route = pathname || '/';
    const handler = routers[route];
    const data = handler({ req, res }, params);
    if (typeof data === 'string') res.end(data);
  } else {
    res.writeHead(404, 'Not Found', {
      'Content-Type': 'text/plane',
    });
    res.end('null');
  }
}

interface Routers {
  [key: string]: (ctx: Context, params: { [key: string]: string }) => void;
}

const routers: Routers = {
  '/': root,
  '/big': big,
};
