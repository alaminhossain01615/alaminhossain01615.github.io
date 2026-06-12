/**
 * cv-generator.js
 * Generates a PDF CV from DATA (data.js).
 * Layout matches a traditional professional CV with an image profile.
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

  // ── Line spacing constants ──────────────────────────────
  const LS_BODY   = 4.8;   
  const LS_SMALL  = 4.2;   
  const LS_HEAD   = 5.8;   
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

  function linesH(lines, lsMm) {
    return (Array.isArray(lines) ? lines.length : 1) * (lsMm || LS_BODY);
  }

  function checkPage(need) {
    if (y + (need || 18) > PH - 16) {
      doc.addPage();
      y = 18;
    }
  }

  function bullet(text, bodyW, fs) {
    const bl = wrap(text, bodyW - 1, fs || 9);
    checkPage(linesH(bl, LS_BODY) + 1.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fs || 9);
    doc.setTextColor(...INK2);
    doc.text('•', ML + 1, y);
    doc.text(bl, BODY_X, y);
    y += linesH(bl, LS_BODY) + 0.8;
  }

  // ════════════════════════════════════════════════════════
  // HEADER SECTION (Two Columns: Left text, Right Image)
  // ════════════════════════════════════════════════════════
  y = 18;

// --- RIGHT COLUMN: Image Placement ---
  const imgW = 28;
  const imgH = 35; // Bumped height slightly to match standard professional portrait proportions
  const imgX = PW - MR - imgW;
  
  if (D.image && D.image.trim() !== "") {
    try {
      // Passing 'NONE' alias settings ensures jsPDF respects proportions without squeezing
      doc.addImage(D.image, 'JPEG', imgX, y, imgW, imgH, undefined, 'NONE');
    } catch (err) {
      // Fallback placeholder box if the image path/URL fails to resolve
      doc.setDrawColor(...RULE);
      doc.rect(imgX, y, imgW, imgH);
      doc.setFontSize(7);
      doc.setTextColor(...INK3);
      doc.text('[ Image Pass ]', imgX + 4, y + (imgH / 2));
    }
  } else {
    // Standard visual placeholder box
    doc.setDrawColor(...RULE);
    doc.rect(imgX, y, imgW, imgH);
    doc.setFontSize(8);
    doc.setTextColor(...INK3);
    doc.text('Placeholder', imgX + 5, y + 14);
    doc.text('Image', imgX + 9, y + 19);
  }

  // --- LEFT COLUMN: Personal Info ---
  const leftColW = TW - imgW - 5; // Allow 5mm clearance space

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...INK);
  doc.text(D.name, ML, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK2);
  doc.text(D.address, ML, y);
  y += LS_BODY;

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
    doc.setFontSize(9);
    doc.setTextColor(40, 100, 200); // Standard clean link blue
    doc.textWithLink(lk.label, lx, y, { url: lk.url });
    lx += doc.getTextWidth(lk.label) + 1.5;
    if (i < links.length - 1) {
      doc.setTextColor(...INK3);
      doc.text('|', lx, y);
      lx += doc.getTextWidth('|') + 1.5;
    }
  });

  // Balance y position past the bottom of the image height context safely
  y = Math.max(y + 6, 18 + imgH + 5);

  // Divider line separating header from main profile content
  hRule(0.5, INK3);
  y += 6;

  // ════════════════════════════════════════════════════════
  // HELPER — Section Heading Engine
  // ════════════════════════════════════════════════════════
  function secHead(label) {
    checkPage(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(label, ML, y);
    y += 1.5;
    hRule(0.4, INK3);
    y += 4.5;
  }

  // ════════════════════════════════════════════════════════
  // SECTIONS FLOW
  // ════════════════════════════════════════════════════════
  
  // 1. Professional Summary
  secHead('Professional Summary');
  const sumLines = wrap(D.tagline, TW, 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK2);
  doc.text(sumLines, ML, y);
  y += linesH(sumLines, LS_BODY) + 6;

  // 2. Education
  secHead('Education');
  D.education.forEach(e => {
    checkPage(20);
    const degSchool = e.degree + ' \u2014 ' + e.school;
    const dsLines = wrap(degSchool, TW - 45, 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(dsLines, ML, y);

    doc.setFont('helvetica', 'normal');
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

  // 3. Technical Skills
  secHead('Technical Skills');
  D.skills.forEach(s => {
    checkPage(10);
    const label = s.cat + ': ';
    const labelW = doc.getTextWidth(label) + 0.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(label, ML, y);

    const itemLines = wrap(s.items, TW - labelW, 9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...INK2);
    doc.text(itemLines, ML + labelW, y);
    y += linesH(itemLines, LS_BODY) + 1;
  });
  y += 3;

  // 4. Professional Experience
  secHead('Professional Experience');
  D.experience.forEach(exp => {
    checkPage(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(exp.title, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...INK3);
    const pW = doc.getTextWidth(exp.period);
    doc.text(exp.period, PW - MR - pW, y);
    y += LS_HEAD;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...INK2);
    const subLine = exp.company + ', ' + exp.location + (exp.type ? '   |   ' + exp.type : '');
    doc.text(subLine, ML, y);
    y += LS_BODY + 1;

    exp.bullets.forEach(b => bullet(b, TW, 9));
    y += 2.5;
  });

  // 5. Key Verification Projects
  secHead('Key Verification Projects');
  D.projects.forEach(p => {
    checkPage(24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    doc.text(p.name, ML, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...INK3);
    const pW = doc.getTextWidth(p.period);
    doc.text(p.period, PW - MR - pW, y);
    y += LS_HEAD + 1;

    p.bullets.forEach(b => bullet(b, TW, 9));
    y += 2.5;
  });

  // 6. Publications
  if (D.publications && D.publications.length > 0) {
    secHead('Publications');
    D.publications.forEach(p => {
      checkPage(20);
      const tLines = wrap(p.title, TW, 9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...INK);
      doc.text(tLines, ML, y);
      y += linesH(tLines, LS_BODY) + 0.8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...INK2);
      doc.text(p.authors, ML, y);
      y += LS_SMALL + 0.5;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...INK3);
      doc.text(p.venue, ML, y);
      y += 5;
    });
  }

  // 7. Languages & Availability
  secHead('Languages & Availability');
  checkPage(25);

  const langStr = D.languages.map(l => l.lang + ' (' + l.level + ')').join(',   ');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...INK);
  doc.text('Languages:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(langStr, ML + doc.getTextWidth('Languages:') + 2, y);
  y += LS_BODY + 0.5;

  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Work Authorization:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(D.workAuth, ML + doc.getTextWidth('Work Authorization:') + 2, y);
  y += LS_BODY + 0.5;

  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Availability:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text(D.availability, ML + doc.getTextWidth('Availability:') + 2, y);
  y += LS_BODY + 0.5;

  doc.setFont('helvetica', 'bold'); doc.setTextColor(...INK);
  doc.text('Location:', ML, y);
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...INK2);
  doc.text('Dresden, Germany', ML + doc.getTextWidth('Location:') + 2, y);

  // ── Save Document ───────────────────────────────────────
  doc.save(D.name.replace(/\s+/g, '_') + '_CV.pdf');
}