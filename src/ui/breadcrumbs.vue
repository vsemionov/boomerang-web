<template>
    <ol class="breadcrumb" v-if="hasRoutes()">
        <li v-for="route in getLinkedRoutes()" :key="route.name"><router-link :to="route.location">{{ route.name }}</router-link></li>
        <li class="active">{{ getActiveRoute() }}</li>
    </ol>
</template>


<script>
    import { routeBreadcrumbs } from '../router.js';

    export default {
        name: 'breadcrumbs',

        methods: {
            hasRoutes: function () {
                return !!this.$route.name && !!routeBreadcrumbs[this.$route.name];
            },

            getLinkedRoutes: function () {
                const linkedRoutes = [];

                const breadcrumbs = routeBreadcrumbs[this.$route.name];
                const linkedBreadcrumbs = breadcrumbs.slice(0, -1);

                for (let breadcrumb of linkedBreadcrumbs) {
                    const linkedRoute = { name: breadcrumb.name, location: { name: breadcrumb.location.name, params: {} } };

                    for (let param of breadcrumb.location.params) {
                        linkedRoute.location.params[param] = this.$route.params[param];
                    }

                    linkedRoutes.push(linkedRoute);
                }

                return linkedRoutes;
            },

            getActiveRoute: function () {
                const breadcrumbs = routeBreadcrumbs[this.$route.name];
                return breadcrumbs[breadcrumbs.length - 1];
            }
        }
    };
</script>
