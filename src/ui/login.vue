<template>
    <div>
        <h2>Login</h2>

        <br/>

        <a class="btn btn-social btn-facebook" href="/accounts/facebook/login/?process=login">
            <span class="fa fa-facebook"></span> Sign in with Facebook
        </a>

        <p></p>

        <a class="btn btn-social btn-google" href="/accounts/google/login/?process=login">
            <span class="fa fa-google"></span> Sign in with Google
        </a>

        <p></p>
        <br/>

        <form class="form-signin">
            <div class="form-group">
                <label for="login">Username or email</label>
                <input type="text" id="login" class="form-control" placeholder="Username or email" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" required>
            </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>

    </div>
</template>


<script>
    export default {
        name: 'login'
    };
</script>
