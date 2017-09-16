<template>
    <b-pagination-nav use-router :link-gen="getRoute" :value="currentPage" :number-of-pages="numPages" class="mt-4"></b-pagination-nav>
</template>


<script>
    export default {
        name: 'pager',
        props: ['currentPage', 'numPages'],

        methods: {
            getRoute: function (page) {
                return {
                    name: this.$route.name,
                    params: this.$route.params,
                    query: {
                        page: page
                    }
                };
            }
        }
    };
</script>
