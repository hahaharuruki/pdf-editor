import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

// FontAwesomeをインポート
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

// アイコンをライブラリに追加
library.add(faTrashAlt, faArrowUp, faArrowDown);

// Vueアプリを作成
const app = createApp(App);

// FontAwesomeコンポーネントをグローバル登録
app.component('font-awesome-icon', FontAwesomeIcon);

// ルーターを使用し、アプリをマウント
app.use(router).mount('#app');
