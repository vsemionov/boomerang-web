<template>
    <div>
        <h2>Logout</h2>
    </div>
</template>


<script>
    import { logout } from '../auth.js';

    export default {
        name: 'logout',
        created: function () {
            logout();
        }
    };
</script>
