import {EmailDoc, MailElement, Block} from '../model/maileditor.model';

function renderElement(el: MailElement): string {
  switch (el.kind) {
    case 'heading':
      // mjml n’a pas de <mj-heading>, on utilise <mj-text> avec font-size/weight
      return `<mj-text align="${el.align ?? 'left'}" font-weight="700" font-size="${
        el.level === 1 ? 24 : el.level === 2 ? 20 : el.level === 3 ? 18 : 16
      }px">${escapeText(el.text)}</mj-text>`;
    case 'text':
      return `<mj-text align="${el.align ?? 'left'}">${el.html}</mj-text>`;
    case 'image':
      return `<mj-image src="${escapeAttr(el.src)}" alt="${escapeAttr(el.alt ?? '')}"${el.href ? ` href="${escapeAttr(el.href)}"` : ''} />`;
    case 'link':
      return `<mj-text><a href="${escapeAttr(el.href)}">${escapeText(el.text)}</a></mj-text>`;
    case 'button':
      return `<mj-button align="${el.align ?? 'left'}" href="${escapeAttr(el.href)}">${escapeText(el.text)}</mj-button>`;
  }
}

function renderBlock(block: Block): string {
  const cols = block.columns
    .map(c => `<mj-column>${c.elements.map(renderElement).join('')}</mj-column>`)
    .join('');
  const attrs = [
    block.backgroundColor ? `background-color="${block.backgroundColor}"` : '',
    block.padding ? `padding="${block.padding}"` : '',
  ].filter(Boolean).join(' ');
  return `<mj-section ${attrs}>${cols}</mj-section>`;
}

export function renderMjml(doc: EmailDoc): string {
  const body = doc.blocks.map(renderBlock).join('');
  return `
<mjml>
  <mj-head>
    <mj-title>${escapeText(doc.subject || 'Untitled')}</mj-title>
    <mj-attributes>
      <mj-text font-family="Helvetica, Arial, sans-serif" />
      <mj-button font-family="Helvetica, Arial, sans-serif" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#f4f5f7">
    ${body || '<mj-section><mj-column><mj-text>Commence ici…</mj-text></mj-column></mj-section>'}
  </mj-body>
</mjml>`.trim();
}

function escapeText(s: string) {
  return (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s: string) {
  return escapeText(s).replace(/"/g, '&quot;');
}
