import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'
import App from './App.vue'
import Vuetify from 'vuetify'
import SkillTree from './components/SkillTree.vue'
import './stylus/main.styl'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
    { name: 'skills', path: '/skills', component: SkillTree },
];

const router = new VueRouter({
    routes
});

new Vue({
    store,
    el: '#app',
    router,
    //render: h => h(App),
    beforeMount: function () {
        this.$store.dispatch("getSkills");
    }
})