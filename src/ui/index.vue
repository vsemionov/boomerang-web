<template>
    <div>
        <h1>Home</h1>

        <template v-if="authState.username">
            <br/>
            <router-link :to="{ name: 'notebooks', params: { username: authState.username } }" class="btn btn-primary btn-lg" role="button">Notebooks</router-link>
            <p></p>
            <router-link :to="{ name: 'tasks', params: { username: authState.username } }" class="btn btn-primary btn-lg" role="button">Tasks</router-link>
            <p></p>
            <router-link :to="{ name: 'info' }" class="btn btn-primary btn-lg" role="button">Info</router-link>
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
