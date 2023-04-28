
const url = 'http://localhost:3000/tasks/'

class FetchApi {
    //GET

    static getTasks() {
        const token = localStorage.getItem('jwt')
        return new Promise((resolve, reject) => {
            try {
                fetch(url,{
                    method: "GET",
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }}).then(data => resolve(data.json()))
            }
            catch (err) {
                reject(err)
            }
        })
    }

    //POST
    static addTask(newTask) {
        const token = localStorage.getItem('jwt')
        return new Promise((resolve, reject) => {
            try {
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(newTask),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                }})
                 .then(res => res.json())
                 .then(data => resolve(data))
            }   
            catch (err) {
                reject(err)
            }

        })
    }

    //DELETE
    static deleteTask(id) {
        const token = localStorage.getItem('jwt')
        return new Promise((resolve, reject) => {
            try {
                fetch(`${url}${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                }})
                .then(res => res.json())
                .then(result => resolve(result))
            }   
            catch (err) {
                reject(err)
            }

        })
    }
}

export default FetchApi