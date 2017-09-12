import Vue from 'vue';
import VueRouter from 'vue-router';

import { updateAuthState } from './auth.js';
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
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            breadcrumbs: [
                'Home'
            ]
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            breadcrumbs: [
                { name: 'Home', location: { name: 'index' } },
                'Log In'
            ]
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/login/callback',
        name: 'login-callback',
        component: Callback
    },
    {
        path: '/notebooks/:username',
        name: 'notebooks',
        component: Notebooks,
        props: true,
        meta: {
            breadcrumbs: [
                { name: 'Home', location: { name: 'index' } },
                'Notebooks'
            ]
        }
    },
    {
        path: '/notebooks/:username/:notebook_id',
        name: 'notes',
        component: Notes,
        props: true,
        meta: {
            breadcrumbs: [
                { name: 'Home', location: { name: 'index' } },
                { name: 'Notebooks', location: { name: 'notebooks', params: ['username'] } },
                'Notes'
            ]
        }
    },
    {
        path: '/tasks/:username',
        name: 'tasks',
        component: Tasks,
        props: true,
        meta: {
            breadcrumbs: [
                { name: 'Home', location: { name: 'index' } },
                'Tasks'
            ]
        }
    },
    {
        path: '*',
        component: NotFound
    }
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
