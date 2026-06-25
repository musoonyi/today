const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const loginModal = document.querySelector("#login");
const closeModal = document.querySelector("#close");
const loginSubmitBtn = document.querySelector(".loginSubmit");
const topMenu = document.getElementById("topMenu");
let isLoggedIn = false;
let pendingMyPage = false;

function updateAuthUI() {
  if (isLoggedIn) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "flex";
  } else {
    loginBtn.style.display = "flex";
    logoutBtn.style.display = "none";
  }
}

function setCatVisible(visible) {
  const cat = document.querySelector('.f_logo');
  if (!cat) return;
  cat.style.display = visible ? 'block' : 'none';
}

function openAccModal() {
  document.getElementById('accModal').classList.add('active');
}

function closeAccModal() {
  document.getElementById('accModal').classList.remove('active');
}

function applyTilt() {
  document.querySelectorAll('#myPage .card').forEach(card => {
    card.onmousemove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };
    card.onmouseleave = () => {
      card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`;
    };
  });
}

function runMyPageAnimations() {

  const cards = document.querySelectorAll(
    '#myPage .card, #myPage .stat_row, #myPage .my_top'
  );
  cards.forEach((card, i) => {
    card.classList.remove('my-animate');
    void card.offsetWidth;
    card.style.animationDelay = `${i * 0.08}s`;
    card.classList.add('my-animate');
  });

  const vals = document.querySelectorAll('#myPage .val');
  vals.forEach(el => {
    const unit = el.querySelector('span')?.textContent || '';
    const target = parseInt(el.textContent);
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = `${current}<span>${unit}</span>`;
      if (current >= target) clearInterval(timer);
    }, 30);
  });

  const bars = [
    { el: document.querySelector('.bar_movie'), width: '60%' },
    { el: document.querySelector('.bar_food'), width: '30%' },
    { el: document.querySelector('.bar_fashion'), width: '20%' },
    { el: document.querySelector('.bar_play'), width: '10%' },
  ];
  bars.forEach(({ el, width }, i) => {
    if (!el) return;
    el.style.width = '0%';
    setTimeout(() => {
      el.style.width = width;
    }, 300 + i * 100);
  });

  const badges = document.querySelectorAll('.badge_item');
  badges.forEach((badge, i) => {
    badge.classList.remove('shimmering');
    setTimeout(() => {
      badge.classList.add('shimmering');
      setTimeout(() => badge.classList.remove('shimmering'), 1400);
    }, 600 + i * 250);
  });

  applyTilt();
}

function spawnHeart(x, y) {
  const heart = document.createElement('div');
  heart.innerHTML = '🤍';
  heart.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: ${14 + Math.random() * 18}px;
    pointer-events: none;
    z-index: 99999;
    animation: floatHeart 1.2s ease forwards;
    transform: translateX(-50%);
  `;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const myPage = document.getElementById('myPage');
  const menuItems = document.querySelectorAll('.menu_item');
  const myMenuBtn = document.getElementById('myMenuBtn');
  const homeBtn = document.querySelector('.menu_item.active') || menuItems[0];

  updateAuthUI();

  // 계정설정 모달
  document.querySelector('.acc_btn').addEventListener('click', openAccModal);
  document.getElementById('accModalClose').addEventListener('click', closeAccModal);
  window.addEventListener('click', (e) => {
    const accModal = document.getElementById('accModal');
    if (e.target === accModal) closeAccModal();
  });

  // 닉네임 변경
  document.getElementById('nicknameSaveBtn').addEventListener('click', () => {
    const val = document.getElementById('nicknameInput').value.trim();
    const msg = document.getElementById('nicknameMsg');
    if (!val) {
      msg.textContent = '닉네임을 입력해주세요.';
      msg.className = 'acc_hint error';
    } else {
      msg.textContent = `닉네임이 "${val}"로 변경되었어요!`;
      msg.className = 'acc_hint success';
      document.getElementById('nicknameInput').value = '';
    }
  });

  // 비밀번호 변경
  document.getElementById('pwSaveBtn').addEventListener('click', () => {
    const cur = document.getElementById('pwCurrent').value;
    const nw = document.getElementById('pwNew').value;
    const cf = document.getElementById('pwConfirm').value;
    const msg = document.getElementById('pwMsg');
    if (!cur || !nw || !cf) {
      msg.textContent = '모든 항목을 입력해주세요.';
      msg.className = 'acc_hint error';
    } else if (nw !== cf) {
      msg.textContent = '새 비밀번호가 일치하지 않아요.';
      msg.className = 'acc_hint error';
    } else if (nw.length < 6) {
      msg.textContent = '비밀번호는 6자 이상이어야 해요.';
      msg.className = 'acc_hint error';
    } else {
      msg.textContent = '비밀번호가 변경되었어요!';
      msg.className = 'acc_hint success';
      document.getElementById('pwCurrent').value = '';
      document.getElementById('pwNew').value = '';
      document.getElementById('pwConfirm').value = '';
    }
  });

  // 회원탈퇴
  document.getElementById('deleteAccountBtn').addEventListener('click', () => {
    if (confirm('정말 탈퇴하시겠어요? 모든 데이터가 삭제되며 복구할 수 없어요.')) {
      isLoggedIn = false;
      updateAuthUI();
      closeAccModal();
      document.getElementById('myPage').classList.remove('active');
      document.getElementById('sidebar').classList.remove('to_right');
      topMenu.style.display = 'flex';
      setCatVisible(true);
      alert('탈퇴가 완료되었어요. 이용해주셔서 감사합니다!');
    }
  });

  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const isMy = item.id === 'myMenuBtn';

      if (isMy && !isLoggedIn) {
        pendingMyPage = true;
        loginModal.style.display = "flex";
        return;
      }

      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      myPage.classList.toggle('active', isMy);
      sidebar.classList.toggle('to_right', isMy);
      topMenu.style.display = isMy ? 'none' : 'flex';
      setCatVisible(!isMy);
      if (isMy) setTimeout(runMyPageAnimations, 100);
    });
  });

  loginSubmitBtn.addEventListener("click", () => {
    isLoggedIn = true;
    loginModal.style.display = "none";
    updateAuthUI();

    if (pendingMyPage) {
      menuItems.forEach(i => i.classList.remove("active"));
      myMenuBtn.classList.add("active");

      myPage.classList.add("active");
      sidebar.classList.add("to_right");
      topMenu.style.display = "none";
      setCatVisible(false);
      setTimeout(runMyPageAnimations, 100);

      pendingMyPage = false;
    }
  });

  logoutBtn.addEventListener("click", () => {
    isLoggedIn = false;
    updateAuthUI();

    myPage.classList.remove("active");
    sidebar.classList.remove("to_right");
    topMenu.style.display = "flex";

    menuItems.forEach(i => i.classList.remove("active"));
    if (homeBtn) homeBtn.classList.add("active");
    setCatVisible(true);
  });

  document.querySelector('#myPage').addEventListener('click', (e) => {
    const isHeart = e.target.closest('.stat_like, .fa-heart, [class*="heart"]');
    if (isHeart) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 60;
          spawnHeart(e.clientX + offsetX, e.clientY);
        }, i * 80);
      }
      return;
    }
    const isCard = e.target.closest('.card, .stat_row');
    if (isCard) spawnHeart(e.clientX, e.clientY);
  });
});

loginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.style.display = "none";
  }
});

var swiper = new Swiper(".topSwiper1", {
  loop: true,
  effect: "cube",
  grabCursor: true,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const searchTrigger = document.querySelector("#searchTrigger");
const searchBox = document.querySelector(".search_box");

searchTrigger.addEventListener("click", () => {
  searchBox.classList.toggle("active");
});