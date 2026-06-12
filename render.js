/**
 * render.js
 * Reads from DATA (data.js) and paints the website.
 * You never need to touch this file.
 */

function render() {
  const D = DATA;

// ── Hero ──
  document.getElementById('h-eyebrow').textContent = D.title;
  document.getElementById('h-name').innerHTML =
    D.name.split(' ').map((w, i) => i === 0 ? w : `<strong>${w}</strong>`).join(' ');
  document.getElementById('h-tagline').textContent = D.tagline;
  document.getElementById('h-meta').innerHTML = `
    <span class=\"meta-item\">📍 ${D.address}</span>
    <span class=\"meta-item\">📞 ${D.phone}</span>
    <span class=\"meta-item\">✉ ${D.email}</span>
  `;

  // Dynamic Image Rendering Hook
  const photoEl = document.getElementById('h-photo');
  if (D.image && D.image.trim() !== "") {
    photoEl.src = D.image;
    photoEl.style.display = 'block'; // Show image element if URL exists
  } else {
    photoEl.style.display = 'none';  // Hide cleanly if no image is supplied
  }

  // ── About ─────────────────────────────────────────────
  const bio = document.getElementById('about-bio');
  bio.innerHTML =
    D.about.map(p => `<p>${p}</p>`).join('') +
    `<div class="avail-badge"><span class="dot"></span>${D.availability}</div>`;

  document.getElementById('interests-list').innerHTML =
    D.interests.map(i => `<span class="chip">${i}</span>`).join('');

  // ── Experience ────────────────────────────────────────
  document.getElementById('exp-list').innerHTML = D.experience.map(e => `
    <div class="exp-item">
      <div class="exp-meta">
        <p class="exp-period">${e.period}</p>
        <p class="exp-company">${e.company}</p>
        <p class="exp-location">${e.location}${e.type ? ' · ' + e.type : ''}</p>
      </div>
      <div>
        <p class="exp-title">${e.title}</p>
        ${e.bullets.length ? `<ul class="exp-list">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      </div>
    </div>
  `).join('');

  // ── Skills ────────────────────────────────────────────
  document.getElementById('skills-table').innerHTML = D.skills.map(s => `
    <tr>
      <td class="skill-cat">${s.cat}</td>
      <td class="skill-items">${s.items}</td>
    </tr>
  `).join('');

  // ── Projects ──────────────────────────────────────────
  document.getElementById('proj-grid').innerHTML = D.projects.map((p, i) => `
    <div class="proj-card">
      <p class="proj-num">${String(i + 1).padStart(2, '0')} · ${p.period}</p>
      <p class="proj-name">${p.name}</p>
      <ul class="proj-bullets">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');

  // ── Education ─────────────────────────────────────────
  document.getElementById('edu-list').innerHTML = D.education.map(e => `
    <div class="edu-item">
      <p class="edu-period">${e.period}</p>
      <div>
        <p class="edu-degree">${e.degree}</p>
        <p class="edu-school">${e.school}</p>
        <p class="edu-detail">${e.details}</p>
      </div>
    </div>
  `).join('');

  // ── Publications ──────────────────────────────────────
  document.getElementById('pub-list').innerHTML = D.publications.map(p => `
    <div class="pub-item">
      <p class="pub-title">${p.title}</p>
      <p class="pub-authors">${p.authors}</p>
      <p class="pub-venue">${p.venue}</p>
    </div>
  `).join('');

  // ── Contact ───────────────────────────────────────────
  document.getElementById('contact-links').innerHTML = `
    <a href="mailto:${D.email}" class="btn btn-dark">✉ ${D.email}</a>
    <a href="${D.linkedin}" class="btn btn-outline" target="_blank">LinkedIn</a>
    <a href="${D.github}"   class="btn btn-outline" target="_blank">GitHub</a>
    <a href="https://${D.website.replace('https://','')}" class="btn btn-outline" target="_blank">Website</a>
    <button class="btn btn-outline" onclick="downloadCV(event)">↓ Download CV</button>
  `;

  // ── Footer ────────────────────────────────────────────
  document.getElementById('footer-left').textContent  = `© ${new Date().getFullYear()} ${D.name}`;
  document.getElementById('footer-right').textContent = `📍 Dresden, Germany`;
}

render();
