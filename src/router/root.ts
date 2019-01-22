import { Context } from './index';

export default function(ctx: Context, params: { [key: string]: any }) {
  /*    if (message) {
        res.statusCode = 200;
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        });
        res.write(`<h1>${message}</h1>`);
        res.end(() => console.log(responseCounters++));
    } */

  return JSON.stringify(params);
}
