<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">ブログ</h1>

    <!-- カテゴリ一覧 -->
    <div class="row mb-4">
      <div 
        class="col-md-4 mb-4" 
        v-for="category in categories" 
        :key="category.id"
      >
        <div 
          class="card h-100 shadow-sm category-card" 
          @click="selectedCategory = category.id"
          :class="{ 'active-category': selectedCategory === category.id }"
        >
          <div class="card-body text-center">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- 記事一覧 -->
    <div>
  <!-- 記事がある場合 -->
      <div 
        class="col-md-4 mb-4" 
        v-for="post in filteredPosts" 
        :key="post.id"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.excerpt }}</p>
            <a :href="post.link" class="btn btn-primary">続きを読む</a>
          </div>
        </div>
      </div>

      <!-- 記事がない場合 -->
      <div v-if="filteredPosts.length === 0" class="col text-center">
        <p>このカテゴリには記事がありません。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPage',
  data() {
    return {
      selectedCategory: null, // 選択されたカテゴリ
      categories: [
        { id: 'pdf', name: 'PDF編集' },
        { id: 'ai', name: 'AI' },
      ],
      posts: [
        {
          id: 1,
          title: '【2024年最新版】安全性で比較!!PDFを無料で編集する方法4選（結合・分割・圧縮）',
          excerpt: '無料で使えるPDF編集ツール4選を紹介します。安全性の観点でそれぞれの比較と使い方の解説もしています。',
          link: 'https://www.ibiza-pdf.com/blog/pdf/blog1.html',
          category: 'pdf', // カテゴリを指定
        },
        {
          id: 2,
          title: '【2024年最新版】【安全】【プレビューで完結】インストール不要！MacでできるPDF編集方法解説',
          excerpt: 'プレビューで全て完結!!Macの標準機能でPDF編集！インストール不要でセキュリティも強固な方法を紹介します。',
          link: 'https://www.ibiza-pdf.com/blog/pdf/blog2.html',
          category: 'pdf', // カテゴリを指定
        },
        {
          id: 3,
          title: '【Adobe】【PDF】本当に無料!?どこまで無料!?どう違う!?AdobeのPDF編集、閲覧ソフトを徹底解説!!',
          excerpt: 'AdobeのPDF編集や閲覧ができる製品の違い、無料でどこまでできるのか、どれを使えばいいのか徹底比較を行います！',
          link: 'https://www.ibiza-pdf.com/blog/pdf/blog3.html',
          category: 'pdf', // カテゴリを指定
        },
      ],
    };
  },
  computed: {
    filteredPosts() {
      // 選択されたカテゴリに基づいて記事をフィルタリング
      if (!this.selectedCategory) return [];
      return this.posts.filter(post => post.category === this.selectedCategory);
    },
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

.category-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.category-card:hover {
  transform: scale(1.05);
}

.active-category {
  border: 2px solid #007bff;
}

.text-center {
  text-align: center;
}
</style>