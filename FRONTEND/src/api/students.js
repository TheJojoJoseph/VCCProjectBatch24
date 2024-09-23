/* eslint-disable no-console */
import { APIInstance } from './apiInstance';

export const instance = new APIInstance({
  baseURL: '/listStudents/',
});
const api = instance.api;
export const listStudents = async (payload) => {
  const offset = payload.results * payload.page - payload.results;
  const limit = payload.results;
  return api.post(null, { offset: offset, limit: limit });
};

export const instance2 = new APIInstance({
  baseURL: '/addStudent/',
});
const api2 = instance2.api;
export const addStudent = async (payload) => {
  return api2.post(null, payload);
};
