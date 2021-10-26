import { useScrollToTop } from '@react-navigation/native';
import firebase from './Firebase/Firebase'

const db=firebase.database().ref('/todo')
const user=firebase.database().ref('/users')
const authe=firebase.auth();

class Todo{

    getData(){
        return db
    }

    createTodo(data,uid){
        return db.child(uid).push(data)
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
    //sign up with email
    signupuser(_email, _password, _name,navigation){
        return firebase.auth().createUserWithEmailAndPassword(_email,_password).then(res=>{
            res.user.sendEmailVerification().then(action=>{
                user.child(res.user.uid).set({
                    name:_name,
                    email:_email,
                    uid:res.user.uid,
                })
                navigation.navigate('Todolist');
            }).catch(error=>{
                console.log("send email error: ",error.message)
            })

        }).catch(error=>{
            console.log("Authentication error: ",error.message)
        })
    }

    signout(navigation){
         firebase.auth().signout
         navigation.navigate('Authentication');
    }
    signInWithemailPassword(_email,_password,navigation){
        console.log("__",_password)
      return firebase.auth().signInWithEmailAndPassword(_email,_password).then(res=>{
        navigation.navigate('Todolist');
      }).catch(error=>{
            console.log('log in error ',error)
      })
    }
  
}

export default new Todo()