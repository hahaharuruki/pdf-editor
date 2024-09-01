<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">PDF 抽出</h1>
    <p class="text-center">PDFファイルから選択したページを抽出して新しくPDFファイルの生成をします。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
            <div v-if="pdfLoaded">
              <label class="form-label mt-3">2. 抽出するページを選択</label>
              <div class="row">
                <div class="col-12 mb-3" v-for="(thumbnail, index) in thumbnails" :key="index">
                  <div class="page-preview" @click="togglePageSelection(index)" :class="{'selected': selectedPages.includes(index)}">
                    <img :src="thumbnail" :alt="'Page ' + (index + 1)" class="img-thumbnail" />
                    <div class="page-number">Page {{ index + 1 }}</div>
                  </div>
                </div>
              </div>
              <button @click="splitPdf" class="btn btn-primary w-100 mt-3" :disabled="selectedPages.length === 0">3. 抽出する</button>
            </div>
            <button v-if="splitPdfReady" @click="downloadSplitPdf" class="btn btn-secondary w-100 mt-2">4. ダウンロード</button>
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocument } from 'pdf-lib';
import ResetButton from '@/components/ResetButton.vue';

GlobalWorkerOptions.workerSrc = `${process.env.BASE_URL}pdf.worker.mjs`;

export default {
  components: {
    ResetButton 
  },
  data() {
    return {
      selectedFileName: '',
      pdfData: null,
      pdfLoaded: false,
      splitPdfBlob: null,
      splitPdfReady: false,
      thumbnails: [],
      selectedPages: [],
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
        const reader = new FileReader();
        reader.onload = (e) => {
          this.pdfData = new Uint8Array(e.target.result.slice(0));
          this.generateThumbnails();
        };
        reader.readAsArrayBuffer(file);
      }
    },
    onDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.selectedFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.pdfData = new Uint8Array(e.target.result.slice(0));
          this.generateThumbnails();
        };
        reader.readAsArrayBuffer(file);
      }
    },
    async generateThumbnails() {
      if (!this.pdfData) return;

      const loadingTask = getDocument({
        data: this.pdfData.slice(0),
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
        cMapPacked: true,
      });

      const pdf = await loadingTask.promise;
      this.thumbnails = [];
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1.0 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
        this.thumbnails.push(canvas.toDataURL('image/jpeg'));
      }
      this.pdfLoaded = true;
    },
    togglePageSelection(index) {
      const pageIndex = this.selectedPages.indexOf(index);
      if (pageIndex === -1) {
        this.selectedPages.push(index);
      } else {
        this.selectedPages.splice(pageIndex, 1);
      }
    },
    async splitPdf() {
      const pdfDoc = await PDFDocument.load(this.pdfData.slice(0));
      const newPdfDoc = await PDFDocument.create();
      const pages = await newPdfDoc.copyPages(pdfDoc, this.selectedPages);
      pages.forEach(page => newPdfDoc.addPage(page));
      const pdfBytes = await newPdfDoc.save();
      this.splitPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      this.splitPdfReady = true;
    },
    downloadSplitPdf() {
      const url = URL.createObjectURL(this.splitPdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `split_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    resetPage() {
      this.selectedFileName = '';
      this.pdfData = null;
      this.pdfLoaded = false;
      this.splitPdfBlob = null;
      this.splitPdfReady = false;
      this.thumbnails = [];
      this.selectedPages = [];
    },
    onDragOver(event) {
      event.preventDefault();
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
  .selected {
    border: 2px solid #007bff;
  }
  .page-preview {
    position: relative;
    cursor: pointer;
  }
  .page-number {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>