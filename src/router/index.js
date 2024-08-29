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
// import SignPdf from '../views/SignPdf.vue';
import PrivacyPolicy from '@/views/PrivacyPolicy.vue';
import FaqPage from '@/views/FaqPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import BlogPage from '../views/BlogPage.vue';
// import HowToUseMergePdf from '../blog/HowToUseMergePdf.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/pdf-to-image',
      name: 'PdfToImage',
      component: PdfToImage,
    },
    // 他のルート設定
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      redirect: '/', // 存在しないURLの場合にホームにリダイレクトする
    },
  ],
});

export default router;