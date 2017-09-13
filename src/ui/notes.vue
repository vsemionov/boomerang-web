<template>
    <div>
        <h1>Notes</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <a href="#" v-for="note in notes" class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ note.title }}</h3>
                </div>
                <div class="panel-body">{{ note.text }}</div>
            </div>
        </a>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { getNotes } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';

    export default {
        name: 'notes',
        props: ['username', 'notebook_id'],
        components: { Pager, Spinner, Error },

        data: function () {
            return {
                page: null,
                numPages: null,
                notes: null,
                working: false,
                error: null
            };
        },

        methods: {
            load: function () {
                this.page = parseInt(this.$route.query.page) || 1;
                this.notes = null;
                this.working = true;
                this.error = null;
                getNotes(this.username, this.notebook_id, this.page)
                    .then(data => { this.numPages = data.numPages; this.notes = data.results; })
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
