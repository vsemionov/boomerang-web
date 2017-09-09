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

        <form class="form-signin" @submit.prevent="authenticate">
            <div class="form-group">
                <label for="username">Username or email</label>
                <input type="text" id="username" v-model="username" class="form-control" placeholder="Username or email" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" required>
            </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>

    </div>
</template>


<script>
    import { authState, authenticate } from '../auth.js';

    export default {
        name: 'login',
        data: function () {
            return {
                username: null,
                password: null
            }
        },
        methods: {
            authenticate: function () {
                authenticate(this.username, this.password).then(() => this.$router.push(`/${authState.username}`));
            }
        }
    };
</script>
