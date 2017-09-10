<template>
    <div>
        <spinner v-if="!error"></spinner>
        <error v-else :error="error"></error>
    </div>
</template>


<script>
    import { authenticate } from '../../auth.js';
    import Spinner from '../spinner.vue';
    import Error from '../error.vue';

    export default {
        name: 'callback',
        components: { Spinner, Error },
        data: function () {
            return {
                error: null
            };
        },
        created: function () {
            authenticate()
                .then(() => this.$router.push({ name: 'index' }))
                .catch(error => this.error = error);
        }
    };
</script>
