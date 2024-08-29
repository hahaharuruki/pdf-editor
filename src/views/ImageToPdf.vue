<template>
  <div class="container mt-5" @dragover.prevent @drop.prevent="onDrop">
    <h1 class="text-center mb-4">画像 PDF 変換</h1>
    <p class="text-center">画像をPDFファイルに変換します。JPEG、PNG、BMPに対応しています。すべてブラウザ上で処理されるので、サーバーを含めてファイルデータが外部に送信されることはありません。ファイルをドラッグ&ドロップしてください。</p>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="mb-3">
              <input type="file" class="form-control d-none" id="imageFiles" @change="onFileChange" accept="image/jpeg, image/png, image/bmp" multiple ref="fileInput" />
              <button class="btn btn-danger w-100" @click="triggerFileInput">1. 画像ファイルを選択</button>
            </div>
            <div class="mb-3" v-if="selectedFiles.length > 0">
              <label class="form-label">選択されたファイル:</label>
              <ul>
                <li v-for="file in selectedFiles" :key="file.name">{{ file.name }}</li>
              </ul>
              <div class="thumbnails">
                <img v-for="(thumbnail, index) in thumbnails" :src="thumbnail" :alt="'Thumbnail for ' + thumbnail" :key="index" class="thumbnail" />
              </div>
            </div>
            <button v-if="selectedFiles.length > 0 && !pdfReady" @click="convertToPdf" class="btn btn-primary w-100">2. PDFに変換する</button>
            <button v-if="pdfReady" @click="downloadPdf" class="btn btn-secondary w-100 mt-2">3. ダウンロード</button>
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
      selectedFiles: [],
      thumbnails: [],
      pdfData: null,
      pdfReady: false,
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
      this.selectedFiles = Array.from(event.target.files);
      this.generateThumbnails();
    },
    onDrop(event) {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      this.selectedFiles = files.filter(file => file.type.startsWith('image/'));
      this.generateThumbnails();
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDragLeave(event) {
      event.preventDefault();
    },
    generateThumbnails() {
      this.thumbnails = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnails.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    async convertToPdf() {
      const pdfDoc = await PDFDocument.create();
      for (const file of this.selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === 'image/bmp') {
          image = await pdfDoc.embedPng(arrayBuffer);
        }
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }
      const pdfBytes = await pdfDoc.save();
      this.pdfData = new Blob([pdfBytes], { type: 'application/pdf' });
      this.pdfReady = true;
    },
    downloadPdf() {
      const url = URL.createObjectURL(this.pdfData);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    resetPage() {
      this.selectedFiles = [];
      this.thumbnails = [];
      this.pdfData = null;
      this.pdfReady = false;
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
.thumbnails {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
}
</style>
