<template>
  <div id="app">
    <div class="container">
      <div class="box is-mobile">
        <h1>{{ title }}</h1>
        <Memo v-for="memo in memos"
              :key="memo.id"
              v-bind="memo" ></Memo>
        <a href="">+</a>
        <Edit></Edit>
      </div>
    </div>
  </div>
</template>

<script>
import Memo from './components/Memo.vue'
import Edit from './components/Edit.vue'

export default {
  name: 'App',
  components: {
    Memo,
    Edit
  },
  data(){
    return {
      title: 'タイトル',
      memo: { id: 1, body: 'メモ1' },
      memos: [
        { id: 1, body: 'メモ1' },
        { id: 2, body: 'メモ2' },
        { id: 3, body: 'メモ3' }
      ]
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
