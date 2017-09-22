<template>
    <div>
        <spinner v-if="!error"></spinner>
        <alert v-else :error="error" class="mt-2"></alert>
    </div>
</template>


<script>
    import { authenticate } from '../../auth.js';
    import Spinner from '../spinner.vue';
    import Alert from '../alert.vue';

    export default {
        name: 'callback',
        components: { Spinner, Alert },

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
