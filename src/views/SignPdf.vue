<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDFに署名</h1>
    <p class="text-center">PDFファイルに電子署名を行います。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
            <div class="mb-3" v-if="selectedFileName">
              <label for="fontSize" class="form-label">フォントサイズ:</label>
              <input type="number" id="fontSize" v-model.number="fontSize" class="form-control" />
            </div>
            <div v-if="pdfPreviewSrc">
              <div class="pdf-preview-container" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
                <img :src="pdfPreviewSrc" alt="PDF Preview" class="pdf-preview" />
                <div v-if="isDragging" class="signature-preview" :style="signatureStyle">{{ signatureText }}</div>
              </div>
            </div>
            <button v-if="selectedFileName && !pdfReady" @click="addSignature" class="btn btn-primary w-100">2. 署名を追加する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
            <!-- ResetButtonにresetHandlerを渡す -->
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
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
      signatureText: '',
      pdfReady: false,
      signedPdf: null,
      pdfPreviewSrc: null,
      isDragging: false,
      signatureStyle: {
        left: '0px',
        top: '0px',
      },
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      fontSize: 24,
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
        this.loadPdfPreview();
      };
      reader.readAsArrayBuffer(file);
    },
    async loadPdfPreview() {
      const loadingTask = getDocument({ data: this.pdfData });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      this.pdfPreviewSrc = canvas.toDataURL();
    },
    onMouseDown(event) {
      this.isDragging = true;
      this.startX = event.clientX - parseFloat(this.signatureStyle.left);
      this.startY = event.clientY - parseFloat(this.signatureStyle.top);
    },
    onMouseMove(event) {
      if (this.isDragging) {
        this.signatureStyle.left = `${event.clientX - this.startX}px`;
        this.signatureStyle.top = `${event.clientY - this.startY}px`;
      }
    },
    onMouseUp() {
      this.isDragging = false;
      this.x = parseFloat(this.signatureStyle.left);
      this.y = parseFloat(this.signatureStyle.top);
    },
    async addSignature() {
      try {
        const pdfDoc = await PDFDocument.load(this.pdfData);
        pdfDoc.registerFontkit(fontkit);
        const fontBytes = await fetch(NotoSansJP).then((res) => res.arrayBuffer());
        const customFont = await pdfDoc.embedFont(fontBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        firstPage.drawText(this.signatureText, {
          x: this.x,
          y: firstPage.getHeight() - this.y - this.fontSize,
          size: this.fontSize,
          font: customFont,
          color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        this.signedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfReady = true;
      } catch (error) {
        console.error('Failed to add signature:', error);
      }
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.signedPdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signed_${this.selectedFileName}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    resetPage() {
      this.selectedFileName = '';
      this.pdfData = null;
      this.signatureText = '';
      this.pdfReady = false;
      this.signedPdf = null;
      this.pdfPreviewSrc = null;
      this.isDragging = false;
      this.signatureStyle = {
        left: '0px',
        top: '0px',
      };
      this.startX = 0;
      this.startY = 0;
      this.x = 0;
      this.y = 0;
      this.fontSize = 24;
    },
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
.pdf-preview-container {
  position: relative;
}
.pdf-preview {
  width: 100%;
  border: 1px solid #ccc;
}
.signature-preview {
  position: absolute;
  padding: 5px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #000;
  cursor: move;
}
</style>
