<template>
    <div class="task-manager">
      <TaskForm @task-add="addTask"/>
      <TaskList :tasks="tasks" @delete="deleteTask"/>
    </div>
  </template>
  
  <script>
  import FetchApi from '@/api'
  import TaskForm from '../components/TaskForm.vue'
  import TaskList from '../components/TaskList.vue'
  
  export default {
    name: 'TaskManager',
    components: {
      TaskForm,
      TaskList
    }, 

    data() {
      return {
        tasks: {}
      }
    },
    methods: {
      async fetchData() {
          this.tasks = await FetchApi.getTasks()
          // const token = localStorage.getItem('jwt');
          // await fetch('http://localhost:3000/tasks',{
          //   method: "GET",
          //   headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${token}` 
          // }
          // })
          // .then(result => result.json())
          // .then(data => this.tasks = data)
          // .catch(error => console.log(error));
      },
      async addTask(newTask) {
        await FetchApi.addTask(newTask)
          .then(result => result.json())
          .then(data => console.log(data))
          .catch(err => console.log(err))
        this.tasks = await FetchApi.getTasks()
                  // const token = localStorage.getItem('jwt');
        // await fetch('http://localhost:3000/tasks', {
        //   method: "POST",
        //   body: JSON.stringify(newTask),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}` 
        //   }
        // })
        // .then(result => result.json())
        // .then(data => {console.log(data);})
        // await fetch('http://localhost:3000/tasks',{
        //     method: "GET",
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}` 
        //   }
        //   })
        //   .then(result => result.json())
        //   .then(data => this.tasks = data)
        //   .catch(error => console.log(error));
      },
      async deleteTask(id) {
          const deletedTask = this.tasks.find(task => task._id === id);
          if (deletedTask) {
            const res = await FetchApi.deleteTask(id)
            console.log(res)
            this.tasks = await FetchApi.getTasks()
          } else {
            console.log('Task was not found')
          }
        // const token = localStorage.getItem('jwt');
        // await this.tasks.forEach(task => {
        //   if (task._id == id) {
        //       fetch(`http://localhost:3000/tasks/${id}`,{
        //           method: "DELETE",
        //           headers: {
        //             "Content-Type": "application/json", 
        //             'Authorization': `Bearer ${token}` 
        //             },
        //       })
        //       .then(result => result.json())
        //       .then(data => {
        //         console.log(data);
        //         fetch('http://localhost:3000/tasks',{
        //           method: "GET",
        //           headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': `Bearer ${token}` 
        //           }
        //         })
        //         .then(result => result.json())
        //         .then(data => this.tasks = data)
        //         .catch(error => console.log(error));
        //       })
        //       .catch(error => console.log(error));
        //   }
        // })
      }
    },
    created() {
      this.fetchData()
    }
  }
  </script>
  
  <style>
  body,h2, p, input, textarea, button {
      font-family: 'Montserrat', sans-serif;
      letter-spacing: -0.2px;
      font-size: 16px;
  }
  body, html {
    background-color:#ebecf0;
  }
  
  .task-manager {
    display:flex;
    gap: 40px;
    margin-right: 40px;
    margin-left: 40px;
  }

  form {
    padding: 48px;
    width: 320px;
    margin: 0;
    color:#61677C;
    font-weight: bold;
    box-shadow: -5px -5px 20px white,  5px 5px 20px #babecc;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-weight: 600;
    border-radius: 12px;
  }
  
  button, input,textarea,select,a {
    border: 0;
    outline: 0;
    font-size: 16px;
    border-radius: 320px;
    padding: 16px;
    background-color:#ebecf0;
    text-shadow: 1px 1px 0 white;
    margin-top: 20px;
  }
  label {
    display: block;
    /* margin-bottom: 24px; */
    margin-top: 24px;
    width: 100%;
  }
  textarea {
    resize:none;
    margin-top:24px;
    margin-bottom: 24px;
    padding: 24px;
  }
  input,textarea {
    margin-right: 8px;
    box-shadow:  inset 2px 2px 5px #babecc, inset -5px -5px 10px white;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
    appearance: none;
    -webkit-appearance: none;
  }
  
  input:focus,
  textarea:focus {
    box-shadow:  inset 1px 1px 2px #babecc, inset -1px -1px 2px white;
  }
  button,select,a {
    color:#61677C;
    font-weight: bold;
    box-shadow: -5px -5px 20px white,  5px 5px 20px #babecc;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
  }
  
  a:hover,button:hover {
    box-shadow: -2px -2px 5px white, 2px 2px 5px #babecc;
  }
    
  button:active,select:active {
    box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px white;
  }
  
  button.unit {
    border-radius: 8px;
    line-height: 0;
    width: 100%;
    height: 48px;
    margin: 24px 0px;
    font-size: 18px;
  }
  
  </style>