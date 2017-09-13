<template>
    <div>
        <h2>Error</h2>

        <template v-if="error.response">
            <h3 v-if="error.response.status == 404">Not Found</h3>
            <h3 v-else-if="error.response.status == 401">Unauthorized</h3>
            <h3 v-else-if="error.response.status == 403">Forbidden</h3>
            <h3 v-else-if="error.response.status == 402">Payment Required</h3>
            <h3 v-else-if="error.response.status == 409">Conflict</h3>
            <h3 v-else>Unknown error ({{ error.response.status }})</h3>

            <h4 v-if="error.response.data">{{ error.response.data.detail }}</h4>
        </template>

        <template v-else>
            <h3>Communication error</h3>
            <h4>{{ error.message }}</h4>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'error',
        props: [ 'error' ]
    };
</script>
