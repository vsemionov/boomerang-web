<template>
    <div>
        <h2>Log In</h2>

        <br/>

        <a class="btn btn-social btn-facebook" :href="getSocialLoginUrl('facebook')"><span class="fa fa-facebook"></span> Sign in with Facebook</a>

        <p></p>

        <a class="btn btn-social btn-google" :href="getSocialLoginUrl('google')"><span class="fa fa-google"></span> Sign in with Google</a>

        <p></p>
        <br/>

        <form class="form-signin" @submit.prevent="authenticate">
            <div class="form-group">
                <label for="username">Username or email</label>
                <input type="text" id="username" v-model="username" ref="username" class="form-control" placeholder="Username or email" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" required>
            </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { BASE_URL } from '../../urls.js';
    import { authenticate } from '../../auth.js';
    import Spinner from '../spinner.vue';
    import Error from '../error.vue';

    export default {
        name: 'login',
        components: { Spinner, Error },
        data: function () {
            return {
                username: null,
                password: null,
                working: false,
                error: null
            }
        },
        methods: {
            getSocialLoginUrl: function (provider) {
                const loginCallbackHref = this.$router.resolve({ name: 'login-callback' }).href;
                const callbackUrlEncoded = encodeURIComponent(location.origin + loginCallbackHref);
                const apiRedirectUrlEncoded = encodeURIComponent(`/redirect?to=${callbackUrlEncoded}`);
                return BASE_URL + `accounts/${provider}/login?process=login&next=${apiRedirectUrlEncoded}`;
            },
            authenticate: function () {
                this.working = true;
                this.error = null;
                authenticate(this.username, this.password)
                    .then(() => this.$router.push({ name: 'index' }))
                    .catch(error => { this.working = false; this.error = error; });
            }
        },
        mounted: function () {
            this.$refs.username.focus();
        }
    };
</script>
