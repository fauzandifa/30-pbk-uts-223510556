<!-- Todos.vue -->
<template>
  <div class="card-container">
    <div class="card">
      <div class="container">
        <h1 class="judul">To Do List</h1>
        <select class="select" v-model="filterOption" @change="handleFilterChange">
          <option value="all">Semua Kegiatan</option>
          <option value="incomplete">Kegiatan Belum Selesai</option>
          <option value="completed">Kegiatan Selesai</option>
        </select>
        <div id="app">
          <form @submit.prevent="addActivity" class="activity-form">
            <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan" class="input-text">
            <button type="submit" class="button-add">Tambah</button>
          </form>
        </div>
        <div class="activity-list-wrapper">
          <div v-if="filteredActivities.length > 0">
            <h2 class="section-title">Daftar Kegiatan</h2>
            <ul class="activity-list">
              <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item" :class="{ completed: activity.completed }">
                {{ activity.name }}
                <button @click="toggleComplete(activity)" class="button-checklist">
                  {{ activity.completed ? 'Batalkan Checklist' : 'Checklist' }}
                </button>
                <button v-if="!activity.completed" @click="cancelActivity(index)" class="button-cancel">Batal</button>
              </li>
            </ul>
          </div>
          <div v-else>
            <p>Tidak ada kegiatan yang sesuai dengan filter.</p>
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
      newActivity: '',
      activities: [],
      filterOption: 'all'
    };
  },
  computed: {
    filteredActivities() {
      if (this.filterOption === 'all') {
        return this.activities;
      } else if (this.filterOption === 'incomplete') {
        return this.activities.filter(activity => !activity.completed);
      } else if (this.filterOption === 'completed') {
        return this.activities.filter(activity => activity.completed);
      }
      return [];
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = '';
      }
    },
    cancelActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleComplete(activity) {
      activity.completed = !activity.completed;
    },
    handleFilterChange(event) {
      this.filterOption = event.target.value;
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

.activity-list-wrapper {
  overflow-y: auto;
  height: calc(100% - 200px);
}

.activity-form {
  margin-bottom: 20px;
}

.input-text {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-add {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-add:hover {
  background-color: #0056b3;
}

.section-title {
  margin-top: 20px;
  font-size: 1.5em;
}

.activity-list {
  max-height: 100%;
}

.activity-item {
  margin-bottom: 10px;
}

.button-checklist {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-checklist:hover {
  background-color: #218838;
}

.button-cancel {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-cancel:hover {
  background-color: #c82333;
}
</style>
