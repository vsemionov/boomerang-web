<template>
    <div></div>
</template>


<script>
    import { authState, authenticate } from '../../auth.js';

    export default {
        name: 'callback',
        created: function () {
            authenticate().then(() => this.$router.push(`/${authState.username}`));
        }
    };
</script>
