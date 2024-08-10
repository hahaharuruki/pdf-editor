<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDFに署名</h1>
    <p class="text-center">PDFファイル。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <input type="file" class="form-control d-none" id="pdfFile" @change="onFileChange" accept="application/pdf" ref="fileInput" />
              <button class="btn btn-danger w-100" @click="triggerFileInput">1. PDFファイルを選択</button>
            </div>
            <div class="mb-3" v-if="selectedFileName">
              <label class="form-label">選択されたファイル: {{ selectedFileName }}</label>
            </div>
            <div class="mb-3" v-if="selectedFileName">
              <label for="signature" class="form-label">署名のテキスト:</label>
              <input type="text" id="signature" v-model="signatureText" class="form-control" />
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="addSignature" class="btn btn-primary w-100">2. 署名を追加する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import NotoSansJP from '@/assets/fonts/NotoSansJP-Regular.ttf'; // フォントファイルのパス

export default {
  data() {
    return {
      selectedFileName: '',
      pdfData: null,
      signatureText: '',
      pdfReady: false,
      signedPdf: null,
    };
  },
  mounted() {
    window.addEventListener('dragover', this.onDragOver);
    window.addEventListener('drop', this.onDrop);
  },
  beforeUnmount() {
    window.removeEventListener('dragover', this.onDragOver);
    window.removeEventListener('drop', this.onDrop);
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFileName = file.name;
        this.readFile(file);
      }
    },
    onDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.selectedFileName = file.name;
        this.readFile(file);
      }
    },
    onDragOver(event) {
      event.preventDefault();
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pdfData = new Uint8Array(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    },
    async addSignature() {
      const pdfDoc = await PDFDocument.load(this.pdfData);
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fetch(NotoSansJP).then(res => res.arrayBuffer());
      const customFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      firstPage.drawText(this.signatureText, {
        x: width - 150,
        y: height - 50,
        size: 24,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      this.signedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
      this.pdfReady = true;
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.signedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signed_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card {
  border-radius: 10px;
}
#output {
  margin-top: 20px;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
