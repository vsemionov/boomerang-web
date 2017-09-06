import Vue from 'vue';
import VueRouter from 'vue-router';

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import {version} from '../package.json';

import App from './app/app.vue';


Raven
    .config('https://1fb80c1e5ca04837bc8d4354c600fa9c@sentry.io/213281', {
        release: version,
        environment: process.env.NODE_ENV
    })
    .addPlugin(RavenVue, Vue)
    .install();


Vue.use(VueRouter);


const app = new Vue({
    el: 'app',
    render: h => h(App)
});
