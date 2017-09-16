<template>
    <div>
        <h1>Home</h1>

        <br/>

        <template v-if="authState.username">

            <b-row>
                <b-col cols="12" sm="12" md="6" lg="4" xl="3">
                    <b-button :to="{ name: 'notebooks', params: { username: authState.username } }" size="lg" block>Notebooks</b-button>
                </b-col>
            </b-row>

            <p></p>

            <b-row>
                <b-col cols="12" sm="12" md="6" lg="4" xl="3">
                    <b-button :to="{ name: 'tasks', params: { username: authState.username } }" size="lg" block>Tasks</b-button>
                </b-col>
            </b-row>

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
