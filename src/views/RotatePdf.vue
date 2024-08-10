<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDFの回転</h1>
    <p class="text-center">PDFの各ページを90度ごとに回転します。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
              <label for="rotation" class="form-label">回転角度:</label>
              <select id="rotation" v-model.number="rotation" class="form-control">
                <option :value="90">右に90度</option>
                <option :value="-90">左に90度</option>
                <option :value="180">180度</option>
              </select>
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="rotatePdf" class="btn btn-primary w-100">2. 回転する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, degrees } from 'pdf-lib';

export default {
  data() {
    return {
      selectedFileName: '',
      pdfData: null,
      rotation: 90, // 回転角度を保持するデータプロパティ、デフォルトを90度に設定
      pdfReady: false,
      rotatedPdf: null,
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
    async rotatePdf() {
      const pdfDoc = await PDFDocument.load(this.pdfData);
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        page.setRotation(degrees(this.rotation));
      });

      const pdfBytes = await pdfDoc.save();
      this.rotatedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
      this.pdfReady = true;
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.rotatedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rotated_${this.selectedFileName}`;
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
