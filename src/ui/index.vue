<template>
    <div>
        <h1>Home</h1>

        <template v-if="authState.username">
            <br/>
            <div class="container">
                <div class="row">
                    <router-link :to="{ name: 'notebooks', params: { username: authState.username } }" class="btn btn-primary btn-lg col-xs-12 col-sm-6 col-md-4 col-lg-3" role="button">Notebooks</router-link>
                </div>
                <p></p>
                <div class="row">
                    <router-link :to="{ name: 'tasks', params: { username: authState.username } }" class="btn btn-primary btn-lg col-xs-12 col-sm-6 col-md-4 col-lg-3" role="button">Tasks</router-link>
                </div>
            </div>
        </template>

        <template v-else>
            <p>Welcome!</p>
            <p>Please log in or sign up.</p>
        </template>
    </div>
</template>


<script>
    import { authState } from '../auth.js';

    export default {
        name: 'index',

        data: function () {
            return {
                authState
            };
        }
    };
</script>
