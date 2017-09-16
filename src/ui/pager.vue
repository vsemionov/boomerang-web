<template>
    <nav>
        <ul class="pagination">
            <li :class="{ disabled: currentPage == 1 }">
                <router-link :to="{ name: $route.name, params: $route.params, query: { page: 1 } }">&laquo;</router-link>
            </li>

            <li v-for="page in numPages" :key="page" :class="{ active: currentPage == page }">
                <router-link :to="{ name: $route.name, params: $route.params, query: { page: page } }">{{ page }}</router-link>
            </li>

            <li :class="{ disabled: currentPage == numPages }">
                <router-link :to="{ name: $route.name, params: $route.params, query: { page: numPages } }">&raquo;</router-link>
            </li>
        </ul>
    </nav>
</template>


<script>
    export default {
        name: 'pager',
        props: ['currentPage', 'numPages']
    };
</script>
