<template>
    <div class="task-editor-modal">
      <div class="modal-content">
          <form class="modal-form" @submit.prevent="submitForm">
            <button type="button" class="close-btn" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
            <input type="text" class="form-control" id="title" >
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: 'EditModal',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        newTask: { ...this.task } // Make a copy of the task prop to avoid mutating the original data
      }
    },
    methods: {
      submitForm() {
        this.$emit('save', this.newTask)
      }
    }
  }
</script>
  
<style>
  .task-editor-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 5px;
  }

  .modal-form {
    width: auto
  }

  form {
    box-shadow: none;
  }
</style>  