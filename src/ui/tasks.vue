<template>
    <div>
        <h1>Tasks</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>

        <a href="#" v-for="task in tasks" class="col-xs-6 col-sm-6 col-md-4 col-lg-3">
            <div class="panel" :class="task.done ? 'panel-info' : 'panel-warning'">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ task.title }}</h3>
                </div>
                <div class="panel-body">{{ task.description }}</div>
            </div>
        </a>
    </div>
</template>


<script>
    import { getTasks } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import routed from './routed.js';

    export default {
        name: 'tasks',
        props: ['username'],
        components: { Pager, Spinner, Error },
        mixins: [routed],

        data: function () {
            return {
                page: null,
                working: false,
                error: null,
                numPages: null,
                tasks: null
            };
        },

        methods: {
            load: function () {
                this.page = parseInt(this.$route.query.page) || 1;
                this.working = true;
                this.error = null;
                this.tasks = null;
                getTasks(this.username, this.page)
                    .then(data => { this.numPages = data.numPages; this.tasks = data.results; })
                    .catch(error => { this.error = error; })
                    .then(() => this.working = false);
            }
        }
    };
</script>
