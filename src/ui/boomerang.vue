<template>
    <div class="wrapper">
        <navbar></navbar>

        <div class="container">
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
