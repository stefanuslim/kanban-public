<template>
  <div>
    <div class="main-page">
      <div class="boards d-flex flex-row bd-highlight mb-5 ml-4 mr-4 justify-content-center align-items-start row">
        <Board v-for="category in categories" :category="category" :key="category" :Tasks="Tasks" @SuccessAdd = "emitSuccessAdd" @doneEdit="doneEdit" @doneDelete="doneDelete" @doneMove="doneMove">
        </Board>
      </div>
    </div>
  </div>
</template>

<script>
  import Board from "../components/Board.vue"
  import axios from "axios"
  export default{
    components:{
      Board
    },
    data(){
      return {
        categories: ["Backlog","Product","Development","Done"],
        onEdit: []
      }
    },
    methods:{
      emitSuccessAdd(){
        this.$emit("emitSuccessAdd")
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
    },
    created(){

    },
    props: ["Tasks"]
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
