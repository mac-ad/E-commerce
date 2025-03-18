import { useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin';
import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin';
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph';
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading';
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list';
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list';
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list';
import { FormatCodeBlock } from '@/components/editor/plugins/toolbar/block-format/format-code-block';
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote';
import { Separator } from '@/components/ui/separator';
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin';
import { FontFamilyToolbarPlugin } from '@/components/editor/plugins/toolbar/font-family-toolbar-plugin';
import { FontSizeToolbarPlugin } from '@/components/editor/plugins/toolbar/font-size-toolbar-plugin';
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin';
import { BlockInsertPlugin } from '@/components/editor/plugins/toolbar/block-insert-plugin';
import { InsertTable } from '@/components/editor/plugins/toolbar/block-insert/insert-table';
import { TableCellResizerPlugin } from '@/components/editor/plugins/table-cell-resizer-plugin';
import { TableHoverActionsPlugin } from '@/components/editor/plugins/table-hover-actions-plugin';
import { TableActionMenuPlugin } from '@/components/editor/plugins/table-action-menu-plugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'

export function Plugins({placeholder}: {placeholder: string}) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative">
      {/* toolbar plugins */}
      <ToolbarPlugin>
      {
        ({ blockType }) => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <Separator orientation="vertical" className="h-8" />
            <BlockFormatDropDown>
              <FormatParagraph />
              {/* <FormatHeading levels={['h1', 'h2', 'h3']} /> */}
              {/* <FormatNumberedList />
              <FormatBulletedList />
              <FormatCheckList /> */}
              {/* <FormatCodeBlock /> */}
              {/* <FormatQuote /> */}
            </BlockFormatDropDown>
            {
                blockType !== 'code' && (
                  <>
                    {/* <FontFamilyToolbarPlugin /> */}
                    {/* <FontSizeToolbarPlugin /> */}
                    <FontFormatToolbarPlugin format="bold" />
                    <FontFormatToolbarPlugin format="italic" />
                    <FontFormatToolbarPlugin format="underline" />
                    <FontFormatToolbarPlugin format="strikethrough" />
                    <Separator orientation="vertical" className="h-8" />
                    <BlockInsertPlugin>
                      <InsertTable />
                    </BlockInsertPlugin>
                  </>
                )
            }
          </div>
        )
      }
      
      </ToolbarPlugin>
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable placeholder={placeholder} className='ContentEditable__root relative block min-h-30 overflow-auto min-h-full px-8 py-4 focus:outline-none h-[300px]' />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
        <TableCellResizerPlugin />
        <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
        <TableActionMenuPlugin
          anchorElem={floatingAnchorElem}
          cellMerge={true}
        />
        <TablePlugin />
      </div>
      {/* actions plugins */}
    </div>
  );
}
