import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './ui/index.vue'
import Login from './ui/account/login.vue'
import Logout from './ui/account/logout.vue'
import Callback from './ui/account/callback.vue'
import Notebooks from './ui/notebooks.vue'
import Notes from './ui/notes.vue'
import Tasks from './ui/tasks.vue'
import NotFound from './ui/not-found.vue'


Vue.use(VueRouter);


const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/login/callback', component: Callback },
    { path: '/notebooks/:username', component: Notebooks, props: true },
    { path: '/notebooks/:username/:notebook_id', component: Notes, props: true },
    { path: '/tasks/:username', component: Tasks, props: true },
    { path: '*', component: NotFound }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
