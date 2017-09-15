<template>
    <div>
        <h1>About</h1>

        <template v-if="info">
            <br/>
            <h4>App version: {{ version }}</h4>
            <h4>API version: {{ info.app.version }}</h4>
        </template>

        <error v-if="error" :error="error"></error>

        <spinner v-if="working"></spinner>
    </div>
</template>


<script>
    import { version } from '../../package.json';
    import { getInfo } from '../data.js';
    import Spinner from './spinner.vue';
    import Error from './error.vue';
    import loadable from './loadable.js';

    export default {
        name: 'about',
        components: { Spinner, Error },
        mixins: [loadable],

        data: function () {
            return {
                working: false,
                error: null,
                version: version,
                info: null
            };
        },

        methods: {
            load: function (cancelToken) {
                this.working = true;
                this.error = null;

                this.info = null;

                let cancel = false;

                getInfo(cancelToken)
                    .then(info => this.info = info )
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
