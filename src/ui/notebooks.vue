<template>
    <div>
        <h1>Notebooks</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>

        <router-link v-for="notebook in notebooks" :to="{ name: 'notes', params: {username, notebook_id: notebook.id} }" class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ notebook.name }}</h3>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>
    import { getNotebooks } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';

    export default {
        name: 'notebooks',
        props: ['username'],
        components: { Pager, Spinner, Error },

        data: function () {
            return {
                page: null,
                working: false,
                error: null,
                numPages: null,
                notebooks: null
            };
        },

        methods: {
            load: function () {
                this.page = parseInt(this.$route.query.page) || 1;
                this.working = true;
                this.error = null;
                this.notebooks = null;
                getNotebooks(this.username, this.page)
                    .then(data => { this.numPages = data.numPages; this.notebooks = data.results; })
                    .catch(error => { this.error = error; })
                    .then(() => this.working = false);
            }
        },

        created: function () {
            this.load();
        },

        watch: {
            $route: function (to, from) {
                this.load();
            }
        }
    };
</script>
