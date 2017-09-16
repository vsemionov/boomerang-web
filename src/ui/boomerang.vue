<template>
    <b-container>
        <navbar></navbar>
        <breadcrumbs></breadcrumbs>
        <router-view></router-view>
    </b-container>
</template>


<script>
    import Navbar from './navbar.vue';
    import Breadcrumbs from './breadcrumbs.vue';

    export default {
        name: 'boomerang',
        components: { Navbar, Breadcrumbs }
    };
</script>
