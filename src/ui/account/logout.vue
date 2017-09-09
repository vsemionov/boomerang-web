<script>
    import { logout } from '../../auth.js';

    export default {
        name: 'logout',
        created: function () {
            logout();
            this.$router.push('/');
        }
    };
</script>
