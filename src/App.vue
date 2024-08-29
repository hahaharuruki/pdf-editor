<template>
  <div id="app">
    <header class="header">
      <div class="logo-container">
        <router-link to="/">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
          <span class="logo-text">ibizaPDF</span>
        </router-link>
      </div>
      <button class="menu-button" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
      <nav :class="{ 'nav-open': isMenuOpen }">
        <ul>
          <li><router-link to="/merge-pdf">PDF 結合</router-link></li>
          <li><router-link to="/split-pdf">PDF 分割</router-link></li>
          <li><router-link to="/pdf-compress">PDF 圧縮</router-link></li>
          <li><router-link to="/pdf-to-image">PDF 画像 変換</router-link></li>
          <li><router-link to="/image-to-pdf">画像 PDF 変換</router-link></li>
          <li><router-link to="/watermark-pdf">PDFに透かしの追加</router-link></li>
          <li><router-link to="/rotate-pdf">PDFの回転</router-link></li>
          <li><router-link to="/page-number-pdf">PDFにページ番号挿入</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view />
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-column">
          <h5>ホーム</h5>
          <ul>
            <li><router-link to="/">ホーム</router-link></li>
            <li><router-link to="/privacy-policy">プライバシーポリシー</router-link></li>
            <li><router-link to="/faq-page">よくある質問</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h5>言語</h5>
          <ul>
            <li>日本語</li>
            <!-- <li>English</li> -->
          </ul>
        </div>
        <div class="footer-column">
          <h5>コンタクト</h5>
          <ul>
            <li><router-link to="/contact-page">お問い合わせページ</router-link></li>
            <li><router-link to="/blog-page">ブログ</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h5>シェアする</h5>
          <div class="social-icons">
            <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="https://tiktok.com" target="_blank"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>©2024 ibizaPDF</p>
      </div>
    </footer>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
}

.logo-text {
  color: white;
  margin-left: 10px;
  text-decoration: none; /* 下線を消す */
}

.logo-container a {
  text-decoration: none; /* リンク全体の下線を消す */
}

.logo-container a:hover {
  text-decoration: none; /* ホバー時の下線も消す */
}

.menu-button {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
}

nav {
  display: flex;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

nav ul li {
  text-align: center;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

.nav-open {
  display: block;
}

@media (max-width: 768px) {
  .menu-button {
    display: block;
  }

  nav {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #333;
    z-index: 10;
  }

  nav ul {
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
  }

  nav ul li {
    width: 100%;
    padding: 0.5rem 0;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
  }

  .footer-column {
    margin-bottom: 20px;
  }
}

router-view {
  flex: 1;
}

.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  margin-top: auto;
  text-align: center;
}

.footer-container {
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  flex: 1;
}

.footer-column h5 {
  margin-bottom: 10px;
  color: #dc3545;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 5px;
}

.footer-column a {
  color: #343a40;
  text-decoration: none;
}

.footer-column a:hover {
  text-decoration: underline;
}

.social-icons a {
  color: #343a40;
  margin: 0 10px;
  font-size: 24px;
}

.footer-bottom {
  margin-top: 20px;
}
</style>