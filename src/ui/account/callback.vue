<template>
    <div>
        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { authenticate } from '../../auth.js';
    import Error from '../error.vue';

    export default {
        name: 'callback',
        components: { Error },
        data: function () {
            return {
                error: null
            };
        },
        created: function () {
            authenticate().then(() => this.$router.push('/')).catch(error => this.error = error);
        }
    };
</script>
