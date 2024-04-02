import { Node, isElement } from '../dom';
import { MrkdwnType } from './types';

export interface Rule {
  tags: string[];
  type: MrkdwnType;
  replacement: (content: string, node: Node) => string;
}

export const defaultRule: Rule = {
  tags: [],
  type: MrkdwnType.inline,
  replacement: (content: string) => content,
};

export const rules: Rule[] = [
  {
    tags: ['p'],
    type: MrkdwnType.block,
    replacement: (content: string) => content,
  },
  {
    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    type: MrkdwnType.block,
    replacement: (content: string) => '*' + content + '*',
  },
  {
    tags: ['strong', 'b'],
    type: MrkdwnType.inline,
    replacement: (content: string) => '*' + content + '*',
  },
  {
    tags: ['em', 'i'],
    type: MrkdwnType.inline,
    replacement: (content: string) => '_' + content + '_',
  },
  {
    tags: ['del', 'strike'],
    type: MrkdwnType.inline,
    replacement: (content: string) => '~' + content + '~',
  },
  {
    tags: ['code'],
    type: MrkdwnType.inline,
    replacement: (content: string, node: Node) => '`' + node.textContent + '`',
  },
  {
    tags: ['pre'],
    type: MrkdwnType.container,
    replacement: (content: string, node: Node) => {
      const fence = '```';
      const firstElement = node.childNodes.find(isElement);
      return firstElement?.nodeName === 'code'
        ? [fence, firstElement.textContent, fence].join('\n')
        : content;
    },
  },
  {
    tags: ['blockquote'],
    type: MrkdwnType.container,
    replacement: (content: string) => {
      content = content.trim();
      content = content.replace(/^/gm, '> ');
      return content;
    },
  },
  {
    tags: ['ul', 'ol'],
    type: MrkdwnType.container,
    replacement: (content: string) => content,
  },
  {
    tags: ['li'],
    type: MrkdwnType.inline,
    replacement: (content: string, node: Node) => {
      let prefix = '• ';
      const parent = node.parentNode;
      if (parent?.nodeName === 'ol') {
        const start = parent.getAttribute('start');
        const siblings = parent.childNodes.filter(isElement);
        const index = siblings.indexOf(node);
        prefix = (parseInt(start) || 1) + index + '. ';
      }
      return prefix + content.trim() + '\n';
    },
  },
  {
    tags: ['br', 'hr'],
    type: MrkdwnType.inline,
    replacement: (content: string) => '\n',
  },
  {
    tags: ['img'],
    type: MrkdwnType.inline,
    replacement: (content: string) => '',
  },
  {
    tags: ['a'],
    type: MrkdwnType.inline,
    replacement: (content: string, node: Node) => {
      var href = node.getAttribute('href');
      return `<${href}|${content}>`;
    },
  },
];
