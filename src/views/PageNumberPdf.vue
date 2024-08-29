<template>
  <div class="container mt-5" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
    <h1 class="text-center mb-4">ページ番号挿入</h1>
    <p class="text-center">PDFの各ページにページ番号の追加をします。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
              <label for="position" class="form-label">位置:</label>
              <select id="position" v-model="position" class="form-control">
                <option value="top-left">左上</option>
                <option value="top-right">右上</option>
                <option value="center-top">中央上</option>
                <option value="bottom-left">左下</option>
                <option value="bottom-right">右下</option>
                <option value="center-bottom">中央下</option>
              </select>
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="addPageNumbers" class="btn btn-primary w-100">2. ページ番号を追加する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, rgb } from 'pdf-lib';
import ResetButton from '@/components/ResetButton.vue';

export default {
  components: {
    ResetButton 
  },
  data() {
    return {
      selectedFileName: '',
      pdfData: null,
      position: 'bottom-right',
      pdfReady: false,
      numberedPdf: null,
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
    async addPageNumbers() {
      const pdfDoc = await PDFDocument.load(this.pdfData);
      const pages = pdfDoc.getPages();
      const { width, height } = pages[0].getSize();

      pages.forEach((page, idx) => {
        const pageNumber = idx + 1;
        let x, y;
        switch (this.position) {
          case 'top-left':
            x = 20;
            y = height - 20;
            break;
          case 'top-right':
            x = width - 50;
            y = height - 20;
            break;
          case 'center-top':
            x = width / 2 - 10;
            y = height - 20;
            break;
          case 'bottom-left':
            x = 20;
            y = 20;
            break;
          case 'bottom-right':
            x = width - 50;
            y = 20;
            break;
          case 'center-bottom':
            x = width / 2 - 10;
            y = 20;
            break;
        }
        page.drawText(`${pageNumber}`, {
          x,
          y,
          size: 12,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      this.numberedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
      this.pdfReady = true;
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.numberedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    resetPage() {
      this.selectedFileName = '';
      this.pdfData = null;
      this.position = 'bottom-right';
      this.pdfReady = false;
      this.numberedPdf = null;
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
