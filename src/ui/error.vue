<template>
    <div>
        <h3>Error</h3>

        <template v-if="error.response">
            <h5 v-if="error.response.status == 404">Not Found</h5>
            <h5 v-else-if="error.response.status == 401">Unauthorized</h5>
            <h5 v-else-if="error.response.status == 403">Forbidden</h5>
            <h5 v-else-if="error.response.status == 402">Payment Required</h5>
            <h5 v-else-if="error.response.status == 409">Conflict</h5>
            <h5 v-else>Unknown error ({{ error.response.status }})</h5>

            <p v-if="error.response.data">{{ error.response.data.detail }}</p>
        </template>

        <template v-else>
            <h5>Communication error</h5>
            <p>{{ error.message }}</p>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'error',
        props: [ 'error' ]
    };
</script>
