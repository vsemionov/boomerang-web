<template>
    <div>
        <h1>Notebooks</h1>

        <pager v-if="numPages" :currentPage="page" :numPages="numPages"></pager>

        <router-link v-for="notebook in notebooks" :to="{ name: 'notes', params: {username, notebook_id: notebook.id} }" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ notebook.name }}</h3>
                </div>
            </div>
        </router-link>

        <error v-if="error" :error="error"></error>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import axios from 'axios';
    import { getNotebooks } from '../data.js';
    import Pager from './pager.vue';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import routed from './routed.js';

    export default {
        name: 'notebooks',
        props: ['username'],
        components: { Pager, Spinner, Error },
        mixins: [routed],

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
                        if (axios.isCancel(error)) {
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
