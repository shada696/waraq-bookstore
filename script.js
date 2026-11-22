/* ============================================================
   WARAQ | وَرَق — application logic (vanilla JS, no dependencies)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Catalogue: real published books, real authors ---------- */
  const BOOKS = [
    {
      id: 'rijal', title: 'رجال في الشمس', author: 'غسان كنفاني', lang: 'ar', price: 62, coverId: 5387071,
      tag: 'الأكثر مبيعًا',
      desc: 'رواية غسان كنفاني عن أربعة فلسطينيين يحاولون عبور الصحراء بحثًا عن عمل، ونظرة قاسية إلى المنفى وفقدان الوطن.'
    },
    {
      id: 'ghirnata', title: 'ثلاثية غرناطة', author: 'رضوى عاشور', lang: 'ar', price: 78, coverId: 15228028,
      tag: 'إصدار مميز',
      desc: 'عمل روائي لرضوى عاشور ينسج حكايات أهالي الأندلس في مواجهة سقوط غرناطة، ويجمع بين التاريخ والذاكرة الإنسانية.'
    },
    {
      id: 'hijra', title: 'موسم الهجرة إلى الشمال', author: 'الطيب صالح', lang: 'ar', price: 55, coverId: 692835,
      tag: 'الأكثر مبيعًا',
      desc: 'رواية الطيب صالح عن مصطفى سعيد الذي يعود إلى قريته في السودان بعد سنوات في أوروبا، في تأمل في الهوية والاستعمار.'
    },
    {
      id: 'dhakira', title: 'ذاكرة الجسد', author: 'أحلام مستغانمي', lang: 'ar', price: 85, coverId: 10525090,
      tag: null,
      desc: 'رواية أحلام مستغانمي التي تمزج بين الحب والذاكرة والتاريخ الجزائري، وتُعد من أكثر الأعمال العربية حضورًا.'
    },
    {
      id: 'bamboo', title: 'ساق البامبو', author: 'سعود السنعوسي', lang: 'ar', price: 72, coverId: null,
      tag: 'جائزة البوكر العربية',
      desc: 'رواية سعود السنعوسي عن شاب يبحث عن هويته بين الكويت والفلبين، وقد فازت بجائزة البوكر العربية.'
    },
    {
      id: 'azazeel', title: 'عزازيل', author: 'يوسف زيدان', lang: 'ar', price: 68, coverId: 13009625,
      tag: 'جائزة البوكر العربية',
      desc: 'رواية يوسف زيدان التي تستلهم سيرة الراهب هيبا وتطرح أسئلة حول الإيمان والتاريخ المسيحي المبكر.'
    },
    {
      id: 'pride', title: 'Pride and Prejudice', author: 'Jane Austen', lang: 'en', price: 58, coverId: 12645114,
      tag: 'كلاسيك',
      desc: 'رواية جين أوستن الكلاسيكية عن إليزابيث بينيت والسيد دارسي، وتأملات في الحب والأخلاق والطبقة الاجتماعية.'
    },
    {
      id: 'gatsby', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', lang: 'en', price: 88, coverId: 14314120,
      tag: 'الأكثر مبيعًا',
      desc: 'رواية ف. سكوت فيتزجيرالد عن أمريكا في عشرينيات القرن الماضي، وعالم الثروة والوهم من خلال قصة جاي غاتسبي.'
    },
    {
      id: 'little-women', title: 'Little Women', author: 'Louisa May Alcott', lang: 'en', price: 52, coverId: 8775559,
      tag: null,
      desc: 'رواية لويزا ماي ألكوت عن أخوات مارس الأربع، وعالم الأسرة والطموح والنضج أثناء الحرب الأهلية الأمريكية.'
    },
    {
      id: 'frankenstein', title: 'Frankenstein', author: 'Mary Shelley', lang: 'en', price: 75, coverId: 11466753,
      tag: 'كلاسيك',
      desc: 'رواية ماري شيلي الكلاسيكية عن عالم يصنع كائنًا حيًا، وتأملات في العلم والوحدة والمسؤولية.'
    },
    {
      id: 'dorian', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', lang: 'en', price: 80, coverId: 14314858,
      tag: null,
      desc: 'رواية أوسكار وايلد عن شاب تبقى لوحته شابة بينما يتغير هو، في تأمل في الجمال والأخلاق.'
    },
    {
      id: 'old-man', title: 'The Old Man and the Sea', author: 'Ernest Hemingway', lang: 'en', price: 65, coverId: 15266921,
      tag: 'الأكثر مبيعًا',
      desc: 'رواية إرنست همينغوي عن صياد كوبي يخوض معركة مع سمكة ضخمة، وقصة صمود وكرامة.'
    }
  ];

  const FEATURED = ['rijal', 'ghirnata', 'pride', 'gatsby'];
  const BESTSELLERS = ['rijal', 'hijra', 'gatsby', 'old-man'];
  const WHATSAPP_NUMBER = '966581920663';
  const STORAGE_KEY = 'waraq_cart_v1';
  const MAX_QTY = 20;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));
  const byId = (id) => BOOKS.find(function (b) { return b.id === id; }) || null;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function normalizeArabic(text) {
    return String(text)
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[ \,،]+/g, ' ')
      .trim();
  }

  function money(amount) { return amount.toLocaleString('en-US') + ' ر.س'; }

  /* ---------- Cart state (non-sensitive data only) ---------- */
  function loadCart() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const seen = {};
      const result = [];
      parsed.forEach(function (entry) {
        if (!entry || !byId(entry.id) || seen[entry.id]) return;
        const qty = Number(entry.qty);
        if (!Number.isFinite(qty)) return;
        seen[entry.id] = true;
        result.push({ id: entry.id, qty: Math.min(MAX_QTY, Math.max(1, Math.round(qty))) });
      });
      return result;
    } catch (err) {
      return [];
    }
  }

  let cart = loadCart();

  function saveCart() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (err) { /* storage unavailable */ }
  }

  function cartCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  function cartSubtotal() {
    return cart.reduce(function (sum, item) {
      const book = byId(item.id);
      return sum + (book ? book.price * item.qty : 0);
    }, 0);
  }

  function updateCartBadges() {
    const count = String(cartCount());
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
    $$('[data-cart-count]').forEach(function (el) { el.textContent = count; });
  }

  function addToCart(id, amount) {
    const book = byId(id);
    if (!book) return;
    const qty = Math.min(MAX_QTY, Math.max(1, Number(amount) || 1));
    const existing = cart.find(function (item) { return item.id === id; });
    if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + qty);
    else cart.push({ id: id, qty: qty });
    saveCart();
    updateCartBadges();
    showToast('أُضيف «' + book.title + '» إلى السلة');
  }

  function changeCartQty(id, delta) {
    const item = cart.find(function (entry) { return entry.id === id; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(function (entry) { return entry.id !== id; });
    } else {
      item.qty = Math.min(MAX_QTY, item.qty);
    }
    saveCart();
    updateCartBadges();
    const view = currentView();
    if (view === 'cart') renderCart();
    if (view === 'checkout') renderCheckout();
  }

  function removeFromCart(id) {
    const book = byId(id);
    cart = cart.filter(function (entry) { return entry.id !== id; });
    saveCart();
    updateCartBadges();
    const view = currentView();
    if (view === 'cart') renderCart();
    if (view === 'checkout') renderCheckout();
    if (book) showToast('تمت إزالة «' + book.title + '» من السلة');
  }

  /* ---------- Cover rendering (real cover + designed fallback) ---------- */
  function coverHTML(book, variant) {
    const frameClass = 'cover-frame' + (variant === 'detail' ? ' cover-frame--detail' : '');
    return '<div class="' + frameClass + '" data-cover-id="' + (book.coverId || '') + '"' +
      ' data-cover-title="' + escapeHTML(book.title) + '" data-cover-author="' + escapeHTML(book.author) + '">' +
      '<div class="cover-inner">' +
        '<div class="cover-fallback' + (book.lang === 'en' ? ' is-en' : '') + '">' +
          '<span class="cover-fallback-brand">WARAQ · وَرَق</span>' +
          '<span class="cover-fallback-title">' + escapeHTML(book.title) + '</span>' +
          '<span class="cover-fallback-rule"></span>' +
          '<span class="cover-fallback-author">' + escapeHTML(book.author) + '</span>' +
        '</div>' +
      '</div></div>';
  }

  function hydrateCovers(root) {
    $$('[data-cover-id]', root || document).forEach(function (frame) {
      if (frame.dataset.hydrated === '1') return;
      frame.dataset.hydrated = '1';
      const id = frame.dataset.coverId;
      if (!id) return; /* designed fallback stays in place */
      const img = new Image();
      img.className = 'cover-img';
      img.alt = frame.dataset.coverTitle + ' — ' + frame.dataset.coverAuthor;
      img.loading = 'eager';
      img.decoding = 'async';
      img.addEventListener('load', function () {
        const inner = $('.cover-inner', frame);
        if (!inner) return;
        inner.innerHTML = '';
        inner.appendChild(img);
        frame.classList.add('has-image');
      });
      img.addEventListener('error', function () { /* fallback remains visible */ });
      img.src = 'https://covers.openlibrary.org/b/id/' + encodeURIComponent(id) + '-L.jpg?default=false';
    });
  }

  /* ---------- Book cards ---------- */
  function bookCardHTML(book) {
    const badge = book.tag ? '<span class="book-badge">' + escapeHTML(book.tag) + '</span>' : '';
    return '<article class="book-card">' +
      '<a class="cover-link" href="#book/' + encodeURIComponent(book.id) + '" aria-label="عرض تفاصيل ' + escapeHTML(book.title) + '">' +
        coverHTML(book) + badge +
      '</a>' +
      '<div class="book-body">' +
        '<div class="book-meta">' +
          '<span class="lang-chip ' + book.lang + '">' + (book.lang === 'ar' ? 'العربية' : 'English') + '</span>' +
          '<span class="book-cat">' + (book.lang === 'ar' ? 'أدب عربي' : 'أدب إنجليزي') + '</span>' +
        '</div>' +
        '<h3 class="book-title' + (book.lang === 'en' ? ' latin' : '') + '">' + escapeHTML(book.title) + '</h3>' +
        '<p class="book-author' + (book.lang === 'en' ? ' latin' : '') + '">' + escapeHTML(book.author) + '</p>' +
        '<p class="book-desc">' + escapeHTML(book.desc) + '</p>' +
        '<div class="book-foot">' +
          '<span class="price"><strong>' + book.price + '</strong> ر.س</span>' +
          '<button type="button" class="btn btn-add" data-add="' + book.id + '">أضف إلى السلة</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function fillGrid(selector, ids) {
    const el = $(selector);
    if (!el) return;
    el.innerHTML = ids.map(function (id) { return byId(id); }).filter(Boolean).map(bookCardHTML).join('');
    hydrateCovers(el);
  }

  /* ---------- Shop: search, filters, sorting ---------- */
  const filters = { query: '', category: 'all', sort: 'default' };

  function filteredBooks() {
    const query = normalizeArabic(filters.query);
    let list = BOOKS.slice();
    if (filters.category !== 'all') {
      list = list.filter(function (book) { return book.lang === filters.category; });
    }
    if (query) {
      list = list.filter(function (book) {
        const haystack = normalizeArabic([book.title, book.author, book.desc,
          book.lang === 'ar' ? 'العربية كتب عربية' : 'English كتب إنجليزية'].join(' '));
        return haystack.indexOf(query) !== -1;
      });
    }
    if (filters.sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    if (filters.sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    return list;
  }

  function renderShop() {
    const list = filteredBooks();
    const grid = $('#shop-grid');
    if (!grid) return;
    grid.innerHTML = list.map(bookCardHTML).join('');
    hydrateCovers(grid);
    const count = $('#result-count');
    if (count) {
      count.textContent = list.length === 12
        ? 'عرض 12 كتابًا'
        : 'عرض ' + list.length + (list.length === 1 ? ' كتاب' : ' كتب') + ' من أصل 12 كتابًا';
    }
    const noResults = $('#no-results');
    if (noResults) noResults.hidden = list.length !== 0;
    const searchInput = $('#search-input');
    if (searchInput) searchInput.value = filters.query;
    $$('.filter-btn').forEach(function (btn) {
      const active = btn.dataset.category === filters.category;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const sort = $('#sort-select');
    if (sort) sort.value = filters.sort;
  }

  /* ---------- Book detail ---------- */
  function renderBookDetail(id) {
    const root = $('#book-detail');
    if (!root) return;
    const book = byId(id);
    if (!book) {
      root.innerHTML = '<div class="empty-state"><h2>لم نعثر على هذا الكتاب</h2>' +
        '<p>ربما تغيّر الرابط. تصفّح المتجر لتجد ما يناسبك.</p>' +
        '<a class="btn btn-primary" href="#shop">العودة إلى المتجر</a></div>';
      return;
    }
    const related = BOOKS.filter(function (b) { return b.lang === book.lang && b.id !== book.id; }).slice(0, 3);
    root.innerHTML =
      '<nav class="breadcrumb" aria-label="مسار التنقل">' +
        '<a href="#home">الرئيسية</a><span aria-hidden="true">/</span>' +
        '<a href="#shop">المتجر</a><span aria-hidden="true">/</span>' +
        '<span>' + escapeHTML(book.title) + '</span>' +
      '</nav>' +
      '<div class="detail-grid">' +
        '<div>' + coverHTML(book, 'detail') + '</div>' +
        '<div class="detail-info">' +
          '<span class="lang-chip ' + book.lang + '">' + (book.lang === 'ar' ? 'العربية' : 'English') + '</span>' +
          '<h1' + (book.lang === 'en' ? ' class="latin"' : '') + '>' + escapeHTML(book.title) + '</h1>' +
          '<p class="detail-author' + (book.lang === 'en' ? ' latin' : '') + '">' + escapeHTML(book.author) + '</p>' +
          '<p class="detail-desc">' + escapeHTML(book.desc) + '</p>' +
          '<div class="detail-facts">' +
            '<div class="detail-fact"><span>اللغة</span><strong>' + (book.lang === 'ar' ? 'العربية' : 'الإنجليزية') + '</strong></div>' +
            '<div class="detail-fact"><span>السعر</span><strong>' + money(book.price) + '</strong></div>' +
            '<div class="detail-fact"><span>التوصيل</span><strong>داخل جدة فقط</strong></div>' +
          '</div>' +
          '<div class="detail-buy">' +
            '<span class="price"><strong>' + book.price + '</strong> ر.س</span>' +
            '<div class="qty" aria-label="اختر الكمية">' +
              '<button type="button" data-detail-qty="-1" aria-label="تقليل الكمية">−</button>' +
              '<input id="detail-qty" type="number" min="1" max="' + MAX_QTY + '" value="1" aria-label="الكمية" inputmode="numeric">' +
              '<button type="button" data-detail-qty="1" aria-label="زيادة الكمية">+</button>' +
            '</div>' +
            '<button type="button" class="btn btn-primary" data-add="' + book.id + '">أضف إلى السلة <span aria-hidden="true">←</span></button>' +
          '</div>' +
          '<p class="detail-note">التوصيل متاح داخل جدة فقط، ورسوم التوصيل حسب الحي. <a href="#delivery">اقرأ معلومات التوصيل</a></p>' +
        '</div>' +
      '</div>' +
      '<div class="section-head"><div><p class="kicker">قد يعجبك أيضًا</p><h2>كتب من المجموعة نفسها</h2></div></div>' +
      '<div class="book-grid book-grid--three">' + related.map(bookCardHTML).join('') + '</div>';
    hydrateCovers(root);
  }

  /* ---------- Cart view ---------- */
  function cartRowsHTML() {
    return cart.map(function (item) {
      const book = byId(item.id);
      if (!book) return '';
      return '<article class="cart-item">' +
        '<a class="cart-thumb" href="#book/' + encodeURIComponent(book.id) + '" aria-label="عرض ' + escapeHTML(book.title) + '">' + coverHTML(book) + '</a>' +
        '<div class="cart-info">' +
          '<h3' + (book.lang === 'en' ? ' class="latin"' : '') + '>' + escapeHTML(book.title) + '</h3>' +
          '<p' + (book.lang === 'en' ? ' class="latin"' : '') + '>' + escapeHTML(book.author) + '</p>' +
          '<span class="price"><strong>' + book.price + '</strong> ر.س للكتاب</span>' +
        '</div>' +
        '<div class="qty qty--sm" aria-label="كمية ' + escapeHTML(book.title) + '">' +
          '<button type="button" data-qty="' + book.id + '" data-delta="-1" aria-label="تقليل كمية ' + escapeHTML(book.title) + '">−</button>' +
          '<span>' + item.qty + '</span>' +
          '<button type="button" data-qty="' + book.id + '" data-delta="1" aria-label="زيادة كمية ' + escapeHTML(book.title) + '">+</button>' +
        '</div>' +
        '<strong class="line-total">' + money(book.price * item.qty) + '</strong>' +
        '<button type="button" class="icon-btn" data-remove="' + book.id + '" aria-label="إزالة ' + escapeHTML(book.title) + ' من السلة" title="إزالة">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/></svg>' +
        '</button>' +
      '</article>';
    }).join('');
  }

  function summaryHTML() {
    return '<aside class="summary-card">' +
      '<h2>ملخص السلة</h2>' +
      '<div class="summary-row"><span>عدد الكتب</span><span>' + cartCount() + '</span></div>' +
      '<div class="summary-row"><span>المجموع الفرعي</span><span>' + money(cartSubtotal()) + '</span></div>' +
      '<div class="summary-note">التوصيل متاح داخل مدينة جدة فقط، ومدته من يومين إلى ثلاثة أيام. رسوم التوصيل حسب الحي، وتُأكَّد معك قبل إتمام الطلب.</div>' +
      '<div class="summary-actions">' +
        '<a class="btn btn-primary btn-block" href="#checkout">إتمام الطلب <span aria-hidden="true">←</span></a>' +
        '<a class="btn btn-outline btn-block" href="#shop">متابعة التسوق</a>' +
      '</div>' +
    '</aside>';
  }

  function renderCart() {
    const root = $('#cart-content');
    if (!root) return;
    if (!cart.length) {
      root.innerHTML = '<div class="empty-state">' +
        '<span class="empty-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h2l2.2 10h9.5l2.3-7H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg></span>' +
        '<h2>سلتك فارغة الآن</h2>' +
        '<p>لم تضف أي كتاب بعد. تصفح مجموعتنا واختر حكايتك القادمة.</p>' +
        '<a class="btn btn-primary" href="#shop">ابدأ التسوق <span aria-hidden="true">←</span></a>' +
      '</div>';
      return;
    }
    root.innerHTML = '<div class="cart-layout"><div class="cart-list">' + cartRowsHTML() + '</div>' + summaryHTML() + '</div>';
    hydrateCovers(root);
  }

  /* ---------- Checkout ---------- */
  function orderLinesText() {
    return cart.map(function (item) {
      const book = byId(item.id);
      if (!book) return '';
      return '• ' + book.title + ' — الكمية: ' + item.qty + ' — ' + money(book.price * item.qty);
    }).filter(Boolean).join('\n');
  }

  function whatsappMessage() {
    const value = function (id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    return 'مرحبًا ورق، أرغب في طلب الكتب التالية:\n\n' +
      'الاسم الكامل: ' + (value('co-name') || '—') + '\n' +
      'رقم الجوال: ' + (value('co-phone') || '—') + '\n' +
      'الحي: ' + (value('co-district') || '—') + '\n' +
      'العنوان بالتفصيل: ' + (value('co-address') || '—') + '\n\n' +
      'تفاصيل الطلب:\n' + orderLinesText() + '\n\n' +
      'المجموع الفرعي: ' + money(cartSubtotal()) + '\n' +
      'ملاحظة: رسوم التوصيل حسب الحي، وسيتم تأكيدها قبل إتمام الطلب.';
  }

  function updateWhatsAppLink() {
    const link = $('#whatsapp-order');
    if (!link) return;
    link.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(whatsappMessage());
  }

  function renderCheckout() {
    const root = $('#checkout-content');
    if (!root) return;
    if (!cart.length) {
      root.innerHTML = '<div class="empty-state"><h2>لا يمكن إتمام طلب فارغ</h2>' +
        '<p>أضف كتبًا إلى السلة أولًا، ثم عد إلى هنا لإتمام الطلب.</p>' +
        '<a class="btn btn-primary" href="#shop">تصفح المتجر <span aria-hidden="true">←</span></a></div>';
      return;
    }
    root.innerHTML = '<div class="checkout-layout">' +
      '<form class="checkout-form-card" id="checkout-form" novalidate>' +
        '<h2>بيانات التوصيل</h2>' +
        '<p class="form-hint" style="margin-top:-.5rem">التوصيل متاح داخل مدينة جدة فقط.</p>' +
        '<div class="checkout-grid">' +
          '<div class="field field--full"><label for="co-name">الاسم الكامل</label>' +
            '<input id="co-name" name="name" type="text" placeholder="اكتب اسمك الكامل" autocomplete="name" required>' +
            '<span class="field-error" id="err-co-name"></span></div>' +
          '<div class="field"><label for="co-phone">رقم الجوال</label>' +
            '<input id="co-phone" name="phone" type="tel" dir="ltr" placeholder="05xxxxxxxx" autocomplete="tel" required>' +
            '<span class="field-error" id="err-co-phone"></span></div>' +
          '<div class="field"><label for="co-district">الحي</label>' +
            '<input id="co-district" name="district" type="text" placeholder="اسم الحي داخل جدة" required>' +
            '<span class="field-error" id="err-co-district"></span></div>' +
          '<div class="field field--full"><label for="co-address">العنوان بالتفصيل</label>' +
            '<input id="co-address" name="address" type="text" placeholder="الشارع، رقم المبنى، أقرب معلم" autocomplete="street-address" required>' +
            '<span class="field-error" id="err-co-address"></span></div>' +
        '</div>' +
        '<div id="checkout-message"></div>' +
        '<a class="btn whatsapp-btn btn-block" id="whatsapp-order" href="#" target="_blank" rel="noopener noreferrer" style="margin-top:1rem">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l.9-4.3A8 8 0 1 1 20 12z"/><path d="M9 9.4c.2 2.5 2.1 4.4 4.6 4.6l1.1-1.4-1.9-1-1 .9c-.9-.4-1.5-1-1.9-1.9l.9-1-1-1.9z"/></svg>' +
          'إرسال الطلب عبر واتساب' +
        '</a>' +
        '<p class="form-hint">لا يتم تأكيد الطلب أو الدفع تلقائيًا؛ سيتم التواصل معك عبر واتساب لتأكيد الطلب ورسوم التوصيل.</p>' +
      '</form>' +
      '<aside class="summary-card">' +
        '<h2>ملخص الطلب</h2>' +
        '<div class="order-summary-items">' + cart.map(function (item) {
          const book = byId(item.id);
          return '<div class="summary-row"><span>' + escapeHTML(book.title) + ' × ' + item.qty + '</span><span>' + money(book.price * item.qty) + '</span></div>';
        }).join('') + '</div>' +
        '<div class="summary-row"><span>عدد الكتب</span><span>' + cartCount() + '</span></div>' +
        '<div class="summary-row total"><span>المجموع الفرعي</span><strong>' + money(cartSubtotal()) + '</strong></div>' +
        '<div class="summary-note"><strong>التوصيل:</strong> جدة فقط · من يومين إلى ثلاثة أيام · الرسوم حسب الحي، وتُأكَّد قبل إتمام الطلب.</div>' +
        '<a class="text-link" href="#cart">تعديل السلة <span aria-hidden="true">←</span></a>' +
      '</aside>' +
    '</div>';
    updateWhatsAppLink();
  }

  /* ---------- Authentication interface (frontend validation only) ---------- */
  let authMode = 'login';

  function renderAuth() {
    const root = $('#auth-content');
    if (!root) return;
    const isRegister = authMode === 'register';
    $$('.auth-tab').forEach(function (tab) {
      const active = tab.dataset.authMode === authMode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    if (isRegister) {
      root.innerHTML = '<form id="auth-form" novalidate>' +
        fieldHTML('reg-name', 'الاسم الكامل', 'text', 'اكتب اسمك الكامل', 'name') +
        fieldHTML('reg-email', 'البريد الإلكتروني', 'email', 'name@example.com', 'email') +
        fieldHTML('reg-password', 'كلمة المرور', 'password', '٨ أحرف على الأقل', 'new-password') +
        fieldHTML('reg-confirm', 'تأكيد كلمة المرور', 'password', 'أعد كتابة كلمة المرور', 'new-password') +
        '<button type="submit" class="btn btn-primary btn-block">إنشاء حساب</button>' +
        '<div id="auth-message"></div>' +
        '<p class="auth-switch">لديك حساب بالفعل؟ <button type="button" data-auth-mode="login">سجّل الدخول</button></p>' +
      '</form>';
    } else {
      root.innerHTML = '<form id="auth-form" novalidate>' +
        fieldHTML('login-email', 'البريد الإلكتروني', 'email', 'name@example.com', 'email') +
        fieldHTML('login-password', 'كلمة المرور', 'password', 'أدخل كلمة المرور', 'current-password') +
        '<button type="submit" class="btn btn-primary btn-block">تسجيل الدخول</button>' +
        '<div id="auth-message"></div>' +
        '<p class="auth-switch">ليس لديك حساب؟ <button type="button" data-auth-mode="register">أنشئ حسابًا جديدًا</button></p>' +
      '</form>';
    }
  }

  function fieldHTML(id, label, type, placeholder, autocomplete) {
    return '<div class="field"><label for="' + id + '">' + label + '</label>' +
      '<input id="' + id + '" name="' + id + '" type="' + type + '" placeholder="' + placeholder +
      '" autocomplete="' + autocomplete + '" required>' +
      '<span class="field-error" id="err-' + id + '"></span></div>';
  }

  function setFieldError(id, message) {
    const input = document.getElementById(id);
    const error = document.getElementById('err-' + id);
    if (input) { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
    if (error) error.textContent = message;
  }

  function clearFieldErrors(form) {
    $$('input', form).forEach(function (input) {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
    });
    $$('.field-error', form).forEach(function (error) { error.textContent = ''; });
  }

  function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); }
  function validPhone(value) {
    const phone = value.replace(/[\s\-()]/g, '').replace(/^00/, '+');
    return /^(05\d{8}|\+9665\d{8})$/.test(phone);
  }

  function handleAuthSubmit(form) {
    clearFieldErrors(form);
    const messageBox = $('#auth-message');
    const val = function (id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const errors = [];
    let firstInvalid = null;

    function requireField(id, condition, message) {
      const value = val(id);
      if (!value) { setFieldError(id, 'هذا الحقل مطلوب'); errors.push(id); }
      else if (!condition(value)) { setFieldError(id, message); errors.push(id); }
      if (!firstInvalid && errors.indexOf(id) !== -1) firstInvalid = document.getElementById(id);
    }

    if (authMode === 'register') {
      requireField('reg-name', function (v) { return v.length >= 3; }, 'الاسم يجب ألا يقل عن ٣ أحرف');
      requireField('reg-email', validEmail, 'أدخل بريدًا إلكترونيًا صحيحًا');
      requireField('reg-password', function (v) { return v.length >= 8; }, 'كلمة المرور يجب ألا تقل عن ٨ أحرف');
      requireField('reg-confirm', function (v) { return v === val('reg-password'); }, 'تأكيد كلمة المرور غير مطابق');
    } else {
      requireField('login-email', validEmail, 'أدخل بريدًا إلكترونيًا صحيحًا');
      requireField('login-password', function (v) { return v.length > 0; }, 'أدخل كلمة المرور');
    }

    if (errors.length) {
      if (messageBox) messageBox.innerHTML = '<div class="form-message error" role="alert">يرجى تصحيح الحقول المشار إليها ثم المحاولة مجددًا.</div>';
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const text = authMode === 'register'
      ? 'تم التحقق من صحة المدخلات محليًا فقط. لم يتم إنشاء حساب: يتطلب إنشاء حساب حقيقي ربط الموقع بخادم آمن، ولا تُحفظ كلمات المرور في المتصفح.'
      : 'تم التحقق من صحة المدخلات محليًا فقط. تسجيل الدخول الفعلي يتطلب خادمًا آمنًا، لم يتم تسجيل دخولك.';
    if (messageBox) messageBox.innerHTML = '<div class="form-message info" role="status">' + text + '</div>';
    form.reset();
  }

  function handleCheckoutSubmit(form) {
    clearFieldErrors(form);
    const messageBox = $('#checkout-message');
    const val = function (id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    const checks = [
      ['co-name', function (v) { return v.length >= 3; }, 'أدخل الاسم الكامل (٣ أحرف على الأقل)'],
      ['co-phone', validPhone, 'أدخل رقمًا سعوديًا صحيحًا مثل 05xxxxxxxx'],
      ['co-district', function (v) { return v.length >= 2; }, 'أدخل اسم الحي'],
      ['co-address', function (v) { return v.length >= 10; }, 'اكتب العنوان بالتفصيل (١٠ أحرف على الأقل)']
    ];
    let firstInvalid = null;
    checks.forEach(function (check) {
      const id = check[0], value = val(id);
      if (!value) setFieldError(id, 'هذا الحقل مطلوب');
      else if (!check[1](value)) setFieldError(id, check[2]);
      else return;
      if (!firstInvalid) firstInvalid = document.getElementById(id);
    });
    updateWhatsAppLink();
    if (firstInvalid) {
      if (messageBox) messageBox.innerHTML = '<div class="form-message error" role="alert">يرجى تصحيح بيانات التوصيل قبل إرسال الطلب.</div>';
      firstInvalid.focus();
      return;
    }
    if (messageBox) {
      messageBox.innerHTML = '<div class="form-message info" role="status">بياناتك جاهزة. راجع ملخص الطلب، ثم اضغط «إرسال الطلب عبر واتساب» لإكمال التواصل معنا. لم يتم تأكيد أي طلب تلقائيًا.</div>';
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove('show'); }, 2700);
  }

  /* ---------- Routing ---------- */
  function parseHash() {
    const raw = (window.location.hash || '#home').slice(1);
    const parts = raw.split('?');
    const segments = parts[0].split('/').filter(Boolean);
    return {
      view: segments[0] || 'home',
      id: segments[1] || null,
      params: new URLSearchParams(parts[1] || '')
    };
  }

  function currentView() { return parseHash().view; }

  const VALID_VIEWS = ['home', 'shop', 'book', 'cart', 'checkout', 'login', 'about', 'contact', 'delivery'];
  const PAGE_TITLES = {
    home: 'WARAQ | وَرَق — عالم من الحكايات، صفحة بعد صفحة',
    shop: 'المتجر | WARAQ | وَرَق',
    cart: 'سلة المشتريات | WARAQ | وَرَق',
    checkout: 'إتمام الطلب | WARAQ | وَرَق',
    login: 'تسجيل الدخول | WARAQ | وَرَق',
    about: 'من نحن | WARAQ | وَرَق',
    contact: 'تواصل معنا | WARAQ | وَرَق',
    delivery: 'معلومات التوصيل | WARAQ | وَرَق'
  };

  function route() {
    const routeData = parseHash();
    const view = VALID_VIEWS.indexOf(routeData.view) !== -1 ? routeData.view : 'home';

    $$('.view').forEach(function (section) {
      section.hidden = section.dataset.view !== view;
    });

    if (view === 'shop') {
      filters.query = routeData.params.has('q') ? routeData.params.get('q') : '';
      const category = routeData.params.get('cat');
      filters.category = (category === 'ar' || category === 'en') ? category : 'all';
      renderShop();
    }
    if (view === 'book') renderBookDetail(routeData.id);
    if (view === 'cart') renderCart();
    if (view === 'checkout') renderCheckout();
    if (view === 'login') renderAuth();

    const activeNav = view === 'book' ? 'shop' : (view === 'delivery' ? '' : view);
    $$('[data-nav]').forEach(function (link) {
      if (link.dataset.nav && link.dataset.nav === activeNav) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    document.title = view === 'book'
      ? ((byId(routeData.id) ? byId(routeData.id).title : 'كتاب') + ' | WARAQ | وَرَق')
      : PAGE_TITLES[view];

    closeMobileMenu();
    window.scrollTo(0, 0);
  }

  /* ---------- Mobile menu ---------- */
  function closeMobileMenu() {
    const toggle = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'فتح القائمة');
    menu.hidden = true;
  }

  /* ---------- Event wiring ---------- */
  document.addEventListener('click', function (event) {
    const target = event.target;

    const addBtn = target.closest('[data-add]');
    if (addBtn) {
      const detailBuy = addBtn.closest('.detail-buy');
      const qtyInput = detailBuy ? $('#detail-qty') : null;
      addToCart(addBtn.dataset.add, qtyInput ? qtyInput.value : 1);
      return;
    }

    const qtyBtn = target.closest('[data-qty]');
    if (qtyBtn) { changeCartQty(qtyBtn.dataset.qty, Number(qtyBtn.dataset.delta)); return; }

    const removeBtn = target.closest('[data-remove]');
    if (removeBtn) { removeFromCart(removeBtn.dataset.remove); return; }

    const detailQtyBtn = target.closest('[data-detail-qty]');
    if (detailQtyBtn) {
      const input = $('#detail-qty');
      if (input) {
        let next = Number(input.value) + Number(detailQtyBtn.dataset.detailQty);
        next = Math.min(MAX_QTY, Math.max(1, next || 1));
        input.value = next;
      }
      return;
    }

    const categoryBtn = target.closest('[data-category]');
    if (categoryBtn) {
      filters.category = categoryBtn.dataset.category;
      renderShop();
      return;
    }

    const authTab = target.closest('[data-auth-mode]');
    if (authTab) {
      authMode = authTab.dataset.authMode;
      renderAuth();
      return;
    }

    if (target.closest('#clear-filters')) {
      filters.category = 'all';
      filters.sort = 'default';
      filters.query = '';
      window.location.hash = '#shop';
      renderShop();
      return;
    }

    if (target.closest('#menu-toggle')) {
      const toggle = $('#menu-toggle');
      const menu = $('#mobile-menu');
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'فتح القائمة' : 'إغلاق القائمة');
      menu.hidden = open;
      return;
    }

    if (target.closest('#mobile-menu a')) closeMobileMenu();
  });

  document.addEventListener('submit', function (event) {
    const form = event.target;
    if (form.id === 'search-form') {
      event.preventDefault();
      const query = $('#search-input').value.trim();
      filters.query = query;
      const target = '#shop' + (query ? '?q=' + encodeURIComponent(query) : '');
      if (window.location.hash === target) renderShop();
      else window.location.hash = target;
      return;
    }
    if (form.id === 'auth-form') { event.preventDefault(); handleAuthSubmit(form); return; }
    if (form.id === 'checkout-form') { event.preventDefault(); handleCheckoutSubmit(form); }
  });

  document.addEventListener('change', function (event) {
    if (event.target.id === 'sort-select') {
      filters.sort = event.target.value;
      renderShop();
    }
    if (event.target.id === 'detail-qty') {
      let value = Math.round(Number(event.target.value));
      if (!Number.isFinite(value) || value < 1) value = 1;
      event.target.value = Math.min(MAX_QTY, value);
    }
  });

  document.addEventListener('input', function (event) {
    if (event.target.closest('#checkout-form')) updateWhatsAppLink();
    if (event.target.id === 'detail-qty') {
      let value = Math.round(Number(event.target.value));
      if (Number.isFinite(value) && value >= 1) event.target.value = Math.min(MAX_QTY, value);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('hashchange', route);

  /* ---------- Init ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  fillGrid('#featured-grid', FEATURED);
  fillGrid('#arabic-grid', BOOKS.filter(function (b) { return b.lang === 'ar'; }).map(function (b) { return b.id; }));
  fillGrid('#english-grid', BOOKS.filter(function (b) { return b.lang === 'en'; }).map(function (b) { return b.id; }));
  fillGrid('#bestsellers-grid', BESTSELLERS);

  const heroCovers = $('#hero-covers');
  if (heroCovers) {
    ['hijra', 'pride', 'ghirnata'].forEach(function (id) {
      heroCovers.insertAdjacentHTML('beforeend', coverHTML(byId(id)));
    });
    hydrateCovers(heroCovers);
  }

  updateCartBadges();
  route();
})();
