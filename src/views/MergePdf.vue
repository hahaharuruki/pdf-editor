<template>
  <div class="container mt-5" @dragover.prevent @drop="onDrop">
    <h1 class="text-center mb-4">PDF 結合</h1>
    <p class="text-center">
      複数のPDFファイルを一つのPDFファイルに結合します。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。
    </p>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <input
                type="file"
                class="form-control d-none"
                id="pdfFiles"
                @change="onFileChange"
                accept="application/pdf"
                multiple
                ref="fileInput"
              />
              <button class="btn btn-danger w-100" @click="triggerFileInput">
                1. PDFファイルを選択
              </button>
            </div>
            <div class="mb-3" v-if="selectedFiles.length > 0">
              <label class="form-label">選択されたファイル:</label>
              <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
                <!-- 順番の数字を表示 -->
                <span class="file-index">{{ index + 1 }}.</span>
                <img :src="thumbnails[index]" class="img-thumbnail mb-2" alt="サムネイル" />
                <div class="file-info">
                  <span>{{ file.name }}</span>
                  <div class="icon-group">
                    <font-awesome-icon
                      icon="arrow-up"
                      class="text-primary"
                      @click="moveFileUp(index)"
                      v-if="index > 0"
                    />
                    <font-awesome-icon
                      icon="arrow-down"
                      class="text-primary"
                      @click="moveFileDown(index)"
                      v-if="index < selectedFiles.length - 1"
                    />
                    <div class="spacer"></div>
                    <font-awesome-icon
                      icon="trash-alt"
                      class="text-danger"
                      @click="removeFile(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button v-if="selectedFiles.length > 0 && !mergedPdfUrl" @click="mergePdfs" class="btn btn-primary w-100">
              2. 結合する
            </button>
            <a v-if="mergedPdfUrl" :href="mergedPdfUrl" download="merged.pdf" class="btn btn-secondary w-100 mt-2">
              3. ダウンロード
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocument } from 'pdf-lib';
import '@fortawesome/fontawesome-free/css/all.css';

GlobalWorkerOptions.workerSrc = `${process.env.BASE_URL}pdf.worker.mjs`;

export default {
  data() {
    return {
      pdfFiles: [],
      selectedFiles: [],
      thumbnails: [],
      mergedPdfUrl: null,
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
      const files = Array.from(event.target.files);
      this.addFiles(files);
      event.target.value = '';
    },
    onDrop(event) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files).filter(file => file.type === 'application/pdf');
      if (files.length) {
        this.addFiles(files);
      } else {
        alert('PDFファイルを選択してください。');
      }
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDragLeave(event) {
      event.preventDefault();
    },
    addFiles(files) {
      const newFiles = files.filter(file => !this.pdfFiles.includes(file));
      this.pdfFiles.push(...newFiles);
      this.selectedFiles.push(...newFiles.map(file => ({ name: file.name })));
      this.generateThumbnails(newFiles);
    },
    async generateThumbnails(files) {
      const cMapUrl = `${process.env.BASE_URL}cmaps/`;
      const cMapPacked = true;

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer, cMapUrl, cMapPacked }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.2 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        this.thumbnails.push(canvas.toDataURL('image/jpeg'));
      }
    },
    async mergePdfs() {
      if (this.pdfFiles.length === 0) return;

      const mergedPdf = await PDFDocument.create();

      for (const file of this.pdfFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      this.mergedPdfUrl = URL.createObjectURL(blob);
    },
    removeFile(index) {
      this.pdfFiles.splice(index, 1);
      this.selectedFiles.splice(index, 1);
      this.thumbnails.splice(index, 1);
    },
    moveFileUp(index) {
      if (index <= 0) return;
      this.swapFiles(index, index - 1);
    },
    moveFileDown(index) {
      if (index >= this.selectedFiles.length - 1) return;
      this.swapFiles(index, index + 1);
    },
    swapFiles(index1, index2) {
      [this.pdfFiles[index1], this.pdfFiles[index2]] = [this.pdfFiles[index2], this.pdfFiles[index1]];
      [this.selectedFiles[index1], this.selectedFiles[index2]] = [this.selectedFiles[index2], this.selectedFiles[index1]];
      [this.thumbnails[index1], this.thumbnails[index2]] = [this.thumbnails[index2], this.thumbnails[index1]];
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
.d-none {
  display: none;
}
.img-thumbnail {
  max-width: 100px;
  height: auto;
}
.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.file-index {
  margin-right: 10px;
  font-weight: bold;
}
.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.icon-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.icon-group i {
  cursor: pointer;
  margin-bottom: 5px;
}
.spacer {
  height: 40px;
}
</style>
