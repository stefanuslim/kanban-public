const { Task } = require("../models")

class TaskController {
  static showAll(req,res,next){
    Task.findAll()
    .then((data)=>{
      if(data.length === 0){
        const errorMessage = {
          name: "NotFoundError",
          message: "Data not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      return res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static addTask(req,res,next){
    let task = {
      title:req.body.title,
      category:req.body.category,
      UserId: req.userData.id
    }
    Task.create(task)
    .then((data)=>{
      if(data.id){
        return res.status(201).json(data)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static showById(req,res, next){
    Task.findByPk(+req.params.id)
    .then((data)=>{
      if(!data){
        const errorMessage = {
          name: "NotFoundError",
          message: "Data not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(data)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }


  static updateTask(req,res,next){
    let { title, category } = req.body
    Task.update({
          title,
          category
        },{
          where:{
          id: +req.params.id
        },returning:true})
    .then(data=>{
      if(data[0] === 0){
        const errorMessage = {
          name: "NotFoundError",
          message: "Data not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(data[1][0])
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

  static deleteTask(req,res,next){
    let deletedData = []
    Task.findByPk(req.params.id)
    .then((data)=>{
      deletedData.push(data)
      return Task.destroy({
        where:{
          id: +req.params.id
        }
      })
    })
    .then(()=>{
      if(deletedData[0] === null){
        const errorMessage = {
          name: "NotFoundError",
          message: "Data not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      else{
        return res.status(200).json(deletedData[0])
      }
    })
    .catch((err)=>{
      next(err)
    })
  }
}


module.exports = TaskController
