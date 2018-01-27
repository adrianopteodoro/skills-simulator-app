import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import store from './vuex/store';
import App from './App.vue';
import SkillTree from './components/SkillTree.vue';
import './stylus/main.styl';

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [{ name: 'skills', path: '/skills', component: SkillTree }];

const router = new VueRouter({
  routes,
});

const vueApp = new Vue({
  store,
  el: '#app',
  router,
  beforeMount() {
    this.$store.dispatch('getSkills');
  },
  render: h => h(App),
});

module.exports = vueApp;
