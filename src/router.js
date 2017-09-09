import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './ui/index.vue'
import Login from './ui/login.vue'
import Logout from './ui/logout.vue'
import User from './ui/user.vue'
import Notebooks from './ui/notebooks.vue'
import Notes from './ui/notes.vue'
import Tasks from './ui/tasks.vue'
import NotFound from './ui/not-found.vue'


Vue.use(VueRouter);


const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
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
