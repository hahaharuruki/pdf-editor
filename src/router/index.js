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
import NotFoundComponent from '../views/NotFoundComponent.vue';

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
  // { 
  //   path: '/sign-pdf', 
  //   name: 'SignPdf', 
  //   component: SignPdf 
  // }
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/faq-page',
    name: 'FaqPage',
    component: FaqPage
  },
  {
    path: '/contact-page',
    name: 'ContactPage',
    component: ContactPage
  },
  {
    path: '/blog-page', 
    name: 'BlogPage', 
    component: BlogPage 
  },
  // { 
  //   path: '/blog-page/how-to-use-merge-pdf', 
  //   name: 'HowToUseMergePdf', 
  //   component: HowToUseMergePdf 
  // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundComponent, // エラーページを表示するか、ホームにリダイレクトする
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;