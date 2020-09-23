import { db } from "../main";

export default {
    state: {
        videos: [],
        video: {}
    },
    mutations: {
        SET_VIDEOS(state, payload) {
            state.videos = payload;
        },
        SET_VIDEO_REMOVE(state, payload) {
            const index = state.videos.findIndex(video => video.id === payload);
            state.videos.splice(index, 1);
        },
        SET_VIDEO_UPDATE(state, payload) {
            const index = state.videos.findIndex(video => video.id === payload.id);
            state.videos.splice(index, 1, payload);
        },
        SET_VIDEO_BY_ID(state, payload) {
            state.video = state.videos.find(video => video.id === payload);
        },
    },
    actions: {
        async fetchAllVideos({ commit }) {
            let result = [];
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                const fbVal = await db.ref("videos").once("value");
                const videos = fbVal.val();
                Object.keys(videos).forEach(key => {
                    const video = videos[key];
                    result.unshift({
                        id: key,
                        video: video.video,
                        name: video.name,
                        catId: video.catId,
                    })
                })
                commit("SET_VIDEOS", result);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async updateVideo({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                await db.ref(`videos/${payload.id}`).update({
                    video: payload.video,
                    name: payload.name
                });
                commit("SET_VIDEO_UPDATE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async videoRemove({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                await db.ref(`videos/${payload}`).remove();
                commit("SET_VIDEO_REMOVE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async addNewVideo({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);

            try {
                await db.ref("videos").push(payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        videoById({ commit }, payload) {
            commit("SET_VIDEO_BY_ID", payload);
        },
    },
    getters: {
        getVideos(state) {
            return state.videos;
        },
        getVideoById(state) {
            return state.video
        }
    }
}