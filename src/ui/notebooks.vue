<template>
    <div>
        <h1>Notebooks</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <b-row class="mt-4">
            <b-col v-for="notebook in notebooks" :key="notebook.id" cols="12" sm="12" md="12" lg="6" xl="4">
                <router-link :to="{ name: 'notes', params: {username, notebook_id: notebook.id} }">
                    <b-card :title="notebook.name | title" bg-variant="secondary" text-variant="white" class="mb-3">
                    </b-card>
                </router-link>
            </b-col>
        </b-row>

        <error v-if="error" :error="error"></error>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import { getNotebooks } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import loadable from './loadable.js';

    export default {
        name: 'notebooks',
        props: ['username'],
        components: { Pager, Spinner, Error },
        mixins: [loadable],

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
            load: function (cancelToken) {
                this.page = parseInt(this.$route.query.page) || 1;

                this.working = true;
                this.error = null;

                this.notebooks = null;

                let cancel = false;

                getNotebooks(this.username, this.page, cancelToken)
                    .then(data => { this.numPages = data.numPages; this.notebooks = data.results; })
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
