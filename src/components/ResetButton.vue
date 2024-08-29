<!-- ResetButton.vue -->
<template>
    <button @click="resetImport" class="btn btn-secondary">リセット</button>
  </template>
  
  <script>
  export default {
    props: {
      resetHandler: {
        type: Function,
        required: true
      }
    },
    methods: {
      resetImport() {
        this.resetHandler(); // ページ内のリセット処理を呼び出す
      }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    margin-top: 20px;
  }
  </style>