<template>
  <div class="task-form">
    <form @submit.prevent="submitForm">
      <h2>Add task</h2>
      <input
        id="title"
        type="text"
        v-model="task.title"
        required
        autocomplete="off"
        placeholder="Title"
      />
      <textarea
        id="description"
        v-model="task.description"
        rows="3"
        required
        autocomplete="off"
        placeholder="Description"
      ></textarea>

      <label for="due-date">Catergory:</label>
      <select v-model="task.categories" name="categories" id="categories">
        <option value="" selected>--Please choose an option--</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="fitness">Fitness</option>
        <option value="travel">Travel</option>
        <option value="hobbies">Hobbies</option>
      </select>

      <label for="due-date">Due Date:</label>
      <input
        id="due-date"
        type="date"
        v-model="task.dueDate"
        required
        autocomplete="off"
      />
      <label for="status">Status:</label>
      <select v-model="task.status" name="status" id="status">
        <option value="" selected>--Please choose an option--</option>
        <option value="Not Started">Not Started</option>
        <option value="In Process">In Process</option>
        <option value="Finished">Finished</option>
      </select>
      <button class="unit" type="submit">Save Task</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      task: {
        title: "",
        description: "",
        categories: "",
        dueDate: "",
        status: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('task-add', this.task);
      this.task = {}
    }
  }
};
</script>

