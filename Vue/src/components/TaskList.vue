<template>
    <div class="task-list">
      <div class="task-list-container">
        <div class="not-started">
        <span class="status ns">Not Started</span>
        <TaskItem v-for="task in NotStartedTasks" :key="task.id" :task="task" @edit="edit" @delete="deleteTask" />
        </div>
        <div class="in-process">
        <span class="status ip">In Process</span>
        <TaskItem v-for="task in InProcessTasks" :key="task.id" :task="task" @edit="edit" @delete="deleteTask" />
        </div>
        <div class="finished">
        <span class="status f">Finished</span>
        <TaskItem v-for="task in FinishedTasks" :key="task.id" :task="task" @edit="edit" @delete="deleteTask" />
        </div>
      </div>
      <EditModal @close="show = false" v-if="show" :task="editTask"/>
    </div>
</template>
  
<script>
  import TaskItem from "./TaskItem.vue";
  import EditModal from "./EditModal.vue"

  export default {
    name: "TaskList",
    components: {
      TaskItem,
      EditModal
    },
    data (){
      return {
        show: false,
        editTask: ''
      }
    },
    props: {
      tasks: {
        type: Object,
        required: true
      }
    },
    methods: {
      edit(id) {
        this.show = true;
        this.editTask = this.tasks.filter(task => task.id == id);
      },
      deleteTask(id) {
      this.$emit('delete', id);
    },

    },
    computed: {
      InProcessTasks() {
          return this.tasks.filter(task => task.status == 'In Process')
      },
      NotStartedTasks() {
          return this.tasks.filter(task => task.status == 'Not Started')
      },
      FinishedTasks() {
          return this.tasks.filter(task => task.status == 'Finished')
      },
    }
  }
</script>
  
  <style>  
  .task-list-container {
    display: grid;  
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .not-started,
  .in-process,
  .finished {
    display: flex;
    flex-direction: column;
  }

  .status {
    text-align: center;
    padding: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border-radius: 4px;
  }

  .status.ns {
    background: #FF6D60;
  }
  .status.ip {
    background: #F7D060;
  }
  .status.f {
    background: #98D8AA;
  }
  </style>
  