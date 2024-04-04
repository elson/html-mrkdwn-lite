import { Node, isElement } from '../dom';
import { BlockType } from './types';

export interface Rule {
  tags: string[];
  type: BlockType;
  replacement: (content: string, node: Node) => string;
}

export const defaultRule: Rule = {
  tags: [],
  type: BlockType.inline,
  replacement: (content: string) => content,
};

export const rules: Rule[] = [
  {
    tags: ['p'],
    type: BlockType.leaf,
    replacement: (content: string) => content,
  },
  {
    tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    type: BlockType.leaf,
    replacement: (content: string) => '*' + content + '*',
  },
  {
    tags: ['strong', 'b'],
    type: BlockType.inline,
    replacement: (content: string) => '*' + content + '*',
  },
  {
    tags: ['em', 'i'],
    type: BlockType.inline,
    replacement: (content: string) => '_' + content + '_',
  },
  {
    tags: ['del', 'strike'],
    type: BlockType.inline,
    replacement: (content: string) => '~' + content + '~',
  },
  {
    tags: ['code'],
    type: BlockType.inline,
    replacement: (content: string, node: Node) => '`' + node.textContent + '`',
  },
  {
    tags: ['pre'],
    type: BlockType.container,
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
    type: BlockType.container,
    replacement: (content: string) => {
      content = content.trim();
      content = content.replace(/^/gm, '> ');
      return content;
    },
  },
  {
    tags: ['ul', 'ol'],
    type: BlockType.container,
    replacement: (content: string) => content,
  },
  {
    tags: ['li'],
    type: BlockType.inline,
    replacement: (content: string, node: Node) => {
      let prefix = '• ';
      const parent = node.parentNode;
      if (parent?.nodeName === 'ol') {
        const start = parent.getAttribute('start');
        const siblings = parent.childNodes.filter(isElement);
        const index = siblings.indexOf(node);
        prefix = (parseInt(start, 10) || 1) + index + '. ';
      }
      return prefix + content.trim() + '\n';
    },
  },
  {
    tags: ['br', 'hr'],
    type: BlockType.inline,
    replacement: () => '\n',
  },
  {
    tags: ['img'],
    type: BlockType.inline,
    replacement: () => '',
  },
  {
    tags: ['a'],
    type: BlockType.inline,
    replacement: (content: string, node: Node) => {
      const href = node.getAttribute('href');
      return `<${href}|${content}>`;
    },
  },
];
