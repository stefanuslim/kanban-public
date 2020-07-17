<template>
    <div class="container mt-3" id="container">
	     <div class="form-container sign-up-container">
		       <form v-on:submit.prevent="register">
			         <h1>Create Account</h1>

			<input type="email" placeholder="Email" v-model="emailregister">
			<input type="password" placeholder="Password" v-model="passwordregister">
			<button>Register</button>
		</form>
	</div>
	<div class="form-container sign-in-container mt-0">
    <div class="container mt-5">
      <form v-on:submit.prevent="login">
        <h1>Login</h1>
        <input type="email" placeholder="Email" v-model="emaillogin">
        <input type="password" placeholder="Password" v-model="passwordlogin">
        <button>Login</button><br>
        <span>or use your google account</span><br>
      </form>
      <button v-google-signin-button="clientId" class="google-signin-button ml-5"> Continue with Google</button><br>
    </div>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Do You Have Account?</h1>
				<p>Just login here</p>
				<button class="ghost" id="login">Login</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>No Account?</h1>
				<p>Register your personal information here</p>
				<button class="ghost" id="register">Register</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from "axios"
import GoogleSignInButton from 'vue-google-signin-button-directive'
  export default{
    directives: {
      GoogleSignInButton
    },
    data(){
      return {
        clientId: '59918729087-usdddq86on00mv2fnbbmus3onsjvqe37.apps.googleusercontent.com',
        emaillogin: "",
        passwordlogin: "",
        emailregister: "",
        passwordregister: ""
      }
    },
    components:{
    },
    methods:{
      OnGoogleAuthSuccess (idToken) {
        axios({
          method:'post',
          url:'https://my-kanban-board-01.herokuapp.com/googleSignIn',
          data:{
            id_token: idToken
          }
        })
        .then((results)=>{
          this.emaillogin = ""
          this.passwordlogin = ""
          this.$emit("toParentLogin", results.data.token)
        })
        .catch((err)=>{
          swal("Failed!", "Please Try Again", "error");
        })
      },
      OnGoogleAuthFail (error) {
        console.log(error)
      },
      login(){
        axios({
          method:'post',
          url:'http://localhost:3001/login',
          data:{
            email: this.emaillogin,
            password: this.passwordlogin
          }
        })
        .then((results)=>{
          this.emaillogin = ""
          this.passwordlogin = ""
          this.$emit("toParentLogin", results.data.accessToken)
        })
        .catch((err)=>{
          swal("Failed!", "Please Try Again", "error");
        })
      },
      register(){
        axios({
          method:'post',
          url:'https://my-kanban-board-01.herokuapp.com/register',
          data:{
            email: this.emailregister,
            password: this.passwordregister
          }
        })
        .then((results)=>{
          this.emailregister =""
          this.passwordregister = ""
          this.$emit("toParentRegister")
          swal("Success!", "You have successfully register your personal information!", "success")
        })
        .catch((err)=>{
          swal("Failed!", "Please Try Again", "error");
        })
      }
    },
    props:{

    },
    mounted(){
      const registerButton = document.getElementById('register')
      const loginButton = document.getElementById('login')
      const container = document.getElementById('container')

      registerButton.addEventListener('click', () => {
        container.classList.add("right-panel-active")
      })

      loginButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active")
      });
    }
  }
</script>


<style scoped>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

* {
	box-sizing: border-box;
}

body {
	background: #4161ff;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: 'Arial';
	height: 100vh;
	margin: -20px 0 50px;
}

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
}

button {
	border-radius: 20px;
	border: 1px solid #FF4B2B;
	background-color: #FF4B2B;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #FFFFFF;
}

form {
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}

	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container{
	transform: translateX(-100%);
}

.overlay {
	background: #4161ff;
	background: -webkit-linear-gradient(to right, #4190ff, #4190ff);
	background: linear-gradient(to right, #4190ff, #4190ff);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #DDDDDD;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;
}

footer i {
    color: red;
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>
