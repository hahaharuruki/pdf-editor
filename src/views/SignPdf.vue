<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDFの文字を編集</h1>
    <p class="text-center">
      PDFファイルの文字を編集します。ファイルをドラッグ&ドロップして、編集したいページを選び、文字を入力してください。
    </p>
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
              <label for="editText" class="form-label">編集するテキスト:</label>
              <input type="text" id="editText" v-model="editText" class="form-control" />
            </div>
            <div class="mb-3" v-if="selectedFileName">
              <label for="fontSize" class="form-label">フォントサイズ:</label>
              <input type="number" id="fontSize" v-model.number="fontSize" class="form-control" />
            </div>
            <div class="mb-3" v-if="selectedFileName">
              <label for="colorPicker" class="form-label">テキスト色:</label>
              <input type="color" id="colorPicker" v-model="textColor" class="form-control" />
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="editTextInPdf" class="btn btn-primary w-100">2. テキストを編集</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
      </div>
    </div>

    <!-- PDFプレビューセクション -->
    <div v-if="pdfPreviewSrcList.length" class="pdf-preview-section">
      <h2 class="text-center mt-4">PDFプレビュー</h2>
      <div v-for="(previewSrc, index) in pdfPreviewSrcList" :key="index" class="pdf-preview-container">
        <img :ref="'pdfPreview' + index" :src="previewSrc" alt="PDF Preview" class="pdf-preview" />
        <div v-if="currentPageIndex === index" class="edit-text-preview" :style="editTextStyle" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          {{ editText }}
        </div>
      </div>

      <!-- ページ切り替えボタン -->
      <div class="text-center mt-4">
        <button v-if="currentPageIndex > 0" @click="currentPageIndex--">前のページ</button>
        <button v-if="currentPageIndex < pdfPreviewSrcList.length - 1" @click="currentPageIndex++">次のページ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import NotoSansJP from '@/assets/fonts/NotoSansJP-Regular.ttf';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
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
      editText: '', // 編集するテキスト
      textColor: '#000000', // テキスト色の初期値
      pdfReady: false,
      signedPdf: null,
      pdfPreviewSrcList: [],
      isDragging: false,
      editTextStyle: {
        left: '0px',
        top: '0px',
        fontSize: '24px',
        color: '#000000',
        opacity: 0.5,
        zIndex: 10, // テキストボックスを前面に表示
      },
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      fontSize: 24,
      currentPageIndex: 0, // 操作中のページを保持
    };
  },
  watch: {
    fontSize(newValue) {
      this.editTextStyle.fontSize = `${newValue}px`;
    },
    textColor(newValue) {
      this.editTextStyle.color = newValue;
    },
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
        this.loadPdfPreview();
      };
      reader.readAsArrayBuffer(file);
    },

    async loadPdfPreview() {
      const pdfDataCopy = this.pdfData.slice();
      const loadingTask = getDocument({
        data: pdfDataCopy,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@2.6.347/cmaps/',
        cMapPacked: true,
      });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      this.pdfPreviewSrcList = [];

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        this.pdfPreviewSrcList.push(canvas.toDataURL());
      }
    },

    onMouseDown(event) {
      this.isDragging = true;
      this.startX = event.clientX - parseFloat(this.editTextStyle.left);
      this.startY = event.clientY - parseFloat(this.editTextStyle.top);
    },

    onMouseMove(event) {
      if (this.isDragging) {
        this.editTextStyle.left = `${event.clientX - this.startX}px`;
        this.editTextStyle.top = `${event.clientY - this.startY}px`;
      }
    },

    onMouseUp() {
      this.isDragging = false;
      this.x = parseFloat(this.editTextStyle.left);
      this.y = parseFloat(this.editTextStyle.top);
    },

    async editTextInPdf() {
      try {
        if (!this.pdfData || !(this.pdfData instanceof Uint8Array)) {
          throw new Error('PDFデータが無効です');
        }

        const pdfDoc = await PDFDocument.load(this.pdfData);
        pdfDoc.registerFontkit(fontkit);
        const fontBytes = await fetch(NotoSansJP).then((res) => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const page = pages[this.currentPageIndex];

        const pdfHeight = page.getHeight();
        const previewHeight = this.$refs['pdfPreview' + this.currentPageIndex].offsetHeight;
        const previewWidth = this.$refs['pdfPreview' + this.currentPageIndex].offsetWidth;
        const pdfWidth = page.getWidth();

        const scaleX = pdfWidth / previewWidth;
        const scaleY = pdfHeight / previewHeight;

        const pdfX = this.x * scaleX;
        const pdfY = pdfHeight - (this.y * scaleY) - (this.fontSize * scaleY);

        const adjustedFontSize = this.fontSize * scaleY;
        const [r, g, b] = this.hexToRgb(this.textColor);

        page.drawText(this.editText, {
          x: pdfX,
          y: pdfY,
          size: adjustedFontSize,
          font: customFont,
          color: rgb(r / 255, g / 255, b / 255),
        });

        const pdfBytes = await pdfDoc.save();
        this.signedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfReady = true;
      } catch (error) {
        console.error('テキストの編集に失敗しました:', error);
      }
    },

    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    },

    downloadPdf() {
      const url = URL.createObjectURL(this.signedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    resetPage() {
      this.selectedFileName = '';
      this.pdfData = null;
      this.editText = '';
      this.pdfReady = false;
      this.signedPdf = null;
      this.pdfPreviewSrcList = [];
      this.isDragging = false;
      this.editTextStyle = {
        left: '0px',
        top: '0px',
        fontSize: '24px',
        color: '#000000',
        opacity: 0.5,
      };
      this.startX = 0;
      this.startY = 0;
      this.x = 0;
      this.y = 0;
      this.fontSize = 24;
      this.textColor = '#000000';
      this.currentPageIndex = 0;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border-radius: 10px;
}

.pdf-preview-section {
  margin-top: 30px;
  text-align: center;
}

.pdf-preview-container {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 1000px;
}

.pdf-preview {
  width: 100%;
  border: 1px solid #ccc;
}

.edit-text-preview {
  position: absolute;
  padding: 0;
  line-height: 1;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #000;
  cursor: move;
  font-size: inherit;
  color: inherit;
  z-index: 10;
}
</style>
