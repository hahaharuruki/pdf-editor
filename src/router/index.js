import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PdfToImage from '../views/PdfToImage.vue';


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