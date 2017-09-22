import Vue from 'vue';

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

import { version } from '../package.json';
import { API_URL } from './urls.js';
import { router } from './router.js';

import Boomerang from './ui/boomerang.vue';

import './ui/boomerang.css';


if (process.env.NODE_ENV === 'production') {
    Raven
        .config('https://1fb80c1e5ca04837bc8d4354c600fa9c@sentry.io/213281', {
            release: version,
            environment: process.env.NODE_ENV
        })
        .addPlugin(RavenVue, Vue)
        .install();
}


axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 30000;

Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);


const app = new Vue({
    el: 'boomerang',
    router,
    render: h => h(Boomerang)
});
