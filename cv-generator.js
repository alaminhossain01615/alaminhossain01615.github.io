/**
 * cv-generator.js
 * Generates a PDF CV from DATA (data.js).
 * Layout closely matches a traditional professional CV.
 * You never need to touch this file — edit data.js only.
 */

async function downloadCV(e) {
  if (e) e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const D = DATA;

  const PW = 210, PH = 297;
  const ML = 20, MR = 20, TW = PW - ML - MR;
  let y = 0;

  // ── Palette ─────────────────────────────────────────────
  const INK  = [10,  10,  10 ];
  const INK2 = [40,  40,  40 ];
  const INK3 = [100, 100, 100];
  const RULE = [180, 180, 180];
  const WHT  = [255, 255, 255];

  // ── Line spacing constants (tight, like a real CV) ──────
  const LS_BODY   = 4.8;   // normal body line height (mm for 9pt)
  const LS_SMALL  = 4.2;   // small text
  const LS_HEAD   = 5.8;   // section heading line
  const BULLET_X  = ML + 3.5;
  const BODY_X    = ML + 5.5;

  // ── Helpers ──────────────────────────────────────────────
  function hRule(lw, color) {
    doc.setDrawColor(...(color || RULE));
    doc.setLineWidth(lw || 0.3);
    doc.line(ML, y, PW - MR, y);
  }

  function wrap(text, maxW, fs) {
    doc.setFontSize(fs || 9);
    return doc.splitTextToSize(String(text), maxW);
  }

  // Height of wrapped lines (in mm)
  function linesH(lines, lsMm) {
    return (Array.isArray(lines) ? lines.length : 1) * (lsMm || LS_BODY);
  }

  function checkPage(need) {
    if (y + (need || 18) > PH - 16) {
      doc.addPage();
      y = 18;
    }
  }

  // Print a bullet point with hanging indent
  function bullet(text, bodyW, fs) {
    const bl = wrap(text, bodyW - 1, fs || 9);
    checkPage(linesH(bl, LS_BODY) + 1.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fs || 9);
    doc.setTextColor(...INK2);
    // bullet glyph
    doc.text('•', ML + 1, y);
    // indented text
    doc.text(bl, BODY_X, y);
    y += linesH(bl, LS_BODY) + 0.8;
  }

  // ════════════════════════════════════════════════════════
  // HEADER — name block
  // ════════════════════════════════════════════════════════
  y = 18;

  // Name — large, bold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  doc.text(D.name, ML, y);
  y += 8;

  // Address line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK2);
  doc.text(D.address, ML, y);
  y += LS_BODY;

  // Phone + Email
  doc.text('Phone: ' + D.phone, ML, y);
  y += LS_BODY;
  doc.text('Email: ' + D.email, ML, y);
  y += LS_BODY;

// Clickable link buttons: LinkedIn | GitHub | Website
  const links = [
    { label: 'LinkedIn', url: D.linkedin },
    { label: 'GitHub',   url: D.github },
    { label: 'Website',  url: 'https://' + D.website.replace('https://', '') }
  ];
  
  let lx = ML;
  links.forEach((lk, i) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9); // Made slightly larger to match standard text readability
    doc.setTextColor(40, 100, 200); // Clean hyperlink blue
    
    // 1. Print the clean label and tie the interactive link to it
    doc.textWithLink(lk.label, lx, y, { url: lk.url });
    
    // Move our tracker past the label text
    lx += doc.getTextWidth(lk.label) + 1.5;
    
    // 2. Print the divider if it's not the last link
    if (i < links.length - 1) {
      doc.setTextColor(...INK3);
      doc.text('|', lx, y);
      lx += doc.getTextWidth('|') + 2; // Add a little breathing room after the divider
    }
  });
  y += 7;

  // Thick rule under header
  hRule(0.5, INK3);
  y += 6;

  // ════════════════════════════════════════════════════════
  // HELPER — section heading
  // ════════════════════════════════════════════════════════
  function secHead(label) {
    checkPage(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(label, ML, y);
    y += 1.5;
    hRule(0.4, INK3);
    y += 4.5;
  }

  // ════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ════════════════════════════════════════════════════════
  secHead('Professional Summary');
  const sumLines = wrap(D.tagline, TW, 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK2);
  doc.text(sumLines, ML, y);
  y += linesH(sumLines, LS_BODY) + 6;

  // ════════════════════════════════════════════════════════
  // EDUCATION
  // ════════════════════════════════════════════════════════
  secHead('Education');
  D.education.forEach(e => {
    checkPage(20);

    // Degree — bold, school — italic, on the same line separated by em dash
    const degSchool = e.degree + ' \u2014 ' + e.school;
    const dsLines = wrap(degSchool, TW - 42, 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(dsLines, ML, y);

    // Period flush right
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...INK3);
    const pW = doc.getTextWidth(e.period);
    doc.text(e.period, PW - MR - pW, y);

    y += linesH(dsLines, LS_BODY) + 0.5;

    if (e.details) {
      const detLines = wrap(e.details, TW, 8.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...INK2);
      doc.text(detLines, ML, y);
      y += linesH(detLines, LS_SMALL) + 0.5;
    }
    y += 3.5;
  });

  // ════════════════════════════════════════════════════════
  // TECHNICAL SKILLS
  // ════════════════════════════════════════════════════════
  secHead('Technical Skills');
  D.skills.forEach(s => {
    checkPage(10);
    // "Category:" bold, then normal items on same line
    const label = s.cat + ': ';
    const labelW = doc.getTextWidth(label) + 0.5; // approx at fs 9
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(label, ML, y);

    const itemLines = wrap(s.items, TW - labelW, 9);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...INK2);
    doc.text(itemLines, ML + labelW, y);
    y += linesH(itemLines, LS_BODY) + 1;
  });
  y += 3;

  // ════════════════════════════════════════════════════════
  // PROFESSIONAL EXPERIENCE
  // ════════════════════════════════════════════════════════
  secHead('Professional Experience');
  D.experience.forEach(exp => {
    checkPage(30);

    // Role title flush left, period flush right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(exp.title, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...INK3);
    const pW = doc.getTextWidth(exp.period);
    doc.text(exp.period, PW - MR - pW, y);
    y += LS_HEAD;

    // Company, location, type — italic
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK2);
    const subLine = exp.company + ', ' + exp.location + (exp.type ? '    ' + exp.type : '');
    doc.text(subLine, ML, y);
    y += LS_BODY + 1;

    // Bullets
    exp.bullets.forEach(b => bullet(b, TW, 9));
    y += 3.5;
  });

  // ════════════════════════════════════════════════════════
  // KEY VERIFICATION PROJECTS
  // ════════════════════════════════════════════════════════
  secHead('Key Verification Projects');
  D.projects.forEach(p => {
    checkPage(24);

    // Project name flush left, period flush right
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(p.name, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...INK3);
    const pW = doc.getTextWidth(p.period);
    doc.text(p.period, PW - MR - pW, y);
    y += LS_HEAD + 1;

    // Bullets
    p.bullets.forEach(b => bullet(b, TW, 9));
    y += 3.5;
  });

  // ════════════════════════════════════════════════════════
  // PUBLICATIONS
  // ════════════════════════════════════════════════════════
  secHead('Publications');
  D.publications.forEach(p => {
    checkPage(20);

    const tLines = wrap(p.title, TW, 9);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(tLines, ML, y);
    y += linesH(tLines, LS_BODY) + 0.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK2);
    doc.text(p.authors, ML, y);
    y += LS_SMALL + 0.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK3);
    doc.text(p.venue, ML, y);
    y += 6;
  });

  // ════════════════════════════════════════════════════════
  // LANGUAGES & AVAILABILITY
  // ════════════════════════════════════════════════════════
  secHead('Languages & Availability');

  // Languages
  const langStr = D.languages.map(l => l.lang + ' (' + l.level + ')').join(',   ');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...INK);
  doc.text('Languages:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(langStr, ML + doc.getTextWidth('Languages:') + 1.5, y);
  y += LS_BODY + 1;

  // Work auth
  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Work Authorization:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(D.workAuth, ML + doc.getTextWidth('Work Authorization:') + 1.5, y);
  y += LS_BODY + 1;

  // Availability
  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Availability:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(D.availability, ML + doc.getTextWidth('Availability:') + 1.5, y);
  y += LS_BODY + 1;

  // Location
  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Location:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text('Dresden', ML + doc.getTextWidth('Location:') + 1.5, y);

  // ── Save ────────────────────────────────────────────────
  doc.save(D.name.replace(/\s+/g, '_') + '_CV.pdf');
}
