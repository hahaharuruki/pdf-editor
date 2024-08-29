// ResetButton.vue
<template>
  <button @click="resetPage" class="btn btn-secondary">リセット</button>
</template>

<script>
export default {
  methods: {
    resetPage() {
      this.$router.go(0);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 20px;
}
</style>