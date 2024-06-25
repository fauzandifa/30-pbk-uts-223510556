<template>
  <div>
    <h2>Postingan</h2>
    <label for="user-select">Pilih User:</label>
    <select v-model="selectedUserId" @change="navigateToPosts" id="user-select">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>

    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-else>
      <ul v-if="posts.length > 0" class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <div v-else class="no-posts">
        Tidak ada postingan untuk user ini.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data() {
    return {
      users: [],
      selectedUserId: 1, // ID pengguna default yang dipilih
      posts: [],
      loading: false
    };
  },
  created() {
    // Ambil daftar pengguna saat komponen dibuat
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
          // Ambil postingan untuk pengguna pertama saat pertama kali komponen dimuat
          this.fetchPosts();
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchPosts() {
      this.loading = true;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching posts:', error);
          this.loading = false;
        });
    },
    navigateToPosts() {
      this.fetchPosts(); // Panggil fetchPosts saat ganti user dipilih
    }
  }
};
</script>

<style scoped>
/* Gaya khusus untuk komponen Posts */
select {
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-item h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 8px;
}

.post-item p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.no-posts {
  text-align: center;
  margin-top: 20px;
  color: #999;
  font-style: italic;
}
</style>
