<template>
  <div>
    <div>
      <form v-on:submit.prevent="register">
        <div class="container mt-3 col-6">
          <h1>Register</h1>
          <div class="form-group">
            <label for="email-login">Email address</label>
            <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password-login">Password</label>
            <input type="password" class="form-control" id="password-register" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default{
    components:{
    }
  }
</script>
