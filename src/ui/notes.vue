<template>
    <div>
        <h1>Notes</h1>

        <template v-if="notebook">
            <h2 v-if="numPages || notes_error">{{ notebook.name }}</h2>

            <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

            <a href="#" v-for="note in notes" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{ note.title | title }}</h3>
                    </div>
                    <div class="panel-body">{{ note.text | body }}</div>
                </div>
            </a>

            <error v-if="notes_error" :error="notes_error"></error>
        </template>

        <error v-if="notebook_error" :error="notebook_error"></error>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import { getNotebook, getNotes } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import loadable from './loadable.js';

    export default {
        name: 'notes',
        props: ['username', 'notebook_id'],
        components: { Pager, Spinner, Error },
        mixins: [loadable],

        data: function () {
            return {
                page: null,
                working: false,
                notebook_error: null,
                notes_error: null,
                notebook: null,
                numPages: null,
                notes: null
            };
        },

        methods: {
            load: function (cancelToken) {
                this.page = parseInt(this.$route.query.page) || 1;

                this.working = true;
                this.notes_error = null;

                this.notes = null;

                const requests = [];

                let cancel = false;

                if (!this.notebook) {
                    requests.push(
                        getNotebook(this.username, this.notebook_id, cancelToken)
                            .then(notebook => this.notebook = notebook)
                            .catch(error => {
                                if (this.axios.isCancel(error)) {
                                    cancel = true;
                                } else {
                                    this.notebook_error = error;
                                }
                            })
                    );
                }

                requests.push(
                    getNotes(this.username, this.notebook_id, this.page, cancelToken)
                        .then(data => { this.numPages = data.numPages; this.notes = data.results; })
                        .catch(error => {
                            if (this.axios.isCancel(error)) {
                                cancel = true;
                            } else {
                                this.notes_error = error;
                            }
                        })
                );

                this.axios.all(requests)
                    .then(() => {
                        if (!cancel) {
                            this.working = false;
                        }
                    });
            }
        }
    };
</script>
