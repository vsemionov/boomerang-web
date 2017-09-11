<template>
    <div class="wrapper">
        <navbar></navbar>

        <div class="container">
            <breadcrumbs></breadcrumbs>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    import Navbar from './navbar.vue';
    import Breadcrumbs from './breadcrumbs.vue';

    export default {
        name: 'boomerang',
        components: { Navbar, Breadcrumbs }
    };
</script>
