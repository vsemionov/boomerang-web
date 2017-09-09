<template>
    <div class="wrapper">
        <navbar></navbar>

        <div class="container">
            <h1>Boomerang</h1>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    import Navbar from './navbar.vue';

    export default {
        name: 'boomerang',
        components: { Navbar }
    };
</script>
