<template>
    <ol class="breadcrumb" v-if="hasRoutes()">
        <li v-for="route in getLinkedRoutes()"><router-link :to="route.location">{{ route.name }}</router-link></li>
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

                for (let bc in linkedBreadcrumbs) {
                    const breadcrumb = linkedBreadcrumbs[bc];

                    const linkedRoute = { name: breadcrumb.name, location: { name: breadcrumb.location.name, params: {} } };

                    for (let p in breadcrumb.location.params) {
                        const param = breadcrumb.location.params[p];
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
