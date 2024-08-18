<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">PDF 画像 変換</h1>
    <p class="text-center">各PDFページを画像に変換します。JPEG、PNG、BMPに変換できます。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <input type="file" class="form-control d-none" id="pdfFile" @change="onFileChange" accept="application/pdf" ref="fileInput" />
              <button class="btn btn-danger w-100" @click="triggerFileInput">1. PDFファイルを選択</button>
            </div>
            <div v-if="pdfData">
              <div class="mb-3">
                <label for="scale" class="form-label">解像度を選択</label>
                <input type="range" v-model.number="scale" class="form-range" id="scale" min="1" max="3" step="0.1" />
                <div class="d-flex justify-content-between">
                  <span>低</span>
                  <span class="text-center w-100">標準</span>
                  <span class="text-end w-100">高</span>
                </div>
              </div>
              <div class="mb-3">
                <label for="format" class="form-label">画像形式を選択</label>
                <select v-model="selectedFormat" class="form-select" id="format">
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/bmp">BMP</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">選択されたファイル: {{ selectedFileName }}</label>
                <div class="text-center">
                  <canvas ref="thumbnailCanvas" style="max-width: 100%; height: auto;"></canvas>
                </div>
              </div>
              <button @click="convertToImages" class="btn btn-primary w-100" :disabled="!pdfData">2. 変換する</button>
            </div>
            <button v-if="images.length > 0" @click="downloadAllImages" class="btn btn-secondary w-100 mt-2">3. 全ページを一括ダウンロード</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4" id="output">
      <div class="col-12" v-for="(image, index) in images" :key="index">
        <div class="card mb-3">
          <div class="card-body text-center">
            <img :src="image.src" :alt="'Page ' + (index + 1)" class="img-fluid" />
            <a :href="image.src" :download="getDownloadFileName(index)" class="btn btn-secondary mt-2">ページ{{ index + 1 }}をダウンロード</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

GlobalWorkerOptions.workerSrc = `${process.env.BASE_URL}pdf.worker.mjs`;

export default {
  data() {
    return {
      pdfData: null,
      images: [],
      scale: 1.5,
      selectedFileName: '',
      selectedFormat: 'image/jpeg',
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
        this.readFile(file);
      }
    },
    onDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
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
      if (file.type === 'application/pdf') {
        this.selectedFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.pdfData = new Uint8Array(e.target.result.slice(0));
          this.generateThumbnail();
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert('PDFファイルを選択してください。');
      }
    },
    async generateThumbnail() {
      if (!this.pdfData) return;

      const cMapUrl = `${process.env.BASE_URL}cmaps/`;
      const cMapPacked = true;

      const loadingTask = getDocument({ 
        data: this.pdfData.slice(0),
        cMapUrl,
        cMapPacked
      });

      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 });

      const canvas = this.$refs.thumbnailCanvas;
      const context = canvas.getContext('2d');

      const outputScale = Math.min(canvas.clientWidth / viewport.width, canvas.clientHeight / viewport.height);
      canvas.width = viewport.width * outputScale;
      canvas.height = viewport.height * outputScale;

      const transform = [outputScale, 0, 0, outputScale, 0, 0];
      const renderContext = {
        canvasContext: context,
        transform,
        viewport,
      };

      await page.render(renderContext).promise;
    },
    async convertToImages() {
      if (!this.pdfData) return;

      const cMapUrl = `${process.env.BASE_URL}cmaps/`;
      const cMapPacked = true;

      const loadingTask = getDocument({ 
        data: this.pdfData.slice(0),
        cMapUrl,
        cMapPacked
      });

      const pdf = await loadingTask.promise;
      this.images = [];

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: this.scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const imgDataUrl = canvas.toDataURL(this.selectedFormat);
        this.images.push({ src: imgDataUrl });
      }
    },
    getDownloadFileName(index) {
      const baseName = this.selectedFileName.replace('.pdf', '');
      const extension = this.selectedFormat.split('/')[1];
      return `${baseName}_page${index + 1}.${extension}`;
    },
    async downloadAllImages() {
      if (this.images.length === 0) return;

      const zip = new JSZip();
      const extension = this.selectedFormat.split('/')[1];
      for (let i = 0; i < this.images.length; i++) {
        const baseName = this.selectedFileName.replace('.pdf', '');
        const fileName = `${baseName}_page${i + 1}.${extension}`;
        const img = await fetch(this.images[i].src);
        const blob = await img.blob();
        zip.file(fileName, blob);
      }
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${this.selectedFileName.replace('.pdf', '')}.zip`);
    }
  },
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
body {
  background-color: #f8f9fa;
}
</style>
