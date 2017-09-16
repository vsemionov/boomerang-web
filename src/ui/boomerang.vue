<template>

    <b-container>

        <navbar></navbar>

        <b-breadcrumb v-if="getBreadcrumbs()" :items="getBreadcrumbs()" class="mt-2"></b-breadcrumb>

        <router-view></router-view>

    </b-container>

</template>


<script>
    import { breadcrumbs } from '../router.js';
    import Navbar from './navbar.vue';

    export default {
        name: 'boomerang',
        components: { Navbar },

        methods: {
            getBreadcrumbs: function () {
                return !!this.$route.name && breadcrumbs[this.$route.name];
            }
        }
    };
</script>
