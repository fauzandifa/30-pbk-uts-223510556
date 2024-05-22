<template>
  <div class="card-container">
    <div class="card">
      <div class="container">
        <h1 class="judul">User Posts</h1>
        <select v-model="selectedUser" @change="fetchPosts" class="user-select">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div class="post-list-wrapper">
          <div v-if="posts.length > 0">
            <ul class="post-list">
              <li v-for="post in posts" :key="post.id" class="post-item">
                <h2 class="post-title">{{ post.title }}</h2>
                <p class="post-body">{{ post.body }}</p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Tidak ada postingan untuk user ini.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: null,
      posts: []
    };
  },
  created() {
    this.fetchUsers(); // Panggil fungsi untuk mengambil daftar pengguna saat komponen dibuat
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
        if (this.users.length > 0) {
          this.selectedUser = this.users[0].id; // Pilih pengguna pertama secara default
          this.fetchPosts(); // Panggil fungsi untuk mengambil postingan saat daftar pengguna tersedia
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchPosts() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = await response.json();
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.card {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  height: 80%;
  display: flex;
  flex-direction: column;
}

.card .container {
  flex: 1;
  overflow: hidden;
}

.post-list-wrapper {
  overflow-y: auto;
  height: calc(100% - 60px);
}

.post-list {
  max-height: 100%;
}

.post-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ffc107;
  border-radius: 4px;
}

.post-title {
  margin-bottom: 10px;
  font-size: 1.5em;
}

.post-body {
  font-size: 1em;
  color: #6c757d;
}

.user-select {
  padding: 10px;
  border: 1px solid #ffc107;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
