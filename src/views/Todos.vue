<template>
  <div class="todos">
    <h2>Todo List</h2>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Tambah tugas baru...">
      <button type="submit">Tambah</button>
    </form>
    <div class="filter-buttons">
      <button @click="currentFilter = 'all'" :class="{ 'active': currentFilter === 'all' }">Semua</button>
      <button @click="currentFilter = 'completed'" :class="{ 'active': currentFilter === 'completed' }">Selesai</button>
      <button @click="currentFilter = 'active'" :class="{ 'active': currentFilter === 'active' }">Belum Selesai</button>
    </div>
    <ul>
      <li v-for="(todo, index) in filteredTodos" :key="index" :class="{ completed: todo.completed }">
        <span @click="toggleTodo(index)" class="checkmark">{{ todo.completed ? '✔' : '○' }}</span>
        <span class="todo-text" :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <span @click="deleteTodo(index)" class="delete-btn">×</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  data() {
    return {
      newTodo: '',
      todos: [],
      currentFilter: 'all'
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = ''; // Kosongkan input setelah ditambahkan
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  computed: {
    filteredTodos() {
      if (this.currentFilter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else if (this.currentFilter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos;
      }
    }
  }
};
</script>

<style scoped>
/* Gaya khusus untuk komponen Todos */
.todos {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
}

.todos h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.todos form {
  display: flex;
  margin-bottom: 10px;
}

.todos input[type="text"] {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.todos button {
  padding: 8px 16px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.todos .filter-buttons {
  margin-bottom: 10px;
}

.todos .filter-buttons button {
  margin-right: 5px;
  background-color: #3498db;
}

.todos .filter-buttons button.active {
  background-color: #2980b9;
}

.todos ul {
  list-style-type: none;
  padding: 0;
}

.todos li {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 5px;
}

.todos li.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.todos .checkmark {
  margin-right: 10px;
  cursor: pointer;
}

.todos .delete-btn {
  margin-left: auto;
  cursor: pointer;
  color: #ff6347;
}

.todos .todo-text {
  flex: 1;
  font-size: 18px;
}
</style>
