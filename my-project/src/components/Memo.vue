<template>
  <div class="memo">
    <a @click="doSelectMemo">
      {{ firstMemoLine }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    id: Number,
    body: String
  },
  computed:{
    firstMemoLine: function () {
      return this.body.split('\n')[0]
    }
  },
  methods: {
    doSelectMemo() {
      this.$emit('selectMemo', this.id)
    }
  }
}
</script>

<style scoped>

</style>
