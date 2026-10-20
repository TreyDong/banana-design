'use strict';

// Original local layout engine. Learn from component-to-image workflows without
// copying repository templates or adding a server, remote fonts or dependencies.
const FONT = '"PingFang SC", "Microsoft YaHei", Arial, sans-serif';
const GREEN = '#a8f52b';
const COPY_KEYS = ['badge', 'headline', 'highlight', 'cardTitle', 'cardMain', 'cardNote'];

function normalizeCopy(value = {}, title = '') {
  const fallback = { badge: '文章拆解', headline: title, highlight: '', cardTitle: '核心观点', cardMain: '', cardNote: '', benefits: ['', '', ''], cardImage: '' };
  const result = {};
  for (const key of COPY_KEYS) result[key] = typeof value[key] === 'string' ? value[key].trim() : fallback[key];
  result.benefits = Array.from({ length: 3 }, (_, i) => typeof value.benefits?.[i] === 'string' ? value.benefits[i].trim() : '');
  result.cardImage = typeof value.cardImage === 'string' ? value.cardImage : '';
  return result;
}

function validateCopy(copy) {
  if (!copy.headline?.trim()) throw new Error('请填写封面大字');
  if (!copy.cardImage && !copy.cardMain?.trim()) throw new Error('请填写卡片内容或选择卡片图片');
  for (const key of COPY_KEYS) if (copy[key]?.length > 300) throw new Error('封面文案过长，请精简「' + ({ badge: '角标', headline: '封面大字', highlight: '强调词', cardTitle: '卡片标题', cardMain: '卡片内容', cardNote: '卡片备注' })[key] + '」');
  if (copy.benefits.some(t => t.length > 100)) throw new Error('底部要点过长，请精简');
}

function parseCopyPlan(raw, title) {
  let value;
  try { value = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')); } catch (_) { throw new Error('文案格式不完整，请重试'); }
  if (!value || typeof value.idea !== 'string' || !value.idea.trim() || !value.copy || typeof value.copy.headline !== 'string' || typeof value.copy.cardMain !== 'string') throw new Error('文案缺少标题或卡片内容，请重试');
  const copy = normalizeCopy(value.copy, title);
  // A model cannot select arbitrary vault assets or introduce image URLs.
  copy.cardImage = '';
  validateCopy(copy);
  return { idea: value.idea.trim(), copy };
}

function wrapText(ctx, text, width) {
  const lines = [];
  for (const paragraph of String(text).split('\n')) {
    let line = '';
    for (const ch of Array.from(paragraph)) {
      if (line && ctx.measureText(line + ch).width > width && !/[，。！？、：；）】》,.!?;:]/.test(ch)) { lines.push(line); line = ch; }
      else line += ch;
    }
    lines.push(line);
  }
  return lines;
}

function textLayout(ctx, text, box, maxSize, weight = 900, lineHeight = 1.13) {
  if (!text) return { lines: [], size: maxSize, lineHeight: maxSize * lineHeight };
  for (let size = Math.floor(maxSize); size >= 6; size--) {
    ctx.font = weight + ' ' + size + 'px ' + FONT;
    // Explicit line breaks are an editorial choice: shrink to fit those lines
    // instead of leaving a single Chinese character stranded on the next line.
    const lines = text.includes('\n') ? text.split('\n') : wrapText(ctx, text, box.w);
    if (lines.length * size * lineHeight <= box.h && lines.every(line => ctx.measureText(line).width <= box.w)) return { lines, size, lineHeight: size * lineHeight };
  }
  throw new Error('此尺寸无法完整容纳文案，请缩短文字或增大画幅');
}

function drawText(ctx, text, box, maxSize, color = '#fff', options = {}) {
  const { weight = 900, highlight = '', valign = 'top', lineHeight = 1.13 } = options;
  const fit = textLayout(ctx, text, box, maxSize, weight, lineHeight);
  ctx.font = weight + ' ' + fit.size + 'px ' + FONT;
  ctx.textBaseline = 'top';
  const startY = box.y + (valign === 'center' ? (box.h - fit.lines.length * fit.lineHeight) / 2 : 0);
  fit.lines.forEach((line, i) => {
    let x = box.x, cursor = 0;
    while (cursor < line.length) {
      const at = highlight ? line.indexOf(highlight, cursor) : -1;
      const end = at < 0 ? line.length : at;
      const normal = line.slice(cursor, end);
      ctx.fillStyle = color; ctx.fillText(normal, x, startY + i * fit.lineHeight); x += ctx.measureText(normal).width;
      if (at < 0) break;
      ctx.fillStyle = GREEN; ctx.fillText(highlight, x, startY + i * fit.lineHeight); x += ctx.measureText(highlight).width; cursor = at + highlight.length;
    }
  });
  return fit;
}

function roundRect(ctx, x, y, w, h, radius, color) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}

function layoutBoxes(w, h) {
  const ratio = w / h;
  if (!Number.isFinite(ratio) || ratio < 0.5 || ratio > 3) throw new Error('大字卡片模板适合 1:2 至 3:1 画幅，请调整尺寸');
  const margin = w * 0.05, wide = ratio >= 1.35;
  return {
    wide, margin,
    badge: { x: margin, y: h * 0.075, w: wide ? w * 0.27 : w * 0.46, h: h * (wide ? 0.09 : 0.055) },
    headline: { x: margin, y: h * (wide ? 0.255 : 0.16), w: wide ? w * 0.55 : w - 2 * margin, h: h * (wide ? 0.43 : 0.275) },
    card: { x: wide ? w * 0.65 : margin, y: h * (wide ? 0.12 : 0.49), w: wide ? w * 0.30 : w - 2 * margin, h: h * (wide ? 0.64 : 0.33) },
    footer: { x: margin, y: h * (wide ? 0.84 : 0.90), w: w - 2 * margin, h: h * (wide ? 0.09 : 0.06) },
  };
}

function drawBenefitIcon(ctx, x, y, r, index) {
  ctx.strokeStyle = GREEN; ctx.lineWidth = Math.max(1, r * 0.085);
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  const a = r * 0.45;
  if (index === 0) { ctx.strokeRect(x - a, y - a, a * 2, a * 2); ctx.beginPath(); ctx.moveTo(x, y - a); ctx.lineTo(x, y + a); ctx.moveTo(x - a, y); ctx.lineTo(x + a, y); ctx.stroke(); }
  else if (index === 1) { ctx.beginPath(); ctx.moveTo(x - a, y + a); ctx.lineTo(x - a, y - a); ctx.lineTo(x + a, y - a); ctx.moveTo(x - a, y + a); ctx.lineTo(x + a, y + a); ctx.lineTo(x + a, y - a); ctx.moveTo(x - a * 0.4, y); ctx.lineTo(x + a * 0.4, y); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(x - a, y); ctx.lineTo(x - a * 0.15, y + a); ctx.lineTo(x + a, y - a); ctx.stroke(); }
}

async function decodeImage(buf) {
  const url = URL.createObjectURL(new Blob([buf]));
  try { const img = new Image(); await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = () => reject(new Error('卡片图片无法读取')); img.src = url; }); return img; }
  finally { URL.revokeObjectURL(url); }
}

async function renderNeonCover(copyInput, w, h, imageBuffer) {
  const copy = normalizeCopy(copyInput); validateCopy(copy);
  const boxes = layoutBoxes(w, h);
  // Native Chromium canvas renders installed Chinese fonts; wait for ready fonts.
  if (document.fonts?.ready) await document.fonts.ready;
  const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('本机画布无法初始化');
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
  const edge = Math.max(2, w * 0.008);
  roundRect(ctx, edge, edge, w - edge * 2, h - edge * 2, w * 0.025, '#070a08');
  const b = boxes.badge;
  if (copy.badge) {
    // Original brush-like tag, no dependency on external artwork.
    ctx.fillStyle = GREEN; ctx.beginPath(); ctx.moveTo(b.x, b.y + b.h * 0.1); ctx.lineTo(b.x + b.w * 0.97, b.y); ctx.lineTo(b.x + b.w, b.y + b.h * 0.80); ctx.lineTo(b.x + b.w * 0.12, b.y + b.h); ctx.lineTo(b.x - b.h * 0.07, b.y + b.h * 0.76); ctx.closePath(); ctx.fill();
    drawText(ctx, copy.badge, { x: b.x + b.h * 0.20, y: b.y + b.h * 0.12, w: b.w - b.h * 0.40, h: b.h * 0.8 }, b.h * 0.68, '#071004', { valign: 'center' });
  }
  drawText(ctx, copy.headline, boxes.headline, w * (boxes.wide ? 0.084 : 0.104), '#fff', { highlight: copy.highlight, valign: 'center', lineHeight: 1.08 });
  const underY = boxes.headline.y + boxes.headline.h + h * 0.035;
  ctx.fillStyle = GREEN; ctx.fillRect(boxes.headline.x, underY, boxes.headline.w * 0.87, Math.max(2, h * 0.007));

  const c = boxes.card, pad = c.w * 0.09;
  ctx.save(); ctx.translate(c.x + c.w / 2, c.y + c.h / 2); ctx.rotate(-0.025); ctx.translate(-c.w / 2, -c.h / 2);
  ctx.shadowColor = '#a8f52b50'; ctx.shadowBlur = w * 0.02;
  roundRect(ctx, 0, 0, c.w, c.h, w * 0.014, '#f8fbf6'); ctx.shadowBlur = 0;
  drawText(ctx, copy.cardTitle, { x: pad, y: c.h * 0.07, w: c.w - pad * 2, h: c.h * 0.12 }, Math.min(w * 0.024, c.h * 0.07), '#53604b', { weight: 700 });
  const cardBody = { x: pad, y: c.h * 0.23, w: c.w - pad * 2, h: c.h * 0.48 };
  if (imageBuffer) {
    const img = await decodeImage(imageBuffer), scale = Math.min(cardBody.w / img.naturalWidth, cardBody.h / img.naturalHeight);
    ctx.drawImage(img, cardBody.x + (cardBody.w - img.naturalWidth * scale) / 2, cardBody.y + (cardBody.h - img.naturalHeight * scale) / 2, img.naturalWidth * scale, img.naturalHeight * scale);
  } else drawText(ctx, copy.cardMain, cardBody, w * (boxes.wide ? 0.045 : 0.066), '#131a10', { valign: 'center' });
  ctx.fillStyle = '#cde9b3'; ctx.fillRect(pad, c.h * 0.79, c.w - 2 * pad, Math.max(1, w * 0.0015));
  drawText(ctx, copy.cardNote, { x: pad, y: c.h * 0.84, w: c.w - 2 * pad, h: c.h * 0.10 }, Math.min(w * 0.022, c.h * 0.058), '#39812b', { weight: 700 });
  ctx.restore();
  const f = boxes.footer, items = copy.benefits.filter(Boolean);
  items.forEach((text, i) => {
    const width = f.w / items.length, r = Math.min(width * 0.07, f.h * 0.38), x = f.x + width * i;
    drawBenefitIcon(ctx, x + r, f.y + f.h / 2, r, i);
    drawText(ctx, text, { x: x + r * 2.65, y: f.y, w: width - r * 3.4, h: f.h }, w * 0.026, '#e8eee2', { weight: 700, valign: 'center' });
  });
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('封面导出失败');
  return Buffer.from(await blob.arrayBuffer());
}

module.exports = { normalizeCopy, validateCopy, parseCopyPlan, wrapText, textLayout, layoutBoxes, renderNeonCover };
