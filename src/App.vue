<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          TUGAS PBK TEORI
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Todos" label="Todos" />
        <q-route-tab to="/Posts" label="Posts" />
        <q-route-tab to="/Albums" label="Albums" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<style>
.q-page-container {
  background-image: url('https://i.pinimg.com/564x/91/11/b2/9111b20fcfb60c17ea4d6ca8857761d3.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Set tinggi minimal sebesar tinggi viewport (100% viewport height) */
}
</style>
<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <nav>
        <ul style="color: white; justify-content: center;">
          <li @click="setView('todos')">Todos</li>
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
