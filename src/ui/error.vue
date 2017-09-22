<template>
    <div>
        <template v-if="error.response">
            <h6 v-if="error.response.status == 404">Not Found</h6>
            <h6 v-else-if="error.response.status == 401">Unauthorized</h6>
            <h6 v-else-if="error.response.status == 403">Forbidden</h6>
            <h6 v-else-if="error.response.status == 402">Payment Required</h6>
            <h6 v-else-if="error.response.status == 409">Conflict</h6>
            <h6 v-else>Unknown error ({{ error.response.status }})</h6>

            <p v-if="error.response.data">{{ error.response.data.detail }}</p>
        </template>

        <template v-else>
            <h6>Communication error</h6>
            <p>{{ error.message }}</p>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'error',
        props: ['error']
    };
</script>
