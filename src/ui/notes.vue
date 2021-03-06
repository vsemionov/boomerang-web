<template>
    <div>
        <h1>Notes</h1>

        <template v-if="notebook">

            <template v-if="numPages || notes_error">
                <notebook-name :notebook="notebook"><h2>{{ notebook.name }}</h2></notebook-name>
            </template>

            <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

            <b-row class="mt-4">
                <b-col v-for="note in notes" :key="note.id" cols="12" sm="12" md="12" lg="6" xl="4">
                    <a href="#" class="item-link">
                        <b-card :title="note.title | title" bg-variant="warning" text-variant="white" class="mb-3">
                            <p class="card-text">{{ note.text | body }}</p>
                        </b-card>
                    </a>
                </b-col>
            </b-row>

            <alert v-if="notes_error" :error="notes_error"></alert>
        </template>

        <alert v-if="notebook_error" :error="notebook_error" class="mt-4"></alert>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import { getNotebook, getNotes } from '../data.js';
    import NotebookName from './notebook-name.vue';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Alert from './alert.vue';
    import loadable from './loadable.js';

    export default {
        name: 'notes',
        props: ['username', 'notebook_id'],
        components: { NotebookName, Pager, Spinner, Alert },
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
