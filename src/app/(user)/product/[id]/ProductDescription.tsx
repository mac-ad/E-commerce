
const ProductDescription = ({description}: {description: string}) => {
  return (
    <div>
       <div
            dangerouslySetInnerHTML={{
                __html: JSON.parse(description)
                .root.children
                .map((node: any) => {
                    switch (node.type) {
                    case 'paragraph':
                        if (!node.children.length) return '<br/>';
                        return `<p class="text-base leading-relaxed">${node.children
                        .map((child: any) => {
                            let text = child.text || '';
                            const style = child.style || '';
                            
                            // Apply text formatting based on format flags
                            if (child.format) {
                            if (child.format & 1) text = `<strong>${text}</strong>`;
                            if (child.format & 2) text = `<em>${text}</em>`;
                            if (child.format & 4) text = `<del>${text}</del>`;
                            if (child.format & 8) text = `<u>${text}</u>`;
                            }
        
                            // Apply any inline styles
                            if (style) {
                            text = `<span style="${style}">${text}</span>`;
                            }
                            
                            return text;
                        })
                        .join('')}</p>`;
                    
                    case 'table':
                        return `
                        <table class="w-full border-collapse border-none border-gray-300 my-4">
                            <tbody>
                            ${node.children.map((row: any) => `
                                <tr>
                                ${row.children.map((cell: any) => {
                                    const content = cell.children[0].children
                                    .map((textNode: any) => {
                                        let text = textNode.text || '';
                                        const style = textNode.style || '';
                                        
                                        // Apply text formatting to table cells
                                        if (textNode.format) {
                                        if (textNode.format & 1) text = `<strong>${text}</strong>`;
                                        if (textNode.format & 2) text = `<em>${text}</em>`;
                                        if (textNode.format & 4) text = `<del>${text}</del>`;
                                        if (textNode.format & 8) text = `<u>${text}</u>`;
                                        }
        
                                        // Apply any inline styles
                                        if (style) {
                                        text = `<span style="${style}">${text}</span>`;
                                        }
                                        
                                        return text;
                                    })
                                    .join('');
                                    
                                    const isHeader = cell.headerState > 0;
                                    const cellClass = isHeader 
                                    ? 'border border-gray-300 p-2 font-semibold text-left whitespace-nowrap'
                                    : 'border border-gray-300 p-2';
                                    
                                    return `
                                    <${isHeader ? 'th' : 'td'} class="${cellClass}">
                                        ${content}
                                    </${isHeader ? 'th' : 'td'}>
                                    `;
                                }).join('')}
                                </tr>
                            `).join('')}
                            </tbody>
                        </table>
                        `;
                    
                    default:
                        return '';
                    }
                })
                .join('')
            }}
        />
    </div>
  )
}

export default ProductDescription
