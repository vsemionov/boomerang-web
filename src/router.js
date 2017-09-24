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
import About from './ui/about.vue'
import NotFound from './ui/not-found.vue'


Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
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
        props: true
    },
    {
        path: '/notes/:username/:notebook_id',
        name: 'notes',
        component: Notes,
        props: true
    },
    {
        path: '/tasks/:username',
        name: 'tasks',
        component: Tasks,
        props: true
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '*',
        component: NotFound
    }
];

export const breadcrumbs = {
    index: [
        'Home'
    ],
    login: [
        { text: 'Home', to: { name: 'index' } },
        'Log In'
    ],
    notebooks: [
        { text: 'Home', to: { name: 'index' } },
        'Notebooks'
    ],
    notes: [
        { text: 'Home', to: { name: 'index' } },
        { text: 'Notebooks', to: { name: 'notebooks' } },
        'Notes'
    ],
    tasks: [
        { text: 'Home', to: { name: 'index' } },
        'Tasks'
    ],
    about: [
        { text: 'Home', to: { name: 'index' } },
        'About'
    ]
};

export const router = new VueRouter({
    mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    updateAuthState();
    next();
});
