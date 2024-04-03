import { Dom, Node, NodeType } from 'dom-parser';

export function isEmpty(node: Node) {
  const meaningful = ['br', 'hr'];
  return !meaningful.includes(node.nodeName) && !/\S/i.test(node.textContent);
}

export function isElement(node: Node) {
  return node.nodeType === NodeType.element;
}

export function isText(node: Node) {
  return node.nodeType === NodeType.text;
}

export function normalizeWhitespace(text: string) {
  const pattern = /[\f\n\r\t\v ]{2,}/g;
  return text.replace(pattern, ' ');
}

export function getFirstImageUrl(dom: Dom): string {
  const [img] = dom.getElementsByTagName('img');
  const url = img?.getAttribute('src') || '';
  return url;
}
