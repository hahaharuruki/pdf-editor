<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">ブログ</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="post in posts" :key="post.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.excerpt }}</p>
            <a :href="post.link" class="btn btn-primary">続きを読む</a>
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
        { 
          id: 1, 
          title: '【2024年最新版】安全性で比較!!PDFを無料で編集する方法4選（結合・分割・圧縮）', 
          excerpt: '無料で使えるPDF編集ツール4選を紹介します。安全性の観点でそれぞれの比較と使い方の解説もしています。',
          link: 'https://www.ibiza-pdf.com/blog/blog1.html' 
        },
        { 
          id: 2, 
          title: '【2024年最新版】【安全】【プレビューで完結】インストール不要！MacでできるPDF編集方法解説', 
          excerpt: 'プレビューで全て完結!!Macの標準機能でPDF編集！インストール不要でセキュリティも強固な方法を紹介します。',
          link: 'https://www.ibiza-pdf.com/blog/blog2.html'
        },
        { 
          id: 3, 
          title: '【Adobe】【PDF】本当に無料!?どこまで無料!?どう違う!?AdobeのPDF編集、閲覧ソフトを徹底解説!!', 
          excerpt: 'AdobeのPDF編集や閲覧ができる製品の違い、無料でどこまでできるのか、どれを使えばいいのか徹底比較を行います！',
          link: 'https://www.ibiza-pdf.com/blog/blog3.html'
        },
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