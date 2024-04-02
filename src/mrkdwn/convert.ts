import {
  Node,
  getFirstImageUrl,
  isElement,
  isEmpty,
  isText,
  normalizeWhitespace,
  parseFromString,
} from '../dom';
import { MrkdwnType } from './types';
import { Rule, defaultRule, rules } from './rules';

export function convert(html: string = '') {
  let [text, image] = ['', ''];
  if (html !== '') {
    const dom = parseFromString(`<div id="_root">${html}</div>`);
    const root = dom.getElementById('_root')!;
    text = process(root).trim();
    image = getFirstImageUrl(dom);
  }
  return { text, image };
}

// private

function process(parentNode: Node): string {
  const children = parentNode.childNodes;
  return children.reduce((output, node) => {
    const replacement = replace(node);
    return output + replacement;
  }, '');
}

function replace(node: Node) {
  if (isEmpty(node)) return '';
  if (isText(node)) return normalizeWhitespace(node.textContent);
  else if (isElement(node)) {
    const content = process(node);
    const { replacement, type } = getRule(node);
    const replaced = replacement(content, node);
    return type === MrkdwnType.block || type === MrkdwnType.container
      ? '\n' + replaced.trim() + '\n'
      : replaced;
  }
}

function getRule(node: Node): Rule {
  const nodeName = node.nodeName;
  const nodeRule = rules.find((rule) => {
    return rule.tags.includes(nodeName);
  });
  return nodeRule || defaultRule;
}
