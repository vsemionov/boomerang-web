<template>
    <div>
        <h3>Error</h3>

        <template v-if="error.response">
            <h4 v-if="error.response.status == 404">Not Found</h4>
            <h4 v-else-if="error.response.status == 401">Unauthorized</h4>
            <h4 v-else-if="error.response.status == 403">Forbidden</h4>
            <h4 v-else-if="error.response.status == 402">Payment Required</h4>
            <h4 v-else-if="error.response.status == 409">Conflict</h4>
            <h4 v-else>Unknown error ({{ error.response.status }})</h4>

            <h5 v-if="error.response.data">{{ error.response.data.detail }}</h5>
        </template>

        <template v-else>
            <h4>Communication error</h4>
            <h5>{{ error.message }}</h5>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'error',
        props: [ 'error' ]
    };
</script>
