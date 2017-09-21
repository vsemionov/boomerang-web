<template>
    <div>
        <h1>Tasks</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <b-row class="mt-4">
            <b-col v-for="task in tasks" :key="task.id" cols="12" sm="12" md="12" lg="6" xl="4">
                <a href="#" class="item-link">
                    <b-card :title="task.title | title" :bg-variant="task.done ? 'success' : 'danger'" text-variant="white" class="mb-3">
                        <p class="card-text">{{ task.description | body }}</p>
                    </b-card>
                </a>
            </b-col>
        </b-row>

        <error v-if="error" :error="error"></error>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import { getTasks } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import loadable from './loadable.js';

    export default {
        name: 'tasks',
        props: ['username'],
        components: { Pager, Spinner, Error },
        mixins: [loadable],

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
            load: function (cancelToken) {
                this.page = parseInt(this.$route.query.page) || 1;

                this.working = true;
                this.error = null;

                this.tasks = null;

                let cancel = false;

                getTasks(this.username, this.page, cancelToken)
                    .then(data => { this.numPages = data.numPages; this.tasks = data.results; })
                    .catch(error => {
                        if (this.axios.isCancel(error)) {
                            cancel = true;
                        } else {
                            this.error = error;
                        }
                    })
                    .then(() => {
                        if (!cancel) {
                            this.working = false;
                        }
                    });
            }
        }
    };
</script>
