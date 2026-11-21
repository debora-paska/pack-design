(function () {
  const DEFAULT_MAPPING_BASE = 'http://localhost:5176/skill-mapping';
  const DEFAULT_WEB_BASE = 'http://localhost:5173';

  const CHROME_EN = {
    Dashboard: 'Dashboard',
    SkillMapping: 'Skill Mapping',
    Overview: 'Overview',
    Mappings: 'Mappings',
    Reports: 'Reports',
    Assessment: 'Assessment',
    Projects: 'Projects',
    ConversationalAssessment: 'Conversational Assessment',
    CompanyResources: 'Company Resources',
    Configurations: 'Configurations',
    Lnd: 'Learning & Development',
    Feedbacks: 'Feedbacks',
    Events: 'Events',
    General: 'General',
    Employees: 'Employees',
    YourPlan: 'Your Plan',
    Settings: 'Settings',
    HrDirector: 'HR Director',
    Hello: 'Hello'
  };

  function readBase(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved.trim()) return saved.replace(/\/$/, '');
    } catch {
      /* ignore */
    }
    return fallback;
  }

  function apiBase() {
    return readBase('sm.apiBase', DEFAULT_MAPPING_BASE);
  }

  function webApiBase() {
    return readBase('sm.webApiBase', DEFAULT_WEB_BASE);
  }

  function localeFromLang(lang) {
    const value = String(lang || 'EN').trim().toLowerCase();
    if (value.startsWith('it')) return 'it';
    if (value.startsWith('es')) return 'es';
    if (value.startsWith('fr')) return 'fr';
    return 'en';
  }

  function readDemoCfg() {
    try {
      return JSON.parse(localStorage.getItem('sm.demoCfg') || '{}');
    } catch {
      return {};
    }
  }

  function writeDemoCfg(cfg) {
    try {
      localStorage.setItem('sm.demoCfg', JSON.stringify(cfg));
    } catch {
      /* ignore */
    }
  }

  async function requestAt(base, path, options) {
    const response = await fetch(base + path, Object.assign({ credentials: 'include' }, options));
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload.error || payload.message || 'Request failed (' + response.status + ')';
      throw new Error(message);
    }
    return payload;
  }

  async function request(path, options) {
    return requestAt(apiBase(), path, options);
  }

  async function fetchShell(company) {
    const query = company ? '?company=' + encodeURIComponent(company) : '';
    return requestAt(webApiBase(), '/api/demo/shell' + query);
  }

  async function listMappings(company) {
    const query = company ? '?company=' + encodeURIComponent(company) : '';
    return request('/api/demo/mappings' + query);
  }

  async function fetchChromeTranslations(lang) {
    const locale = localeFromLang(lang);
    if (locale === 'en') return Object.assign({}, CHROME_EN);
    const result = await request('/api/demo/chrome-translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: locale, strings: CHROME_EN })
    });
    return Object.assign({}, CHROME_EN, result.strings || {});
  }

  async function createMapping(form) {
    const cfg = readDemoCfg();
    return request('/api/demo/mappings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputType: form.entry || form.inputType || 'role',
        roleName: form.roleName,
        familyName: form.familyName,
        tasks: form.tasks,
        horizon: form.horizon,
        language: cfg.lang || form.language || 'EN',
        companyName: cfg.company || form.companyName,
        companyContext: form.context || form.companyContext
      })
    });
  }

  async function pollMapping(id, lang) {
    const locale = localeFromLang(lang);
    return request('/api/demo/mappings/' + id + '?lang=' + encodeURIComponent(locale));
  }

  window.DemoApi = {
    CHROME_EN: CHROME_EN,
    apiBase: apiBase,
    webApiBase: webApiBase,
    localeFromLang: localeFromLang,
    readDemoCfg: readDemoCfg,
    writeDemoCfg: writeDemoCfg,
    fetchChromeTranslations: fetchChromeTranslations,
    fetchShell: fetchShell,
    listMappings: listMappings,
    createMapping: createMapping,
    pollMapping: pollMapping
  };
})();
