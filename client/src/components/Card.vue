<template>
  <div>
    <div class="card mt-2 mb-2 mr-3 ml-3 rounded">

      <div class="card-body pr-1 pl-1 pt-2 pb-2" v-if="onDelete">
        <h5 class="card-title">Are You Sure Want To Delete This?</h5>
        <form v-on:submit.prevent="submitDelete">
          <div class="card mt-2 mb-2 mr-3 ml-3 rounded" >
            <div class="container">
              <div class="row">
                <button type="submit" name="button" class="btn btn-success col-6" ><i class="fa fa-check-circle" aria-hidden="true"></i>Delete</button>
                <button type="button" name="button" class="btn btn-secondary col-6" v-on:click="cancelDelete"><i class="fa fa-times-circle" aria-hidden="true"></i>Cancel</button>
              </div>
            </div>

          </div>
        </form>
      </div>



      <div class="card-body pr-1 pl-1 pt-2 pb-2" v-if="!onDelete">
        <h5 class="card-title" v-if="!onEdit"> {{ task.title }}</h5>
        <form v-if="onEdit" v-on:submit.prevent="submitEditTask">
          <div class="card mt-2 mb-2 mr-3 ml-3 rounded" >
            <textarea name="name" id="inputEdit" rows="4" v-model="titleToEdit"></textarea>
            <div class="container">
              <div class="row">
                <button type="submit" name="button" class="btn btn-success col-6" ><i class="fa fa-check-circle" aria-hidden="true"></i>Edit</button>
                <button type="button" name="button" class="btn btn-secondary col-6" v-on:click="cancelEdit"><i class="fa fa-times-circle" aria-hidden="true"></i>Cancel</button>
              </div>
            </div>

          </div>
        </form>
        <div class="container p-0">
          <div class="row">
            <div class="col-6">
              <p>By: {{ task.UserEmail }}</p>
              <p>{{ task.createdAt }}</p>
            </div>

            <div class="col-6 text-right" id="awesome-icons">
              <a href="#" v-on:click="editTask"><i class="fa fa-wrench" aria-hidden="true"></i></a>
              <a href="#" v-on:click="deleteTask"><i class="fa fa-trash" aria-hidden="true"></i></a>
              <a href="#" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-arrows-alt" aria-hidden="true"></i></a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button class="dropdown-item" type="button" v-for="item in filterCategory" v-on:click="move(item)">Move To {{ item }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    data(){
      return {
        titleToEdit: "",
        onEdit: false,
        tasks : [],
        onDelete: false
      }
    },
    computed: {
      filterCategory(){
        let allCategories = ["Backlog","Product","Development","Done"]
        let data = []
        allCategories.forEach((item)=>{
          if(item != this.task.category){
            data.push(item)
          }
        })
        return data
      }
    },
    methods:{
      move(category){
        axios({
          method: 'put',
          url: `https://my-kanban-board-01.herokuapp.com/tasks/${this.task.id}`,
          headers:{token: localStorage.accessToken},
          data:{
            title: this.task.title,
            category: category
          }
        })
        .then(results=>{
          this.$emit('doneMove')
          swal("Success!", "You have move your Task!", "success");
        })
        .catch((err)=>{
          console.log(err)
          swal("Failed!", "You're not authorized to move this task!", "error");
        })
      },
      deleteTask(){
        this.onDelete = true
      },
      submitDelete(){
        axios({
          method:'delete',
          url:`https://my-kanban-board-01.herokuapp.com/tasks/${this.task.id}`,
          headers:{token: localStorage.accessToken}
        })
        .then((results)=>{
          this.$emit("doneDelete")
          swal("Success!", "You have deleted your Task!", "success");
        })
        .catch((err)=>{
          swal("Failed!", "You're not authorized to delete this task!", "error");
        })
      },
      submitEditTask(){
        axios({
          method:'put',
          url:`https://my-kanban-board-01.herokuapp.com/tasks/${this.task.id}`,
          data:{
            title: this.titleToEdit,
            category: this.task.category
          },
          headers:{
            token: localStorage.accessToken
          }
        })
        .then((results)=>{
          this.onEdit = false
          this.$emit('doneEdit')
          swal("Success!", "You have edited your Task!", "success");
        })
        .catch((err)=>{
          swal("Failed!", "You're not authorized to edit this task!", "error");
        })
      },
      editTask(){
        this.onEdit = true
        this.titleToEdit = this.task.title
      },
      cancelEdit(){
        this.onEdit = false
      },
      cancelDelete(){
        this.onDelete = false
      }
    },
    props: ["task"]
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


#dropdownMenu2 {
  color:white;
}

#dropdownMenu2 {
  color:blue;
}
.card-title{
  font-size:18px;
}

</style>
