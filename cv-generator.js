/**
 * cv-generator.js
 * Generates a PDF CV that mirrors the website data exactly.
 * You never need to touch this file — edit data.js only.
 */

async function downloadCV(e) {
  if (e) e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const D = DATA;

  const PW = 210, PH = 297;
  const ML = 18, MR = 18, TW = PW - ML - MR;
  let y = 0;

  // ── Palette ─────────────────────────────────────────────
  const INK  = [15,  15,  15 ];
  const INK2 = [58,  58,  58 ];
  const INK3 = [118, 118, 118];
  const RULE = [210, 210, 210];
  const WHT  = [255, 255, 255];

  // ── Helpers ──────────────────────────────────────────────
  function hRule(color) {
    doc.setDrawColor(...(color || RULE));
    doc.setLineWidth(0.2);
    doc.line(ML, y, PW - MR, y);
  }

  function wrap(text, maxW, fs) {
    doc.setFontSize(fs || 9);
    return doc.splitTextToSize(String(text), maxW);
  }

  function lh(lines, fs) {
    return (Array.isArray(lines) ? lines.length : 1) * ((fs || 9) * 0.41);
  }

  function checkPage(need) {
    if (y + (need || 20) > PH - 14) {
      doc.addPage();
      y = 16;
    }
  }

  // ── Section heading ──────────────────────────────────────
  function secHead(label) {
    checkPage(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...INK3);
    doc.text(label.toUpperCase(), ML, y);
    y += 2.5;
    hRule();
    y += 5;
  }

  // ── Left/right column layout ─────────────────────────────
  const COL = 52;   // left column width
  const BX  = ML + COL; // body X
  const BW  = TW - COL; // body width

  // ════════════════════════════════════════════════════════
  // HEADER
  // ════════════════════════════════════════════════════════
  doc.setFillColor(...INK);
  doc.rect(0, 0, PW, 46, 'F');

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(...WHT);
  doc.text(D.name, ML, 17);

  // Title
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(200, 200, 200);
  doc.text(D.title, ML, 25);

  // Contact line 1
  doc.setFontSize(8);
  doc.setTextColor(170, 170, 170);
  doc.text(D.address, ML, 32);

  // Contact line 2
  const contactLine2 = `${D.phone}   ${D.email}`;
  doc.text(contactLine2, ML, 37.5);

  // Links line
  const linksLine = `LinkedIn: ${D.linkedin.replace('https://www.linkedin.com/in/', 'linkedin.com/in/')}   GitHub: ${D.github.replace('https://github.com/', 'github.com/')}`;
  doc.setFontSize(7.5);
  doc.setTextColor(145, 145, 145);
  doc.text(linksLine, ML, 43);

  y = 55;

  // ════════════════════════════════════════════════════════
  // PROFESSIONAL SUMMARY
  // ════════════════════════════════════════════════════════
  secHead('Professional Summary');
  const sumLines = wrap(D.tagline, TW, 9);
  checkPage(lh(sumLines, 9) + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK2);
  doc.text(sumLines, ML, y);
  y += lh(sumLines, 9) + 7;

  // ════════════════════════════════════════════════════════
  // EDUCATION
  // ════════════════════════════════════════════════════════
  secHead('Education');
  D.education.forEach(e => {
    const degLines = wrap(e.degree + ' — ' + e.school, BW, 9);
    const detLines = wrap(e.details, BW, 8.5);
    checkPage(lh(degLines, 9) + lh(detLines, 8.5) + 6);

    // Period left
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...INK3);
    doc.text(e.period, ML, y);

    // Degree + school right (bold degree, normal school inline)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(degLines, BX, y);
    y += lh(degLines, 9) + 1;

    if (e.details) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...INK3);
      doc.text(detLines, BX, y);
      y += lh(detLines, 8.5);
    }
    y += 4.5;
  });

  // ════════════════════════════════════════════════════════
  // TECHNICAL SKILLS
  // ════════════════════════════════════════════════════════
  secHead('Technical Skills');
  D.skills.forEach(s => {
    const iLines = wrap(s.items, BW, 8.5);
    checkPage(Math.max(5, lh(iLines, 8.5)) + 3);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK);
    doc.text(s.cat + ':', ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK2);
    doc.text(iLines, BX, y);
    y += Math.max(4.5, lh(iLines, 8.5)) + 2.5;
  });
  y += 2;

  // ════════════════════════════════════════════════════════
  // PROFESSIONAL EXPERIENCE
  // ════════════════════════════════════════════════════════
  secHead('Professional Experience');
  D.experience.forEach(exp => {
    checkPage(36);
    const titleW = doc.getTextWidth(exp.title);

    // Role title + period on same line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(exp.title, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...INK3);
    doc.text(exp.period, PW - MR - doc.getTextWidth(exp.period), y);
    y += 4.5;

    // Company + location + type
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK2);
    doc.text(exp.company + ', ' + exp.location + (exp.type ? '   ' + exp.type : ''), ML, y);
    y += 5;

    // Bullets
    exp.bullets.forEach(b => {
      const bl = wrap('•  ' + b, TW - 4, 8.5);
      checkPage(lh(bl, 8.5) + 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...INK2);
      doc.text(bl, ML + 2, y);
      y += lh(bl, 8.5) + 1.8;
    });
    y += 4;
  });

  // ════════════════════════════════════════════════════════
  // KEY VERIFICATION PROJECTS
  // ════════════════════════════════════════════════════════
  secHead('Key Verification Projects');
  D.projects.forEach(p => {
    const nameLines = wrap(p.name, TW * 0.65, 9.5);
    checkPage(lh(nameLines, 9.5) + p.bullets.length * 6 + 6);

    // Project name + period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(nameLines, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...INK3);
    doc.text(p.period, PW - MR - doc.getTextWidth(p.period), y);
    y += lh(nameLines, 9.5) + 2;

    // Bullets
    p.bullets.forEach(b => {
      const bl = wrap('•  ' + b, TW - 4, 8.5);
      checkPage(lh(bl, 8.5) + 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...INK2);
      doc.text(bl, ML + 2, y);
      y += lh(bl, 8.5) + 1.6;
    });
    y += 4;
  });

  // ════════════════════════════════════════════════════════
  // PUBLICATIONS
  // ════════════════════════════════════════════════════════
  secHead('Publications');
  D.publications.forEach(p => {
    const tLines = wrap(p.title, TW, 8.5);
    checkPage(lh(tLines, 8.5) + 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK);
    doc.text(tLines, ML, y);
    y += lh(tLines, 8.5) + 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...INK2);
    doc.text(p.authors, ML, y);
    y += 4.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...INK3);
    doc.text(p.venue, ML, y);
    y += 8;
  });

  // ════════════════════════════════════════════════════════
  // LANGUAGES & AVAILABILITY
  // ════════════════════════════════════════════════════════
  secHead('Languages & Availability');

  // Languages
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK);
  doc.text('Languages:', ML, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK2);
  doc.text(D.languages.map(l => `${l.lang} (${l.level})`).join('   '), BX, y);
  y += 5.5;

  // Work auth
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK);
  doc.text('Work Authorization:', ML, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK2);
  doc.text(D.workAuth, BX, y);
  y += 5.5;

  // Availability
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK);
  doc.text('Availability:', ML, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...INK2);
  doc.text(D.availability, BX, y);

  // ── Save ────────────────────────────────────────────────
  const fname = D.name.replace(/\s+/g, '_') + '_CV.pdf';
  doc.save(fname);
}
