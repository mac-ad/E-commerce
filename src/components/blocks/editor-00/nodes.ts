import { Klass, LexicalNode, LexicalNodeReplacement, ParagraphNode, TextNode } from 'lexical'
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ]
