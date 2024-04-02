import { convert } from './mrkdwn';

const html: string = `<div class="user-content"><p>First paragraph</p><p>Need to <i>check</i> where <strong>ownership</strong> <br /><br>of <strike>this</strike> landed in the <a href="https://snyk.io">new org</a> structure</p></div>`;

const { text } = convert(html);

console.log(text);
