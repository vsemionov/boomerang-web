<template>
    <div>
        <h1>Notebooks</h1>

        <router-link v-for="notebook in notebooks" :to="{ name: 'notes', params: {username, notebook_id: notebook.id} }">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ notebook.name }}</h3>
                </div>
            </div>
        </router-link>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { getNotebooks } from '../data.js';
    import Spinner from './spinner.vue';
    import Error from './error.vue';

    export default {
        name: 'notebooks',
        props: ['username'],
        components: { Spinner, Error },

        data: function () {
            return {
                notebooks: null,
                working: false,
                error: null
            };
        },

        created: function () {
            this.working = true;
            getNotebooks(this.username)
                .then(notebooks => this.notebooks = notebooks)
                .catch(error => { this.error = error; })
                .then(() => this.working = false);
        }
    };
</script>
