import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PdfToImage from '../views/PdfToImage.vue';
import MergePdf from '../views/MergePdf.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;