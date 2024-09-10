<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">ブログ</h1>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.excerpt }}</p>
              <a href="https://www.ibiza-pdf.com/blog/blog1.html" class="btn btn-primary">続きを読む</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogPage',
    data() {
      return {
        posts: [
          { id: 1, title: '【2024年最新版】安全性で比較!!PDFを無料で編集する方法6選（結合・分割・圧縮）', excerpt: '無料で使えるPDF編集ツール6選を紹介します。安全性の観点でそれぞれの比較と使い方の解説もしています。' },
          
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  .card {
    border-radius: 10px;
  }
  </style>
  