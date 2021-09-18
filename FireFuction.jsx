import Firebase from './Firebase/Firebase'

const db=Firebase.database().ref('/todo')

class Todo{

    getData(){
        return db
    }

    createTodo(data){
        return db.push(data)
    }
    getDataById(key){
        return db.child(key)
    }
    updateTodo(key,data){
        return db.child(key).update(data)
    }
    deleteTodo(key){
        return db.child(key).remove()
    }
    deleteAll(){
        return db.remove()
    }
}

export default new Todo()