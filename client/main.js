new Vue({
  el:'#app',
  data:{
    tasks: [],
    email:"",
    password:"",
    isLoggedIn: false,
    isAddingBacklog: false,
    isAddingProduct: false,
    isAddingDevelopment: false,
    isAddingDone: false,
    titleBacklogToAdd: "",
    titleProductToAdd: "",
    titleDevelopmentToAdd: "",
    titleDoneToAdd: "",
    onEdit: []
  },
  computed:{
    getBacklogs: function(){
      let data = []
      this.tasks.forEach((item)=>{
        if(item.category === "Backlog"){
          item.createdAt = this.convertTime(item.createdAt)
          data.push(item)
        }
      })
      return data
    },
    getDevelopments: function(){
      let data = []
      this.tasks.forEach((item)=>{
        if(item.category === "Development"){
          item.createdAt = this.convertTime(item.createdAt)
          data.push(item)
        }
      })
      return data
    },
    getProducts: function(){
      let data = []
      this.tasks.forEach((item)=>{
        if(item.category === "Product"){
          item.createdAt = this.convertTime(item.createdAt)
          data.push(item)
        }
      })
      return data
    },
    getDone: function(){
      let data = []
      this.tasks.forEach((item)=>{
        if(item.category === "Done"){
          item.createdAt = this.convertTime(item.createdAt)
          data.push(item)
        }
      })
      return data
    }
  },
  methods:{
    editTaskStart(id,title){
      this.onEdit = []
      this.onEdit.push(id,title)
    },
    firstaddTaskBacklog(){
      this.isAddingBacklog = true
    },
    cancelAddBacklog(){
      this.isAddingBacklog = false
    },
    firstaddTaskProduct(){
      this.isAddingProduct = true
    },
    cancelAddProduct(){
      this.isAddingProduct = false
    },
    firstaddTaskDevelopment(){
      this.isAddingDevelopment = true
    },
    cancelAddDevelopment(){
      this.isAddingDevelopment = false
    },
    firstaddTaskDone(){
      this.isAddingDone = true
    },
    cancelAddDone(){
      this.isAddingDone = false
    },
    AddTask(category){
      let title = this.getTitleToAdd(category)
      axios({
        method:'post',
        url:'http://localhost:3002/tasks',
        data:{
          title: title,
          category: category
        },
        headers:{
          token: localStorage.accessToken
        }
      })
      .then((results)=>{
        this.getTasks()
        this.isLoggedIn = true,
        this.titleBacklogToAdd= "",
        this.titleProductToAdd= "",
        this.titleDevelopmentToAdd= "",
        this.titleDoneToAdd= ""
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    EditTask(category){
      let title = this.onEdit[1]
      axios({
        method:'put',
        url:`http://localhost:3002/tasks/${this.onEdit[0]}`,
        data:{
          title: title,
          category: category
        },
        headers:{
          token: localStorage.accessToken
        }
      })
      .then((results)=>{
        this.getTasks()
        this.onEdit = []
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    cancelEdit(){
      this.onEdit = []
    },

    logout(){
      localStorage.clear()
      this.isLoggedIn = false
    },
    deleteTask(id){
      axios({
        method:'delete',
        url:`http://localhost:3002/tasks/${id}`,
        headers:{token: localStorage.accessToken}
      })
      .then((results)=>{
        this.getTasks()
      })
      .catch((err)=>{
        console.log(err)
      })
    },

    login(){
      axios({
        method:'post',
        url:'http://localhost:3002/login',
        data:{
          email: this.email,
          password: this.password
        }
      })
      .then((results)=>{
        localStorage.accessToken = results.data.accessToken
        this.getTasks()
        this.isLoggedIn = true
        this.email =""
        this.password = ""
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getTasks(){
      axios({
        method: 'get',
        url: 'http://localhost:3002/tasks',
        headers:{token: localStorage.accessToken}
      })
      .then(results=>{
        this.tasks = results.data
      })
      .catch((err)=>{
        console.log(err)
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
    move(category,id,title){
      axios({
        method: 'put',
        url: `http://localhost:3002/tasks/${id}`,
        headers:{token: localStorage.accessToken},
        data:{
          title: title,
          category: category
        }
      })
      .then(results=>{
        this.getTasks()
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    getTitleToAdd(category){
      let title
      switch(category){
        case "Backlog":
          title = this.titleBacklogToAdd
        break;
        case "Product":
          title = this.titleProductToAdd
        break;
        case "Development":
          title = this.titleDevelopmentToAdd
        break;
        case "Done":
          title = this.titleDoneToAdd
        break;
      }
      return title
    }
  },
  created (){
    if(localStorage.accessToken){
      this.isLoggedIn = true
      this.getTasks()
    }
  }
})
