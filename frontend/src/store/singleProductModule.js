import ProductSevice from "@/server/productAPI.js";

export const singleProductModule = {
   state: () => ({
      product: null,
      totalSumm: 0,
      reviewsList: null,
      isLoading: true,
      reviewLoading: true,
      errors: null,
   }),
   mutations: {
      changeTotalSumm(state, summ) {
         state.totalSumm = summ;
      },
      productStart(state) {
         state.isLoading = true;
         state.product = null;
         state.errors = null;
      },
      productSuccess(state, payload) {
         state.isLoading = false;
         state.product = payload;
         state.totalSumm = payload.price;
      },
      productFailure(state, payload) {
         state.isLoading = false;
         state.errors = payload;
      },
      reviewsStart(state) {
         state.reviewLoading = true;
         state.errors = null;
      },
      reviewsSuccess(state) {
         state.reviewLoading = false;
      },
      reviewsFailure(state, payload) {
         state.reviewLoading = false;
         state.errors = payload;
      },
      getReviewsStart(state) {
         state.reviewLoading = true;
         state.errors = null;
      },
      getReviewsSuccess(state, payload) {
         state.reviewLoading = false;
         state.reviewsList = payload.reviewsList;
      },
      getReviewsFailure(state, payload) {
         state.reviewLoading = false;
         state.errors = payload;
      },
   },
   actions: {
      getProductById(context, payload) {
         return new Promise((resolve, reject) => {
            context.commit("productStart");
            ProductSevice.getProductById(payload)
               .then((response) => {
                  context.commit("productSuccess", response.data);
                  resolve(response.data);
               })
               .catch((error) => {
                  context.commit("productFailure", error.response.data);
                  reject(error.response.data);
               });
         });
      },

      postReviews(context, data) {
         return new Promise((resolve, reject) => {
            context.commit("reviewsStart");
            ProductSevice.postReviews(data)
               .then((response) => {
                  context.commit("reviewsSuccess");
                  resolve();
               })
               .catch((error) => {
                  context.commit("reviewsFailure", error.response.data);
                  reject(error);
               });
         });
      },
      getReviews(context, data) {
         return new Promise(() => {
            context.commit("getReviewsStart");
            ProductSevice.getReviews(data)
               .then((response) => {
                  context.commit("getReviewsSuccess", response.data);
               })
               .catch((error) => {
                  context.commit("getReviewsFailure", error.response.data);
               });
         });
      },
   },
   namespaced: true,
};
