import { useScrollToTop } from '@react-navigation/native';
import firebase from './Firebase/Firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
const db=firebase.database().ref('/todo')
const user=firebase.database().ref('/users')
const makeList=firebase.database().ref('/titles')
const authe=firebase.auth();

class Todo{

    getData(){
        return db.orderByChild('todoID').
    }

    createTodo(data,uid,time){
        
        return db.child(uid).child(time).set(data)//push
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
  async  signupuser(_email, _password, _name,navigation){
        return firebase.auth().createUserWithEmailAndPassword(_email,_password).then(async res=>{
            res.user.sendEmailVerification().then(async action=>{
                user.child(res.user.uid).set({
                    name:_name,
                    email:_email,
                    uid:res.user.uid,
                })
                try {
                    await AsyncStorage.setItem('todouser', res.user.uid)
                  } catch (error) {
                    console.log("send email error: ",error.message)
                  }
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