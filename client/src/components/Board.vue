<template>
  <div class="category p-2 bd-highlight mt-3 col-3">
  <div class="card-header bg-info text-white">
    {{ category }}
  </div>
  <div class="contents">
    <div class="card-no-task mt-2 mb-2 mr-2 ml-2" v-if="getTaskByCategory.length === 0">
      <div class="card-body">
        <h4>No Task</h4>
      </div>
    </div>
    <Card v-for="card in getTaskByCategory" :task="card" :key="card.id" @doneEdit="doneEdit" @doneDelete="doneDelete" @doneMove = "doneMove"></Card>
    <form v-on:submit.prevent="submitAddTask" id="addForm" v-show="onAdd">
      <div class="card mt-2 mb-2 mr-3 ml-3 rounded">
        <textarea name="name" id="inputAdd" rows="4" cols="80" placeholder="Add Your Task" v-model="titleToAdd"></textarea>
        <div class="container">
          <div class="row">
            <button type="submit" name="button" class="btn btn-success col-6" ><i class="fa fa-check-circle" aria-hidden="true"></i>Add Task</button>
            <button type="button" name="button" class="btn btn-secondary col-6" v-on:click="cancelAdd"><i class="fa fa-times-circle" aria-hidden="true"></i>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer bg-primary text-white" v-if="!onAdd">
      <a href="#" v-on:click="addTask"><i class="fa fa-plus-square" aria-hidden="true" >  Add Task</i></a>
    </div>
    </form>
    </div>
</template>


<script>
  import axios from "axios"
  import Card from "./Card.vue"
  import io from 'socket.io-client'
  export default {
    components:{
      Card
    },
    data(){
      return {
        titleToAdd : "",
        onAdd: false
      }
    },
    props: ["category","Tasks"],
    computed:{
      getTaskByCategory(){
        let data = []
        this.Tasks.forEach((item)=>{
          item.createdAt = this.convertTime(item.createdAt)
          if(item.category === this.category){
            data.push(item)
          }
        })
        return data
      }
    },
    methods:{
      submitAddTask(){
        axios({
          method:'post',
          url:'https://my-kanban-board-01.herokuapp.com/tasks',
          data:{
            title: this.titleToAdd,
            category: this.category
          },
          headers:{
            token: localStorage.accessToken
          }
        })
        .then((results)=>{
          this.onAdd = false
          this.titleToAdd = ""
          this.$emit("SuccessAdd")
          swal("Success!", "You have added new Task!", "success");
        })
        .catch((err)=>{
          swal("Failed!", "Please Try Again!", "error");
        })
      },
      convertTime(timeCreated){
          let time = new Date(timeCreated)
          let minute
          if(time.getMinutes() < 10){
            minute = `0${time.getMinutes()}`
          }
          else{
            minute = time.getMinutes()
          }
          return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${minute}`
      },
      addTask(){
        this.onAdd = true
      },
      cancelAdd(){
        this.onAdd = false
      },
      doneEdit(){
        this.$emit("doneEdit")
      },
      doneDelete(){
        this.$emit("doneDelete")
      },
      doneMove(){
        this.$emit("doneMove")
      }
    }
  }
</script>


<style scoped>
.contents {
  height:450px;
  overflow-y: scroll;
  background-color:	#D3D3D3;
}

.card-header {
  font-weight:bold;
}

.fa-plus-square {
  color:white;
}

.card-no-task{
  background-color:	#D3D3D3;
  border-style: none;
  text-align: center;
}

p {
  font-size: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
}

#awesome-icons > a{
  color:white;
}


#awesome-icons > a:hover{
  color:black;
}

#dropdownMenu2 {
  color:white;
}

#dropdownMenu2 {
  color:black;
}
.card-title{
  font-size:18px;
}

</style>
