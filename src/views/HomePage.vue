<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">安全なPDF編集ツール</h1>
    <p class="text-center">無料のオンラインPDF編集ツール。PDFの結合、分割、圧縮、変換ができます。すべてブラウザ上で処理するので、サーバーを含めて外部にファイルデータが送信されることはありません。</p>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="tool in tools" :key="tool.title">
        <div class="card h-100 shadow-sm">
          <div class="card-body text-center">
            <img :src="tool.icon" class="card-img-top mb-3" :alt="tool.title">
            <h5 class="card-title">{{ tool.title }}</h5>
            <p class="card-text">{{ tool.description }}</p>
            <router-link :to="tool.route" class="btn btn-primary">開始する</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      tools: [
        {
          title: 'PDF 結合',
          description: '簡単な操作で複数のPDFファイルを一つのPDFファイルに結合します。',
          route: '/merge-pdf',
          //icon: require('@/assets/icons/merge-pdf.png')
        },
        {
          title: 'PDF 圧縮',
          description: '最良のクオリティを保ったままPDFファイルの容量を減らします。',
          route: '/pdf-compress',
          //icon: require('@/assets/icons/pdf-compress.png')
        },
        {
          title: 'PDF 分割',
          description: '簡単な操作で一つのPDFファイルを複数のPDFファイルに分割します。',
          route: '/split-pdf',
          //icon: require('@/assets/icons/split-pdf.png')
        },
        {
          title: 'PDFから画像に変換',
          description: 'PDFを画像ファイルに変換します。希望の解像度で変換できます。',
          route: '/pdf-to-image',
          //icon: require('@/assets/icons/pdf-to-image.png')
        },
        {
          title: '画像からPDF変換',
          description: '画像ファイルをPDFに変換します。',
          route: '/image-to-pdf',
          //icon: require('@/assets/icons/jpeg-to-pdf.png')
        },
        {
          title: '透かし',
          description: 'PDFに任意の文字列で透かしを追加します。',
          route: '/watermark-pdf',
          //icon: require('@/assets/icons/add-watermark.png')
        },
        {
          title: 'PDFの回転',
          description: 'PDFのページを90度ずつで回転させます。',
          route: '/rotate-pdf',
          //icon: require('@/assets/icons/rotate-pdf.png')
        },
        {
          title: 'ページ番号挿入',
          description: 'PDFにページ番号を挿入します。',
          route: '/page-number-pdf',
          //icon: require('@/assets/icons/page-number-pdf.png')
        },
        // {
        //   title: 'PDFに署名',
        //   description: 'PDFにデジタル署名を追加します。',
        //   route: '/sign-pdf',
        //   //icon: require('@/assets/icons/sign-pdf.png')
        // }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  border-radius: 10px;
}
.card-img-top {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>