const { User } = require("../models")
const { checkPassword } = require("../helpers/bcrypt.js")
const { encode } = require('../helpers/jsonwebtoken.js');
const { OAuth2Client } =require("google-auth-library")

class UserController {
  static googleSignIn(req,res,next){
    let id_token = req.body.id_token
    let client = new OAuth2Client(process.env.CLIENT_ID)
    let payload
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID,
    })
    .then(ticket=>{
      payload = ticket.getPayload();
      const userid = payload['sub']
      return User.findOne({
        where:{
          email: payload["email"]
        }
      })
    })
    .then((data)=>{
      if(data){
        const accessToken = encode({id: data.id, email:data.email})
        return res.status(200).json({token: accessToken})
      }
      else{
        let dataUser = {
          email:payload["email"],
          password: "1234"
        }
        return User.create(dataUser)
      }
    })
    .then((data)=>{
      const accessToken = encode({id: data.id, email:data.email})
      return res.status(200).json({token: accessToken})
    })
    .catch(err=>{
      next(err)
    })
  }

  static register(req,res,next){
    User.create({
      email : req.body.email,
      password : req.body.password,
      organization: "Hacktiv8"
    })
    .then((data)=>{
      return res.status(201).json(data)
    })
    .catch((err)=>{
      next(err)
    })
  }

  static login(req,res,next){
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then((data)=>{
      if(!data){
        const errorMessage = {
          name: "NotFoundError",
          message: "Email not Found",
          statusCode: 404
        }
        throw(errorMessage)
      }
      if(checkPassword(req.body.password, data.password)){
        const access_token = encode({id: data.id, email:data.email})
        return res.status(200).json({accessToken: access_token})
      }
      else{
        const errorMessage = {
          name: "ValidationError",
          message: "Password incorrect",
          statusCode:401
        }
        throw(errorMessage)
      }
    })
    .catch((err)=>{
      next(err)
    })
  }

}


module.exports = UserController
