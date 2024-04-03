import { convert } from './mrkdwn';

export function htmlToMrkdwn(html: string) {
  return convert(html);
}
