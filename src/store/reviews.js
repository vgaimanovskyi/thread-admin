import { db } from "../main";
import { fs } from "../main";

export default {
    state: {
        reviews: []
    },
    mutations: {
        SET_REVIEWS(state, payload) {
            state.reviews = payload.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        SET_REVIEW_DONE(state, payload) {
            state.reviews.find(review => {
                if (review.id === payload) {
                    review.done = true
                }
            });
        },
        SET_REVIEW_REMOVE(state, payload) {
            const index = state.reviews.findIndex(review => review.id === payload);
            state.reviews.splice(index, 1);
        }
    },
    actions: {
        async fetchReviews({ commit }) {
            let result = [];
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                const fbVal = await db.ref("reviews").once("value");
                const reviews = fbVal.val();
                Object.keys(reviews).forEach(key => {
                    const review = reviews[key];
                    result.push({
                        id: key,
                        yourname: review.yourname,
                        tel: review.tel,
                        email: review.email,
                        date: review.date,
                        comment: review.comment,
                        checkbox: review.checkbox,
                        done: review.done,
                        fileUrl: review.fileUrl

                    })
                })
                commit("SET_REVIEWS", result);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async reviewDone({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                await db.ref(`reviews/${payload}`).update({ done: true });
                commit("SET_REVIEW_DONE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async reviewRemove({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                const fileUrlVal = await db.ref(`reviews/${payload}`).child("fileUrl").once("value");
                console.log("fileUrlVal", fileUrlVal)
                const fileUrl = fileUrlVal.val();
                console.log("fileUrl", fileUrl)
                if (fileUrl) {
                    const file = fs.refFromURL(fileUrl);
                    console.log("file", file)
                    await file.delete();
                }
                console.log("review file deleted from the storage");
                await db.ref(`reviews/${payload}`).remove();
                commit("SET_REVIEW_REMOVE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        }
    },
    getters: {
        getReviews(state) {
            return state.reviews;
        },
    }
}