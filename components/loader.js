/**
 * loader.js
 * header.html / footer.html を fetch で読み込む共通ユーティリティ
 *
 * 使い方（各ページのHTML末尾に記述）:
 *   <script type="module" src="/components/loader.js"></script>
 *
 * 各ページには以下のプレースホルダーを置いておく:
 *   <div id="site-header"></div>   ← ページ先頭
 *   <div id="site-footer"></div>   ← ページ末尾
 */

/* ============================================================
   1. コンポーネント読み込み
   ============================================================ */

/**
 * 指定URLのHTMLを取得し、セレクタに挿入する
 * @param {string} selector  - 挿入先のCSSセレクタ
 * @param {string} url       - フェッチするHTMLファイルのURL
 * @returns {Promise<void>}
 */
async function loadComponent(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(`[loader] コンポーネントの読み込みに失敗しました: ${url}`, err);
    el.innerHTML = `<p style="color:red;padding:8px;font-size:12px;">
      コンポーネントを読み込めませんでした（${url}）。
      ローカルサーバー経由でアクセスしているか確認してください。
    </p>`;
  }
}

/* ============================================================
   2. パスのルート解決
      ファイルの階層に関わらず /components/ を正しく参照する
   ============================================================ */

/**
 * ルートパスを返す
 * （例: taikenki/YT/index.html から呼ばれた場合も ../../ で戻る）
 * @returns {string}  例: "" or "../../"
 */
function getRootPath() {
  // <html data-root="../../"> のように data属性で指定できる（推奨）
  const root = document.documentElement.dataset.root;
  if (root !== undefined) return root;

  // 未指定の場合は pathname から自動計算
  const depth = location.pathname.replace(/\/[^/]+$/, '').split('/').filter(Boolean).length;
  return depth === 0 ? '' : '../'.repeat(depth);
}

/* ============================================================
   3. 現在地のナビゲーションをアクティブ表示
   ============================================================ */

/**
 * ヘッダーナビのうち現在ページに対応するリンクに is-active を付与する
 */
function setActiveNav() {
  const links = document.querySelectorAll('.site-nav__link');
  const current = location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // トップページ
    if (href === '/' && (current === '/' || current.endsWith('/index.html') && current.split('/').length <= 2)) {
      link.classList.add('is-active');
      return;
    }

    // それ以外: パス部分が一致するものをアクティブに
    if (href !== '/' && current.includes(href.replace(/^\//, ''))) {
      link.classList.add('is-active');
    }
  });
}

/* ============================================================
   4. スマホ向けハンバーガーメニュー
   ============================================================ */

/**
 * ヘッダー挿入後にハンバーガーメニューの開閉処理を初期化する
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // ナビリンクをタップしたら閉じる
  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   5. エントリーポイント
   ============================================================ */

async function init() {
  const root = getRootPath();

  // ヘッダー・フッターを並列取得
  await Promise.all([
    loadComponent('#site-header', `${root}components/header.html`),
    loadComponent('#site-footer', `${root}components/footer.html`),
  ]);

  // 挿入完了後に初期化
  setActiveNav();
  initMobileNav();

  // ロゴリンクをroot基準のトップページに設定
  const logoLink = document.getElementById('site-logo-link');
  if (logoLink) {
    logoLink.href = root + 'index.html';
  }
}

// DOMContentLoaded を待たず即時実行（type="module" は defer 相当のため安全）
init();