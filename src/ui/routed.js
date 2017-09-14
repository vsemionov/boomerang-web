import axios from 'axios';


export default {
    data: function () {
        return {
            cancelSource: null
        }
    },

    created: function () {
        this.cancelSource = axios.CancelToken.source();
        this.load(this.cancelSource.token);
    },

    watch: {
        $route: function (to, from) {
            this.cancelSource.cancel();
            this.cancelSource = axios.CancelToken.source();
            this.load(this.cancelSource.token);
        }
    },

    beforeRouteLeave: function (to, from, next) {
        this.cancelSource.cancel();
        next();
    }
};
