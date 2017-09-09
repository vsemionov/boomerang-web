import Vue from 'vue';
import VueRouter from 'vue-router';

import { updateAuthState } from './auth.js';
import NotFound from './ui/not-found.vue'
import Index from './ui/index.vue'
import Notebooks from './ui/notebooks.vue'
import Notes from './ui/notes.vue'
import Tasks from './ui/tasks.vue'


Vue.use(VueRouter);


const routes = [
    { path: '/', component: Index },
    { path: '/:username/notebooks', component: Notebooks, props: true },
    { path: '/:username/notebooks/:notebook_id', component: Notes, props: true },
    { path: '/:username/tasks', component: Tasks, props: true },
    { path: '*', component: NotFound }
];

const router = new VueRouter({
    mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    updateAuthState();
    next();
});


export default router;
