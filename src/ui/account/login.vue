<template>
    <div>
        <h2>Log In</h2>

        <br/>

        <b-row align-h="center">
            <b-col cols="10" sm="10" md="8" lg="6" xl="5">
                <b-button block class="btn-social btn-facebook" :href="getSocialLoginUrl('facebook')"><span class="fa fa-facebook"></span>Log in with Facebook</b-button>

                <b-button block class="btn-social btn-google" :href="getSocialLoginUrl('google')"><span class="fa fa-google"></span>Log in with Google</b-button>

                <br/>

                <b-form @submit.prevent="authenticate">
                    <b-form-group label="Username or email" label-for="username">
                        <b-form-input type="text" id="username" ref="username" v-model="username" placeholder="Username or email" required autofocus></b-form-input>
                    </b-form-group>

                    <b-form-group label="Password" label-for="password">
                        <b-form-input type="password" id="password" v-model="password" placeholder="Password" required></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Log in</b-button>
                </b-form>
            </b-col>
        </b-row>

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
