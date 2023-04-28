<template>
    <div class="task-item">
      <h3>{{ task.title }}</h3>
      <div class="task-details">
        <div><strong>Category:</strong> {{ task.categories }}</div>
        <div><strong>Description:</strong> {{ task.description }}</div>
        <!-- <div><strong>Comments:</strong> {{ task.comments }}</div> -->
        <div><strong>Status:</strong> {{ task.status }}</div>
        <div><strong>Due date:</strong> {{ task.dueDate }}</div>
      </div>
      <div class="task-actions">
        <button @click="handleEdit">Edit</button>
        <button @click="handleDelete">Delete</button>
      </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    methods: {
        handleDelete() {
          this.$emit('delete', this.task._id)
        },
        handleEdit() {
          this.$emit('edit', this.task_id)
        }
    }
  }
</script>
  
<style>
  .task-item {
    width: calc(100% - 32px);
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 32px;
  }
  .task-actions {
    margin-top: 20px;
    display: flex;
    gap: 20px;
  }
</style>
  