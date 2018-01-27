import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import Request from '../common/request';

Vue.use(Vuex);

// the root, initial state object
const stateObj = {
  skills: [],
  status: {
    loading: false,
    success: false,
    error: false,
  },
};

// define the possible getters that can be applied to our state
const gettersObj = {
  skills: state => state.skills,
  skill: state => keyword => _.find(state.skills, ['_id', keyword]),
  loading: state => state.status.loading,
};

// define the possible mutations that can be applied to our state
const mutationsObj = {
  SET_SKILLS(state, payload) {
    _.assignIn(state.skills, payload);
  },
  SET_SKILL(state, payload) {
    _.assignIn(state.skills, payload);
  },
  LOADING(state) {
    _.assignIn(state.status, {
      loading: true,
      success: false,
      error: false,
    });
  },
  SUCCESS(state) {
    _.assignIn(state.status, {
      loading: false,
      success: true,
      error: false,
    });
  },
  ERROR(state, payload) {
    _.assignIn(state.status, {
      loading: false,
      success: false,
      error: payload,
    });
  },
  CLEAR_ERROR(state) {
    _.assignIn(state.status, {
      loading: false,
      success: false,
      error: false,
    });
  },
};

// define the possible actions that can be applied to our state
const actionsObj = {
  getSkills(context) {
    context.commit('LOADING');
    Request.getSkills()
      .then((res) => {
        context.commit('SET_SKILLS', res.objects.all || []);
        context.commit('SUCCESS');
      })
      .catch((e) => {
        context.commit('ERROR', e);
      });
  },
  setSkill(context, payload) {
    context.commit('SET_SKILL', _.cloneDeep(payload));
  },
  clearError(context) {
    context.commit('CLEAR_ERROR');
  },
};

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state: stateObj,
  getters: gettersObj,
  mutations: mutationsObj,
  actions: actionsObj,
});
