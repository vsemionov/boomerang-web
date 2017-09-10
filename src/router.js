import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './ui/index.vue'
import Login from './ui/account/login.vue'
import Logout from './ui/account/logout.vue'
import Callback from './ui/account/callback.vue'
import User from './ui/user.vue'
import Notebooks from './ui/notebooks.vue'
import Notes from './ui/notes.vue'
import Tasks from './ui/tasks.vue'
import NotFound from './ui/not-found.vue'


Vue.use(VueRouter);


const routes = [
    { path: '/', component: Index },
    { path: '/account/login', component: Login },
    { path: '/account/logout', component: Logout },
    { path: '/account/callback', component: Callback },
    { path: '/:username', component: User, props: true },
    { path: '/:username/notebooks', component: Notebooks, props: true },
    { path: '/:username/notebooks/:notebook_id', component: Notes, props: true },
    { path: '/:username/tasks', component: Tasks, props: true },
    { path: '*', component: NotFound }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
