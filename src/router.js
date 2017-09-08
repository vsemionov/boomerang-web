import Vue from 'vue';
import VueRouter from 'vue-router';

import NotFound from './app/not-found.vue'
import Index from './app/index.vue'
import Notebooks from './app/notebooks.vue'
import Notes from './app/notes.vue'
import Tasks from './app/tasks.vue'


Vue.use(VueRouter);


const routes = [
    { path: '/', component: Index },
    { path: '/users/:username/notebooks', component: Notebooks },
    { path: '/users/:username/notebooks/:notebook_id', component: Notes },
    { path: '/users/:username/tasks', component: Tasks },
    { path: '*', component: NotFound }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;
