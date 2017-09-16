import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { version } from '../package.json';
import { API_URL } from './urls.js';
import { router } from './router.js';
import Boomerang from './ui/boomerang.vue';


Raven
    .config('https://1fb80c1e5ca04837bc8d4354c600fa9c@sentry.io/213281', {
        release: version,
        environment: process.env.NODE_ENV
    })
    .addPlugin(RavenVue, Vue)
    .install();


Vue.use(BootstrapVue);

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = API_URL;
Vue.axios.defaults.timeout = 30000;


const app = new Vue({
    el: 'boomerang',
    router,
    render: h => h(Boomerang)
});
