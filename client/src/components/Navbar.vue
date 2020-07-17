<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary d-flex justify-content-between">
            <div class="p-2"><a class="navbar-brand font-weight-bold" href="#">My-Kanban-App</a></div>
            <div v-if="userLogout">
              <div class="p-2"><button type="button" name="button" class="btn btn-danger" v-on:click="logout"> Logout </button></div>
            </div>
    </nav>
</template>

<script>
  export default {
    methods:{
      logout(){
        this.$emit("toParentLogout")
      }
    },
    created(){

    },
    props:["userLogout"]
  }
</script>
