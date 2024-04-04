# html-mrkdwn-lite

Lightweight HTML to Slack [mrkdwn](https://api.slack.com/docs/message-formatting) converter.

Uses the zero-dependency [dom-parser](https://www.npmjs.com/package/dom-parser) package.

## Installation

    npm install html-mrkdwn-lite

## Usage

```typescript
import { convert } from 'html-mrkdwn-lite';

const html = `<p><strong>Hello</strong> <a href="https://example.com">world</a>!</p>
<p><img src="https://media.giphy.com/media/5xtDarEbygs3Pu7p3jO/giphy.gif"></p>`

const output = convert(html);
// {
//   text: "*Hello* <https://example.com|world>!",
//   image: "https://media.giphy.com/media/5xtDarEbygs3Pu7p3jO/giphy.gif",
// }
```

## Contributing

Issues and pull requests are welcome!
