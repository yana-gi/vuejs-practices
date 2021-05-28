<template>
  <div class="memo">
    <a @click="doSelectMemo">{{ body }}</a>
  </div>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    id: Number,
    body: String
  },
  methods: {
    doSelectMemo() {
      this.$emit('selectMemo', this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
