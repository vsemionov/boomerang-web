export default {
    created: function () {
        this.load();
    },

    watch: {
        $route: function (to, from) {
            this.load();
        }
    }
};
