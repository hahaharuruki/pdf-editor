<template>
  <div class="blog-page">
    <div class="container">
      <div class="row">
        <!-- メインコンテンツ -->
        <main class="col-md-8">
          <!-- パンくずリスト -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">ホーム</router-link></li>
              <li class="breadcrumb-item"><router-link to="/blog-page/">ブログ</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ articleTitle }}</li>
            </ol>
          </nav>

          <article>
            <h1 class="article-title">{{ articleTitle }}</h1>

            <h2>はじめに</h2>
            <p class="intr">
              「会議で使うために複数のPDFファイルを1つのPDFファイルに結合したい」<br>「プレゼンで使うためにPDFの一部のページを抜き出したい」<br>
              「クライアントへのメールにPDFを添付するためにファイルサイズを圧縮したい」<br>「エクセルに貼り付けるためにPDFを画像化したい」
            </p>
            <p>
              パソコンを使って業務をしていると、PDFファイルを結合、抽出、圧縮、変換したいということがありますよね。でも方法を検索するといろんなサービスが出てきてどの方法を使えばいいのかわからない。どの方法が安全なのかわからないという疑問を持つ方も多いでしょう。
              特に、業務で使うファイルは情報流出のリスクがない方法で編集をしたいですよね。
            </p>
            <p>この記事では特に安全性の観点から、6つの無料でPDF編集できる方法を比較し、それぞれの使い方も解説しています。</p>

            <div class="toc">
              <h2 @click="toggleToc" class="toc-header">目次 <span>{{ isTocOpen ? '▲' : '▼' }}</span></h2>
              <ul v-if="isTocOpen">
                <li><a href="#section1">{{ tocTitles.section1 }}</a></li>
                <li>
                  <a href="#section2">{{ tocTitles.section2.title }}</a>
                  <ul>
                    <li><a href="#section2-1">{{ tocTitles.section2.subsection1 }}</a></li>
                    <li><a href="#section2-2">{{ tocTitles.section2.subsection2 }}</a></li>
                    <li><a href="#section2-3">{{ tocTitles.section2.subsection3 }}</a></li>
                    <li><a href="#section2-4">{{ tocTitles.section2.subsection4 }}</a></li>
                    <li><a href="#section2-5">{{ tocTitles.section2.subsection5 }}</a></li>
                  </ul>
                </li>
                <li><a href="#section3">{{ tocTitles.section3 }}</a></li>
              </ul>
            </div>

            <section class='section1' id="section1">
              <h3>{{ tocTitles.section1 }}</h3>
              <p>まず、これから紹介する方法でどのような編集ができるのかを紹介していきます。また、以下の観点から各編集方法の機能を紹介していきます。</p>
              <h4>1. PDFの結合</h4>
              <p>
                複数のPDFファイルを1つのファイルにまとめる機能です。複数人で分担して作成した資料を1つの資料として完成させる場合や、
                繁雑になった複数のファイルを1つのファイルにまとめる際に活用できます。
              </p>
              <h4>2. PDFの抽出（分割・ページの削除）</h4>
              <p>
                1つのPDFから指定したページを抜き出す機能です。PDFの分割やページの削除という名前で機能が用意されていることもあります。
                ページ数が多いPDFファイルから不要なページを削除してファイルサイズを軽くしたり、必要なページだけを抜き出して利用したい際などに活用されます。
              </p>
              <h4>3. PDFの圧縮</h4>
              <p>
                PDFのファイルサイズを小さくしてメールで送りたい時などに活用されます。<br>各方法でどれくらいファイルサイズを小さくできるかが重要です。<br>
                またPDFの圧縮は、ファイル内の画像の圧縮や未使用のフォントやオブジェクトの削除、ファイル構造の最適化によってファイルサイズを小さくしています。
                したがって、画質が劣化したり、後からテキスト編集をすることが難しくなったり、メタデータが削除されていたりといったデメリットがあります。
              </p>
              <h4>4. PDFの変換</h4>
              <p>
                PDFを別のファイル形式に変換したい時、逆に別のファイル形式からPDFに変換したいときに用いられます。画像、Word、PowerPoint、Excelなどの形式への変換、
                またはそれらからの変換をすることができます。
              </p>
              <h4>5. その他</h4>
              <p>
                その他にも、方向が正しく保存されていないPDFを回転させる機能や、不正利用されないように透かしを入れる機能、PDFにページ番号を入れる機能などがあります。
              </p>
            </section>

            <section id="section2">
              <h3>{{ tocTitles.section2.title }}</h3>

              <!-- Sub-section 2.1 -->
              <section id="section2-1">
                <h4>{{ tocTitles.section2.subsection1 }}</h4>
                <img :src="AdobeAcrobatImage" alt="AdobeAcrobat Image" style="max-width: 100%; height: auto;">
                <p>
                  ブラウザ上で使える、制限付きで無料のPDF編集サイトです。ソフトウェアの大手企業のAdobeが運営しており、安全性と機能性を求める方におすすめです。
                  <br>無料で使うには編集回数に制限があり、アカウントを作成してログインすると、その制限が緩められます。ただし、無制限に編集をするには有料プランの契約が必要です。
                </p>
                <table>
                  <tr>
                    <td>メリット</td>
                    <td>大手企業のAdobeが運営するサービスのため、安心感を持って利用できる。また、機能も充実している。</td>
                  </tr>
                  <tr>
                    <td>デメリット</td>
                    <td>
                      ログインせずに無料で使う際は1回のみ編集とダウンロードが可能。ログインした場合でもプレミアム機能へのアクセスには有料プランの契約が必要。
                      サーバーへのアップロードと処理があるために完成に時間がかかる。
                    </td>
                  </tr>
                  <tr>
                    <td>機能</td>
                    <td>PDF結合、抽出、圧縮、画像変換、Word変換、Excel変換、PPT変換、透かしの追加、回転、ページ番号挿入、順序入れ替え、トリミング、OCR、署名、パスワード設定、編集</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>大手企業が運営するため、安心感を持って利用ができる。</td>
                  </tr>
                </table>
              </section>

              <!-- Sub-section 2.2 -->
              <section id="section2-2">
                <h4><router-link to="/" class="black-link">{{ tocTitles.section2.subsection2 }}</router-link>
                </h4>
                <img :src="ibizaPDFImage" alt="ibizaPDF Image" style="max-width: 100%; height: auto;">
                <router-link to="/">ibizaPDF.com</router-link>
                <p>
                  ブラウザ上で使える完全無料のPDF編集サイトです。一通りの機能が揃っており、処理が全てブラウザ上で完結し、サーバーにデータを送信することがないため、非常に安全に編集ができると言っていいでしょう。
                </p>
                <table>
                  <tr>
                    <td>メリット</td>
                    <td>完全無料。ブラウザ上で処理が完結するので、安全性が高く、重くないファイルであれば動作が軽快。画像はjpeg、png、bmpと幅広く対応。</td>
                  </tr>
                  <tr>
                    <td>デメリット</td>
                    <td>重いファイルを編集する際はパソコンのスペックによっては動作が不安定になることもある。</td>
                  </tr>
                  <tr>
                    <td>機能</td>
                    <td>PDF結合、抽出、圧縮、画像からの変換、画像への変換、透かしの追加、回転、ページ番号挿入</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>
                      ブラウザ上で処理が完結し、サーバーに送信することがないので非常に安全と言っていいでしょう。
                      また、欧州データ保護規制(GDPR)を遵守しているので安心して使用できます。
                    </td>
                  </tr>
                </table>
              </section>

              <!-- Sub-section 2.3 -->
              <section id="section2-3">
                <h4><router-link to="/" class="black-link">{{ tocTitles.section2.subsection3 }}</router-link></h4>
                <img :src="iLovePDFImage" alt="iLovePDF Image" style="max-width: 100%; height: auto;">
                <p>ブラウザ上で使える基本無料のオンラインPDF編集ツールです。海外のサイトで機能が豊富です。</p>
                <table>
                  <tr>
                    <td>メリット</td>
                    <td>機能が豊富で、昔からあるサイトのため安心感を持って使える。基本的な使い方であれば無料プランでも十分。</td>
                  </tr>
                  <tr>
                    <td>デメリット</td>
                    <td>ファイルがオンライン上のサーバーに送信されるため、データ流出の不安が残る。サーバーへのアップロードと処理があるために完成に時間がかかる。</td>
                  </tr>
                  <tr>
                    <td>機能</td>
                    <td>PDF結合、抽出、圧縮、画像変換、Word変換、Excel変換、PPT変換、透かしの追加、回転、ページ番号挿入、順序入れ替え、トリミング、OCR、署名、ロック解除、編集</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>欧州データ保護規制(GDPR)を遵守しているとのことで、基本的には安心して使用できる。</td>
                  </tr>
                </table>
              </section>

              <!-- Sub-section 2.4 -->
              <section id="section2-4">
                <h4><router-link to="/" class="black-link">{{ tocTitles.section2.subsection4 }}</router-link></h4>
                <img :src="SmallpdfImage" alt="Smallpdf Image" style="max-width: 100%; height: auto;">
                <p>ブラウザ上で使える基本無料のオンラインPDF編集ツールです。海外のサイトで機能が豊富です。</p>
                <table>
                  <tr>
                    <td>メリット</td>
                    <td>機能が豊富で、各種認証の取得やデータ保護規則を遵守しているため、安心感を持って利用できる。</td>
                  </tr>
                  <tr>
                    <td>デメリット</td>
                    <td>ファイルがオンライン上のサーバーに送信されるため、データ流出の不安が残る。サーバーへのアップロードと処理があるために完成に時間がかかる。1日の処理できる数に制限がある。</td>
                  </tr>
                  <tr>
                    <td>機能</td>
                    <td>PDF結合、抽出、圧縮、画像変換、Word変換、Excel変換、PPT変換、透かしの追加、回転、ページ番号挿入、順序入れ替え、トリミング、OCR、署名、ロック解除、編集</td>
                  </tr>
                  <tr>
                    <td>安全性</td>
                    <td>ISO/IEC 27001の認証を取得をしており、EU一般データ保護規則（GDPR）およびeIDASに準拠しているとのことで、基本的には安心して使用できる。</td>
                  </tr>
                </table>
              </section>
            </section>

            <section id="section3">
              <h3>{{ tocTitles.section3 }}</h3>
              <p>
                今回は安全性を重視して4つのPDFサービスを紹介してきました。今回紹介したサービスは全て安全とされているサービスです。ただし、絶対安全と言えるサービスはないため、
                手軽さを重視するか、コストは考えず安全第一のソフトを導入するか検討してみると良いでしょう。<br>
                手軽さと安全性を両立したサービスをお探しでしたら、<router-link to="/" class="black-link">{{ tocTitles.section2.subsection2 }}</router-link>
                を使ってみてください。より複雑な編集をするつもりでファイル数が少なければ、Adobe Acrobat。編集したいファイルが多くて高機能を求めていれば、
                iLovePDFやSmallpdf.comを活用してみてください。
              </p>
            </section>

            
          </article>
        </main>

        <!-- サイドバー -->
        <aside class="col-md-4">
          <!-- 人気記事 -->
          <!-- <div class="widget popular-posts">
            <h3 class="widget-title">人気記事</h3>
            <ul>
              <li><router-link to="/pdf-editor-best10">PDF編集ソフトベスト10</router-link></li>
              <li><router-link to="/pdf-to-excel">PDFをExcelに変換する方法</router-link></li>
              <li><router-link to="/pdf-to-word">PDFをWordに変換する方法</router-link></li>
              <li><router-link to="/pdf-annotate">PDFに文字を書き込む方法</router-link></li>
            </ul>
          </div> -->

          <!-- 関連記事 -->
          <div class="widget related-posts">
            <h3 class="widget-title">関連ページ</h3>
            <ul>
              <li><router-link to="/extract-pdf">PDFを抽出する方法</router-link></li>
              <li><router-link to="/pdf-compress">PDFを圧縮する方法</router-link></li>
              <li><router-link to="/page-number-pdf">PDFにページ番号を追加する方法</router-link></li>
            </ul>
          </div>

          <!-- サイドバーの目次 -->
          <div class="widget-toc">
            <h3 class="widget-title">目次</h3>
            <ul>
              <li><a href="#section1">{{ tocTitles.section1 }}</a></li>
              <li>
                <a href="#section2">{{ tocTitles.section2.title }}</a>
                <ul>
                  <li><a href="#section2-1">{{ tocTitles.section2.subsection1 }}</a></li>
                  <li><a href="#section2-2">{{ tocTitles.section2.subsection2 }}</a></li>
                  <li><a href="#section2-3">{{ tocTitles.section2.subsection3 }}</a></li>
                  <li><a href="#section2-4">{{ tocTitles.section2.subsection4 }}</a></li>
                </ul>
              </li>
              <li><a href="#section3">{{ tocTitles.section3 }}</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import ibizaPDFImage from '@/assets/blog1/ibizapdf.png';
import AdobeAcrobatImage from '@/assets/blog1/adobeacrobat.png';
import iLovePDFImage from '@/assets/blog1/ilovepdf.png';
import SmallpdfImage from '@/assets/blog1/smallpdf.png';

export default {
  name: 'BlogPage',
  data() {
    return {
      articleTitle: '【2024年最新版】安全性で比較!PDFを無料で編集するサービス4選（結合・抽出・圧縮・変換）',
      isTocOpen: false,
      tocTitles: {
        section1: 'PDFの編集でできること',
        section2: {
          title: '安全性重視!無料で使えるPDF編集サービス4選',
          subsection1: 'Adobe Acrobat',
          subsection2: 'ibizaPDF',
          subsection3: 'iLovePDF',
          subsection4: 'Smallpdf.com',
        },
        section3: 'まとめ',
      },
      ibizaPDFImage,
      AdobeAcrobatImage,
      iLovePDFImage,
      SmallpdfImage,
    };
  },
  methods: {
    toggleToc() {
      this.isTocOpen = !this.isTocOpen;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.col-md-8 {
  line-height: 35px;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 20px;
}

.article-title {
  margin-top: 20px;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #333;
}

.intr {
  color: #dc3545;
}

p {
  margin-bottom: 30px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

h4 {
  margin-top: 80px;
}

.toc {
  margin-bottom: 50px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.widget-toc {
  position: sticky;
  top: 20px;
  margin-bottom: 20px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.toc h2 {
  font-size: 1.5rem;
  margin-top: 7px;
}

.toc ul {
  list-style: none;
  padding: 0;
}

.toc ul li {
  margin-bottom: 10px;
}

.toc ul li a {
  color: #000000;
  text-decoration: none;
}

.toc ul li a:hover {
  text-decoration: underline;
}

.toc ul li ul {
  margin-left: 20px;
}

.toc-header {
  cursor: pointer;
}

section {
  margin-bottom: 100px;
}

.section1 h4 {
  margin-top: 40px;
}

.widget {
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.widget-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #333;
}

.widget ul {
  list-style-type: none;
  padding: 0;
}

.widget ul li {
  margin-bottom: 10px;
}

.widget ul li a {
  color: #0056b3;
  text-decoration: none;
}

.widget ul li a:hover {
  text-decoration: underline;
}

.widget-toc ul {
  list-style-type: none;
  padding: 0;
}

.widget-toc ul li {
  margin-bottom: 10px;
}

.widget-toc ul li ul {
  margin-left: 20px; /* サブ目次をインデント */
}

.widget-toc ul li a {
  color: #000000;
  text-decoration: none;
}

.widget-toc ul li a:hover {
  text-decoration: underline;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 8px;
  border: 1px solid #ddd;
}

td:first-child {
  font-weight: bold;
  white-space: nowrap;
}

.black-link {
  color: #000000; /* 黒文字に設定 */
  text-decoration: none; /* 下線を消す */
}

.black-link:hover {
  text-decoration: underline; /* マウスオーバー時に下線を表示 */
}
</style>