<template>
  <div>
    <Navbar @toParentLogout="emitLogout" :userLogout="isLogin"></Navbar>
    <Login @toParentLogin ="emitLogin" v-if="!isLogin" @toParentRegister="emitRegister"></Login>
    <Main v-if="isLogin" :Tasks="tasks" @emitSuccessAdd = "SuccessAdd" @doneEdit = "doneEdit" @doneDelete = "doneDelete" @doneMove="doneMove"></Main>
  </div>
</template>

<script>
import axios from "axios"
import Main from "./views/Main.vue"
import Navbar from "./components/Navbar.vue"
import Login from "./views/Login.vue"
import io from 'socket.io-client'
export default {
  components:{
    Main,
    Login,
    Navbar
  },
  data() {
    return {
      tasks: [],
      isLogin: false,
      isRegister: false,
      socket: io('https://my-kanban-board-01.herokuapp.com')
    };
  },
  methods:{
    emitLogin(accessToken){
      this.isLogin = true,
      console.log(accessToken)
      localStorage.accessToken = accessToken
      this.getTasks()
    },
    emitRegister(){
      this.isLogin= false
    },
    emitLogout(){
      localStorage.clear(),
      this.isLogin = false
    },
    SuccessAdd(){
      this.getTasks()
    },
    doneEdit(){
      this.getTasks()
    },
    doneDelete(){
      this.getTasks()
    },
    doneMove(){
      this.getTasks()
    },
    getTasks(){
      axios({
        method: 'get',
        url: 'https://my-kanban-board-01.herokuapp.com/tasks',
        headers:{token: localStorage.accessToken}
      })
      .then(results=>{
        this.tasks = results.data
        this.socket.emit("newAddTask",this.tasks)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  created(){
    if(localStorage.accessToken){
      this.isLogin = true
      this.getTasks()
    }
    else{
      this.isLogin = false
    }
  },
  mounted(){
    this.socket.on("newAddTask",(newAddTask)=>{
      this.tasks = newAddTask
    })
  },
};
</script>
