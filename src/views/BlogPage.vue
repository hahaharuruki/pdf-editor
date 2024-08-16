<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">ブログ（更新中）</h1>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
          <!-- <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.excerpt }}</p>
              <router-link :to="'/blog-page/how-to-use-merge-pdf'" class="btn btn-primary">続きを読む</router-link>
            </div>
          </div> -->
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
          { id: 1, title: 'PDF結合機能の紹介', excerpt: '複数のPDFファイルを一つのファイルに結合する方法について説明します。' },
          
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
  