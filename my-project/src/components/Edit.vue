<template>
  <div class="edit">
    <textarea class="textarea"></textarea>
    <button class="button is-primary">編集</button>
    <button class="button is-primary">削除</button>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  props: {
    body: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
