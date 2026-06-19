/* =============================
   GauriNandan Silk — Shared JS
   Nav · Chatbot · Animations
   ============================= */

(function () {
  'use strict';

  /* ── SOCIAL LINKS ── */
  const LINKS = {
    whatsapp:  'https://wa.me/919823894289',
    facebook:  'https://www.facebook.com/share/14ZEr9QbPwk/',
    instagram: 'https://www.instagram.com/gaurinandan_silk?igsh=MXVwcW5zNHdubG9kYg==',
    maps:      'https://maps.app.goo.gl/ef2P8LEWgLj3ya296',
    phone:     '+919823894289',
  };

  /* ── MOBILE NAV ── */
  function initNav() {
    const hamburger  = document.getElementById('gn-hamburger');
    const mobileNav  = document.getElementById('gn-mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
  }

  /* ── CHATBOT ── */
  const BOT_REPLIES = {
    greeting:    `Namaste! 🙏 Welcome to <strong>GauriNandan Silk</strong> — Pune's heritage silk boutique. How can I help you today?`,
    collections: `✨ Our curated collections include:<br><br>• <strong>Paithani</strong> — Pune's pride & peacock motifs<br>• <strong>Banarasi</strong> — Gold zari opulence<br>• <strong>Kanjivaram</strong> — South Indian grandeur<br>• <strong>Patola</strong> — Double ikkat artistry<br>• <strong>Bridal Specials</strong> — Your dream saree<br><br><a href="shop.html" class="chat-link-btn">Browse All Collections →</a>`,
    whatsapp:    `💬 Connect with us directly on WhatsApp for orders, pricing & personal styling!<br><br><a href="${LINKS.whatsapp}" target="_blank" class="chat-link-btn green">Chat: +91 98238 94289 →</a>`,
    location:    `📍 <strong>Visit our boutique in Pune!</strong><br><br>Sr No 32/10, Sneha Niwas,<br>Nilgiri Chowk Road, Shriram Nagar,<br>Pune, Maharashtra 411046<br><br>🕐 Open: Mon–Sun, 10 AM – 8 PM<br><br><a href="${LINKS.maps}" target="_blank" class="chat-link-btn red">Open Google Maps →</a>`,
    instagram:   `📸 Follow us for daily saree inspiration, new arrivals & bridal styling!<br><br><a href="${LINKS.instagram}" target="_blank" class="chat-link-btn ig">Follow @gaurinandan_silk →</a>`,
    facebook:    `👍 Like our page to stay updated with new collections & special offers!<br><br><a href="${LINKS.facebook}" target="_blank" class="chat-link-btn blue">Like on Facebook →</a>`,
    bridal:      `💍 Our <strong>Bridal Collection</strong> is absolutely stunning! We specialise in:<br><br>• Paithani bridal sarees<br>• Heavy Banarasi silk<br>• Kanjivaram for reception<br><br>Best to connect for a personal bridal consultation!<br><br><a href="${LINKS.whatsapp}?text=I'm%20looking%20for%20bridal%20sarees" target="_blank" class="chat-link-btn green">WhatsApp for Bridal →</a>`,
    price:       `💰 Our sarees are priced based on fabric, craft & occasion. For exact pricing please connect with us:<br><br><a href="${LINKS.whatsapp}?text=I'd%20like%20to%20know%20the%20price%20of%20a%20saree" target="_blank" class="chat-link-btn green">Ask on WhatsApp →</a>`,
    paithani:    `🦚 Our <strong>Paithani sarees</strong> are Pune's pride — featuring stunning peacock motifs and pure gold zari borders. Authentic, handwoven masterpieces!<br><br><a href="shop.html" class="chat-link-btn">View Paithani →</a>`,
    banarasi:    `✨ Our <strong>Banarasi collection</strong> features the finest hand-woven silk with 24k gold plated zari work. Perfect for weddings and grand occasions!<br><br><a href="shop.html" class="chat-link-btn">View Banarasi →</a>`,
    default:     (msg) => `Thank you for reaching out! 🙏<br><br>For the best help, please connect with our team directly:<br><br><a href="${LINKS.whatsapp}?text=${encodeURIComponent(msg)}" target="_blank" class="chat-link-btn green">Continue on WhatsApp →</a>`,
  };

  function getBotReply(input) {
    const t = input.toLowerCase();
    if (/\b(hi|hello|namaste|hey|good)\b/.test(t))           return BOT_REPLIES.greeting;
    if (/\b(collection|shop|saree|catalog|browse)\b/.test(t)) return BOT_REPLIES.collections;
    if (/\b(paithani)\b/.test(t))                             return BOT_REPLIES.paithani;
    if (/\b(banarasi|banaras)\b/.test(t))                    return BOT_REPLIES.banarasi;
    if (/\b(whatsapp|order|buy|purchase|inquire)\b/.test(t)) return BOT_REPLIES.whatsapp;
    if (/\b(location|address|where|map|store|visit|direction)\b/.test(t)) return BOT_REPLIES.location;
    if (/\b(instagram|insta)\b/.test(t))                     return BOT_REPLIES.instagram;
    if (/\b(facebook|fb)\b/.test(t))                         return BOT_REPLIES.facebook;
    if (/\b(bridal|wedding|bride|dulhan)\b/.test(t))         return BOT_REPLIES.bridal;
    if (/\b(price|cost|rate|how much|budget)\b/.test(t))     return BOT_REPLIES.price;
    return BOT_REPLIES.default(input);
  }

  function initChatbot() {
    const toggle  = document.getElementById('gn-chat-toggle');
    const window_ = document.getElementById('gn-chat-window');
    const closeBtn = document.getElementById('gn-chat-close');
    const msgs    = document.getElementById('gn-chat-msgs');
    const input   = document.getElementById('gn-chat-input');
    const send    = document.getElementById('gn-chat-send');
    const quickBtns = document.querySelectorAll('.chat-quick-btn');
    if (!toggle || !window_) return;

    let opened = false;

    function addMsg(text, type = 'bot') {
      const d = document.createElement('div');
      d.className = `chat-msg ${type}`;
      d.innerHTML = text;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function sendMsg(text) {
      if (!text.trim()) return;
      addMsg(text, 'user');
      if (input) input.value = '';
      setTimeout(() => addMsg(getBotReply(text), 'bot'), 650);
    }

    toggle.addEventListener('click', () => {
      const isOpen = window_.classList.toggle('open');
      if (isOpen && !opened) {
        opened = true;
        setTimeout(() => addMsg(BOT_REPLIES.greeting, 'bot'), 450);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => window_.classList.remove('open'));
    if (send)     send.addEventListener('click', () => sendMsg(input?.value || ''));
    if (input)    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(input.value); });
    quickBtns.forEach(btn => btn.addEventListener('click', () => sendMsg(btn.dataset.msg)));
  }

  /* ── WISH TOGGLE ── */
  function initWishlist() {
    document.querySelectorAll('.product-wish').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.toggle('wishlisted');
        const svg = this.querySelector('svg');
        if (this.classList.contains('wishlisted')) {
          this.style.background = '#6B0F1A';
          svg.style.fill = '#fff';
        } else {
          this.style.background = 'rgba(255,255,255,0.92)';
          svg.style.fill = '#6B0F1A';
        }
      });
    });
  }

  /* ── OCCASION CHIPS ── */
  function initChips() {
    document.querySelectorAll('.occ-chip').forEach(chip => {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.occ-chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  /* ── INIT ── */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initReveal();
    initChatbot();
    initWishlist();
    initChips();
  });
})();
