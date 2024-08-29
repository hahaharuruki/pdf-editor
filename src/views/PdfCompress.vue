<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">PDF 圧縮</h1>
    <p class="text-center">PDFファイルを圧縮します。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
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
            <button v-if="selectedFileName && !compressedPdfReady" @click="compressPdf" class="btn btn-primary w-100">2. 圧縮する</button>
            <button v-if="compressedPdfReady" @click="downloadCompressedPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
            <ResetButton :resetHandler="resetPage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PDFDocument } from 'pdf-lib';
import ResetButton from '@/components/ResetButton.vue';

export default {
components: {
  ResetButton 
},
data() {
  return {
    selectedFileName: '',
    pdfData: null,
    compressedPdf: null,
    compressedPdfReady: false,
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
    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pdfData = new Uint8Array(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('PDFファイルを選択してください。');
    }
  },
  async compressPdf() {
    const pdfDoc = await PDFDocument.load(this.pdfData);
    
    // メタデータのクリア
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    const pdfBytes = await pdfDoc.save();
    this.compressedPdf = new Blob([pdfBytes], { type: 'application/pdf' });
    this.compressedPdfReady = true;
  },
  downloadCompressedPdf() {
    const url = URL.createObjectURL(this.compressedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${this.selectedFileName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
  resetPage() {
    this.selectedFileName = '';
    this.pdfData = null;
    this.compressedPdf = null;
    this.compressedPdfReady = false;
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
  .drop-zone {
    border: 2px dashed #007bff;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .drop-zone:hover {
    background-color: #f8f9fa;
  }
  .drop-zone p {
    margin: 0;
    font-size: 16px;
    color: #007bff;
  }
  </style>