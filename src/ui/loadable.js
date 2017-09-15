function truncated(text, length) {
    const terminator = '...';
    if (text.length > length) {
        return text.substring(0, length - terminator.length) + terminator;
    }
    return text;
}


export default {
    data: function () {
        return {
            cancelSource: null
        }
    },

    created: function () {
        this.cancelSource = this.axios.CancelToken.source();
        this.load(this.cancelSource.token);
    },

    watch: {
        $route: function (to, from) {
            this.cancelSource.cancel();
            this.cancelSource = this.axios.CancelToken.source();
            this.load(this.cancelSource.token);
        }
    },

    beforeRouteLeave: function (to, from, next) {
        this.cancelSource.cancel();
        next();
    },

    filters: {
        title: function (text) {
            return truncated(text, 32);
        },

        body: function (text) {
            return truncated(text, 128);
        }
    }
};
