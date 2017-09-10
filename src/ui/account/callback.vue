<template>
    <div></div>
</template>


<script>
    import { authenticate } from '../../auth.js';

    export default {
        name: 'callback',
        created: function () {
            authenticate().then(() => this.$router.push('/'));
        }
    };
</script>
