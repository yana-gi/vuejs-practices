<template>
  <div class="editForm">
    <div v-show="mode === 'show'">
      <textarea class="textarea"
                v-bind:value="body"
                @input="$emit('input', $event.target.value)"></textarea>
      <div class="buttons">
        <button class="button is-primary" @click="clickEdit">
          変更
        </button>
        <button class="button is-primary" @click="clickRemove">
          削除
        </button>
      </div>
    </div>
    <div v-show="mode === 'create'">
      <textarea class="textarea"
                v-bind:value="body"
                @input="$emit('input', $event.target.value)" ></textarea>
      <button class="button is-primary" @click="clickCreate">
        作成
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  props: {
    mode: {
      type: String,
      required: true
    },
    body: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickCreate() {
      this.$emit('click-create')
    },
    clickEdit() {
      this.$emit('click-edit')
    },
    clickRemove() {
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
