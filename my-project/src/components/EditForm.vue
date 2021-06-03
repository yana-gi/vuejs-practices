<template>
  <div class="editForm">
    <div v-show="mode === 'show'">
      <textarea class="textarea" v-model="inputText"></textarea>
      <div class="buttons">
        <button class="button is-primary" @click="doChangeMemo(inputText)">
          変更
        </button>
        <button class="button is-primary" @click="doRemoveMemo">
          削除
        </button>
      </div>
    </div>
    <div v-show="mode === 'create'">
      <textarea class="textarea" v-model="inputText" ></textarea>
      <button class="button is-primary" @click="doCreateMemo(inputText)">
        作成
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  props: {
    mode: String,
    body: String
  },
  data() {
    return {
      inputText: this.body
    }
  },
  watch: {
    body() {
      this.inputText = this.body
    }
  },
  methods: {
    doCreateMemo() {
      this.$emit('click-create', this.inputText)
    },
    doChangeMemo() {
      this.$emit('click-edit', this.inputText)
    },
    doRemoveMemo() {
      this.$emit('click-remove')
    }
  }
}
</script>

<style scoped>
.textarea {
  margin: 1em 0;
}
</style>
