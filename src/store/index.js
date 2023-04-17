import state from './states'
import getters from './getters'
import mutations from './mutations.js'
import actions from './actions'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})