<template>
    <ol class="breadcrumb" v-if="hasRoutes()">
        <li v-for="route in getLinkedRoutes()"><router-link :to="route.location">{{ route.name }}</router-link></li>
        <li class="active">{{ getActiveRoute() }}</li>
    </ol>
</template>


<script>
    export default {
        name: 'breadcrumbs',

        methods: {
            hasRoutes: function () {
                return this.$route.meta && !!this.$route.meta.breadcrumbs;
            },

            getLinkedRoutes: function () {
                const linkedRoutes = [];

                const breadcrumbs = this.$route.meta.breadcrumbs;
                const linkedBreadcrumbs = breadcrumbs.slice(0, -1);

                for (let bc in linkedBreadcrumbs) {
                    const breadcrumb = linkedBreadcrumbs[bc]; // workaround: buble seems to not support 'of' iteration

                    const linkedRoute = { name: breadcrumb.name, location: { name: breadcrumb.location.name, params: {}} };

                    for (let p in breadcrumb.location.params) {
                        const param = breadcrumb.location.params[p]; // workaround: buble seems to not support 'of' iteration
                        linkedRoute.location.params[param] = this.$route.params[param];
                    }

                    linkedRoutes.push(linkedRoute);
                }

                return linkedRoutes;
            },

            getActiveRoute: function () {
                const breadcrumbs = this.$route.meta.breadcrumbs;
                return breadcrumbs[breadcrumbs.length - 1];
            }
        }
    };
</script>
