<template>
    <b-breadcrumb v-if="getBreadcrumbs()" :items="getBreadcrumbs()" class="mt-2"></b-breadcrumb>
</template>


<script>
    import { breadcrumbs } from '../router.js';

    export default {
        name: 'breadcrumbs',

        methods: {
            getBreadcrumbs: function () {
                return !!this.$route.name && breadcrumbs[this.$route.name];
            }
        }
    };
</script>
