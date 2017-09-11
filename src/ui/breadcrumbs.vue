<template>
    <ol class="breadcrumb" v-if="hasRoutes()">
        <li v-for="route in getLinkedRoutes()"><router-link :to="route.location">{{ route.name }}</router-link></li>
        <li class="active">{{ getActiveRoute() }}</li>
    </ol>
</template>


<script>
    const routes = {
        index: ['Home'],
        login: ['Login'],
        logout: ['Logout'],
        notebooks: [
            { name: 'Home', location: { name: 'index' } },
            'Notebooks'
        ],
        notes: [
            { name: 'Home', location: { name: 'index' } },
            { name: 'Notebooks', location: { name: 'notebooks', params: ['username'] } },
            'Notes'
        ],
        tasks: [
            { name: 'Home', location: { name: 'index' } },
            'Tasks'
        ],
    };

    export default {
        name: 'breadcrumbs',

        methods: {
            hasRoutes: function () {
                return !!this.$route.name && !!routes[this.$route.name];
            },

            getLinkedRoutes: function () {
                const linkedRoutes = [];

                const breadcrumbs = routes[this.$route.name];
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
                const breadcrumbs = routes[this.$route.name];
                return breadcrumbs[breadcrumbs.length - 1];
            }
        }
    };
</script>
