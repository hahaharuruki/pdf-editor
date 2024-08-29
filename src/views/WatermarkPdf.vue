<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDFに透かしの追加</h1>
    <p class="text-center">PDFに任意の文字列の透かしを追加します。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
              <label for="watermarkText" class="form-label">透かしのテキスト:</label>
              <input type="text" id="watermarkText" v-model="watermarkText" class="form-control" />
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="addWatermark" class="btn btn-primary w-100">2. 透かしを追加する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4" v-if="pdfReady">
      <div class="col-12">
        <iframe :src="pdfPreviewUrl" width="100%" height="600px"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import NotoSansJP from '@/assets/fonts/NotoSansJP-Regular.ttf';
import ResetButton from '@/components/ResetButton.vue';

export default {
  components: {
    ResetButton 
  },
  data() {
    return {
      selectedFileName: '',
      pdfData: null,
      watermarkText: '',
      pdfReady: false,
      pdfPreviewUrl: '',
    };
  },
  mounted() {
    window.addEventListener('dragover', this.onDragOver);
    window.addEventListener('drop', this.onDrop);
    window.addEventListener('dragleave', this.onDragLeave);
  },
  beforeUnmount() {
    window.removeEventListener('dragover', this.onDragOver);
    window.removeEventListener('drop', this.onDrop);
    window.removeEventListener('dragleave', this.onDragLeave);
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
    onDragLeave(event) {
      event.preventDefault();
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pdfData = new Uint8Array(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    },
    async addWatermark() {
      const pdfDoc = await PDFDocument.load(this.pdfData);
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fetch(NotoSansJP).then(res => res.arrayBuffer());
      const customFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = customFont.widthOfTextAtSize(this.watermarkText, 50);
        const textHeight = customFont.heightAtSize(50);
        const xSpacing = textWidth + 50;
        const ySpacing = textHeight + 50;

        for (let y = 0; y < height; y += ySpacing) {
          for (let x = -textWidth; x < width; x += xSpacing) {
            page.drawText(this.watermarkText, {
              x: x,
              y: y,
              size: 50,
              font: customFont,
              color: rgb(0.75, 0.75, 0.75),
              rotate: degrees(45),
              opacity: 0.5,
            });
          }
        }
      });

      const pdfBytes = await pdfDoc.save();
      this.pdfData = new Blob([pdfBytes], { type: 'application/pdf' });
      this.pdfPreviewUrl = URL.createObjectURL(this.pdfData);
      this.pdfReady = true;
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.pdfData);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    resetPage() {
      this.selectedFileName = '';
      this.pdfData = null;
      this.watermarkText = '';
      this.pdfReady = false;
      this.pdfPreviewUrl = '';
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
