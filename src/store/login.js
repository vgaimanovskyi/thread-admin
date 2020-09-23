import { fa } from "../main";

export default {
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async loginUser({ commit, dispatch }, { email, password }) {
            commit("CLEAR_ERROR")
            commit("SET_LOADING", true);
            try {
                await fa.signInWithEmailAndPassword(email, password);
                const uid = await dispatch("getUid");
                localStorage.setItem("admin", uid);
                commit("SET_USER", uid);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        getUid() {
            const user = fa.currentUser;
            return user ? user.uid : null
        },
        autoLoginUser({ commit }) {
            const uid = localStorage.getItem("admin");
            commit("SET_USER", uid);
        },
        async logoutUser({ commit }) {
            localStorage.removeItem("admin");
            await fa.signOut();
            commit("SET_USER", null);
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        isUserLoggedIn(state) {
            return state.user !== null;
        }
    }
}