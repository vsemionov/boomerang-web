<template>
    <b-alert variant="danger" show>
        <error :error="error"></error>
    </b-alert>
</template>


<script>
    import Error from './error.vue';

    export default {
        name: 'alert',
        props: ['error'],
        components: { Error }
    };
</script>
