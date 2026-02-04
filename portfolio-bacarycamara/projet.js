// projets.js - injection des projets et gestion des téléchargements / aperçu
document.addEventListener('DOMContentLoaded', function() {
  // Exemple : liste des projets — remplace/ajoute tes projets ici.
  // Pour chaque projet, indique: id, title, description, type (zip/pdf/code), file (chemin relatif)
  const projects = [
    {
      id: 'gestion-bibliotheque',
      title: 'Gestion de bibliothèque en ligne',
      desc: 'Gestion de bibliothèque en ligne.',
      type: 'zip',
      file: 'projets/gestion_bibliotheque.zip',
      size: '4.3 Mo'
    },
    {
      id: 'localisation',
      title: 'Système de Localisation GPS',
      desc: 'Application permettant de localiser un utilisateur ou un appareil en temps réel à partir de coordonnées GPS.',
      type: 'zip',
      file: 'projets/localisation_camara_bacary.zip',
      size: '2.1 Mo'
    },
  {
  id: "pack-admin-reseaux-systemes",
  title: "Pack Complet — Projets Administration Réseaux & Systèmes",
  desc: "Téléchargez l’ensemble de mes projets réseaux et systèmes réalisés sous Linux et Windows Server.",
  type: "zip",
  file: "projets/Admin réseau -20251113T160920Z-1-001.zip",
  size: "Inconnue"
}
, 
    {
  id: "ad-windows-2016",
  title: "Installation et Configuration d’un Contrôleur de Domaine (Windows Server 2016)",
  desc: "Guide PDF détaillé expliquant l'installation et la configuration d'un contrôleur de domaine sous Windows Server 2016 (AD DS, DNS, approbations, OU, utilisateurs).",
  type: "pdf",
  file: "projets/AD_sous_Win2016.pdf",
  size: "Inconnue"
}
,
    {
      id: 'openvpn',
      title: 'OpenVPN Guide (PDF)',
      desc: 'Guide d’installation et configuration d’OpenVPN sous Linux Centos 7.',
      type: 'pdf',
      file: 'projets/vpn-sous-centos7.pdf',
      size: '300 Ko'
    }
  ];

  const grid = document.getElementById('projectsGrid');
  const search = document.getElementById('searchProjects');
  const filter = document.getElementById('filterType');
  const modal = document.getElementById('previewModal');
  const previewFrame = document.getElementById('previewFrame');
  const closePreview = document.getElementById('closePreview');
  const yearEl = document.getElementById('yearProj');

  // set year if present
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function render(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<p style="color:var(--muted)">Aucun projet trouvé.</p>';
      return;
    }
    list.forEach(p => {
      const div = document.createElement('article');
      div.className = 'project-card fade-in';
      div.innerHTML = `
        <h3>${p.title}</h3>
        <div class="project-meta">
          <span class="badge">${p.type.toUpperCase()}</span>
          <span class="badge">${p.size || ''}</span>
        </div>
        <p>${p.desc}</p>
        <div class="project-actions">
          <a class="btn-download" href="${p.file}" download>⬇ Télécharger</a>
          ${p.type === 'pdf' ? `<button class="btn-preview" data-file="${p.file}">Aperçu</button>` : ''}
          ${p.type === 'zip' ? `<a class="btn-preview" href="${p.file}" target="_blank" rel="noopener">Ouvrir archive</a>` : ''}
        </div>
      `;
      grid.appendChild(div);
    });
    // observe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.remove('visible');
      if (!el._observed) {
        el._observed = true;
      }
    });
    observeFadeIns();
  }

  // initial render
  render(projects);

  // search & filter
  function applyFilters() {
    const q = (search.value || '').trim().toLowerCase();
    const t = filter.value;
    const filtered = projects.filter(p => {
      if (t !== 'all' && p.type !== t) return false;
      if (!q) return true;
      return (p.title + ' ' + p.desc).toLowerCase().includes(q);
    });
    render(filtered);
  }
  search && search.addEventListener('input', applyFilters);
  filter && filter.addEventListener('change', applyFilters);

  // preview modal for PDFs
  grid.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-preview');
    if (!btn) return;
    const file = btn.getAttribute('data-file') || btn.getAttribute('href');
    if (!file) return;
    // open preview only for PDF (iframe); for other files browsers may download
    if (file.endsWith('.pdf')) {
      previewFrame.src = file;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  });
  closePreview.addEventListener('click', function() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    previewFrame.src = '';
  });
  modal.addEventListener('click', function(e) {
    if (e.target === modal) { closePreview.click(); }
  });

  // fade-in observer
  function observeFadeIns() {
    const els = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  }
  observeFadeIns();
});
