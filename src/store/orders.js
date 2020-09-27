import { db } from "../main";

export default {
    state: {
        orders: []
    },
    mutations: {
        SET_ORDERS(state, payload) {
            state.orders = payload.sort((a, b) => new Date(b.cartData.date) - new Date(a.cartData.date));
        },
        SET_ORDER_DONE(state, payload) {
            state.orders.find(order => {
                if (order.id === payload) {
                    order.cartData.done = true
                }
            });
        },
        SET_ORDER_REMOVE(state, payload) {
            const index = state.orders.findIndex(order => order.id === payload);
            state.orders.splice(index, 1);
        }
    },
    actions: {
        async fetchOrders({ commit }) {
            let result = [];
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                const fbVal = await db.ref("orders").once("value");
                const orders = fbVal.val();
                Object.keys(orders).forEach(key => {
                    const order = orders[key];
                    result.push({
                        id: key,
                        cartData: order.cartData,
                        customerData: order.customerData,
                        deliveryData: order.deliveryData,
                        productsData: order.productsData
                    })
                })
                commit("SET_ORDERS", result);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async orderDone({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                await db.ref(`orders/${payload}`).child("cartData").update({ done: true });
                commit("SET_ORDER_DONE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        },
        async orderRemove({ commit }, payload) {
            commit("CLEAR_ERROR");
            commit("SET_LOADING", true);
            try {
                await db.ref(`orders/${payload}`).remove();
                commit("SET_ORDER_REMOVE", payload);
                commit("SET_LOADING", false);
            } catch (error) {
                commit("SET_ERROR", error.message);
                commit("SET_LOADING", false);
                throw error
            }
        }
    },
    getters: {
        getOrders(state) {
            return state.orders;
        },
    }
}