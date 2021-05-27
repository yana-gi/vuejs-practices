<template>
  <div class="memo">
    <li>{{ body }}</li>
  </div>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    body: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
