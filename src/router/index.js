import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PdfToImage from '../views/PdfToImage.vue';
import MergePdf from '../views/MergePdf.vue';
import PdfCompress from '../views/PdfCompress.vue';
import SplitPdf from '../views/SplitPdf.vue';
import ImageToPdf from '../views/ImageToPdf.vue';
import WatermarkPdf from '../views/WatermarkPdf.vue';
import RotatePdf from '../views/RotatePdf.vue';
import PageNumberPdf from '../views/PageNumberPdf.vue';
import SignPdf from '../views/SignPdf.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/pdf-to-image',
    name: 'PdfToImage',
    component: PdfToImage
  },
  {
    path: '/merge-pdf',
    name: 'MergePdf',
    component: MergePdf
  },
  {
    path: '/pdf-compress',
    name: 'PdfCompress',
    component: PdfCompress
  },
  {
    path: '/split-pdf',
    name: 'SplitPdf',
    component: SplitPdf
  },
  { 
    path: '/image-to-pdf', 
    name: 'ImageToPdf', 
    component: ImageToPdf 
  },
  { 
    path: '/watermark-pdf', 
    name: 'WatermarkPdf', 
    component: WatermarkPdf 
  },
  { 
    path: '/rotate-pdf', 
    name: 'RotatePdf', 
    component: RotatePdf 
  },
  { 
    path: '/page-number-pdf', 
    name: 'PageNumberPdf', 
    component: PageNumberPdf 
  },
  { 
    path: '/sign-pdf', 
    name: 'SignPdf', 
    component: SignPdf 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;