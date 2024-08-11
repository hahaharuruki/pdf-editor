<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">お問い合わせ</h1>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <iframe 
                :src="googleFormUrl" 
                width="100%" 
                height="600" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0">
                読み込んでいます…
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScFnUi_kV6A_TF-AELb0OHDwqIpbNyZbfQohByK7pK2Qd6KdA/viewform?embedded=true'
      };
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
  </style>
  