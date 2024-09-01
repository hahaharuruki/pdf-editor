<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">よくある質問 (FAQ)</h1>
    <div class="faq-content">
      <div class="faq-item">
        <h2>PDFファイルの編集は無料ですか？</h2>
        <p>はい、当サイトではすべてのPDF編集機能を無料で提供しています。</p>
      </div>
      
      <div class="faq-item">
        <h2>編集したPDFファイルは安全ですか？</h2>
        <p>
          はい、編集はすべてブラウザ上で行われるため、ファイルデータが外部に送信されることはありません。
          また、ユーザーの個人情報は収集しておらず、欧州データ保護規制(GDPR)に準拠しています。
        </p>
      </div>
      
      <div class="faq-item">
        <h2>対応しているPDFバージョンは何ですか？</h2>
        <p>当サイトはPDF 1.4から1.7に対応しています。</p>
      </div>
      
      <div class="faq-item">
        <h2>編集できるPDFの最大サイズは？</h2>
        <p>最大サイズは50MBです。それ以上のファイルは対応していません。</p>
      </div>
      
      <div class="faq-item">
        <h2>サポートしているブラウザは何ですか？</h2>
        <p>Google Chrome、Mozilla Firefox、Microsoft Edge、Safariの最新バージョンをサポートしています。</p>
      </div>
      
      <div class="faq-item">
        <h2>サポートに問い合わせる方法は？</h2>
        <p>サポートに問い合わせるには、<router-link to="/contact">お問い合わせページ</router-link>をご利用ください。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqPage'
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.faq-content {
  text-align: left;
}
h1 {
  margin-bottom: 1rem;
}
.faq-item {
  margin-bottom: 2rem;
}
.faq-item h2 {
  margin-bottom: 0.5rem;
}
</style>
