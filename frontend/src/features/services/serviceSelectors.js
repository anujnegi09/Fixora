// serviceSelectors.js

export const selectServices = (state) => state.service.services;

export const selectService = (state) => state.service.service;

export const selectMyServices = (state) => state.service.myServices;

export const selectServiceLoading = (state) => state.service.loading;

export const selectCreateServiceLoading = (state) =>
  state.service.createLoading;

export const selectUpdateServiceLoading = (state) =>
  state.service.updateLoading;

export const selectDeleteServiceLoading = (state) =>
  state.service.deleteLoading;

export const selectServiceError = (state) => state.service.error;