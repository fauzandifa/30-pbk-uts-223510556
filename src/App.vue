<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <nav>
        <ul style="color: white; justify-content: center;">
          <li @click="setView('todos')">Todoswiwiwi</li>
          <li @click="setView('posts')">Posts</li>
        </ul>
      </nav>
    </header>
    <main>
      <div v-if="currentView === 'todos'">
        <Todos />
      </div>
      <div v-else-if="currentView === 'posts'">
        <Posts />
      </div>
    </main>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'; // Perbaikan jalur impor
import Posts from './components/Post.vue'; 

export default {
  name: 'App',
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      currentView: 'todos'
    };
  },
  methods: {
    setView(view) {
      this.currentView = view;
    }
  }
};
</script>

<style scoped>
header nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

header nav ul li {
  margin-right: 20px;
  cursor: pointer;
}
</style>
