import {
  GET_ACCESS_TYPES,
  FETCHED_ACCESS_TYPES,
} from './types';

export const getAccessTypes = () => ({ type: GET_ACCESS_TYPES });
export const fetchedAccessTypes = data => ({ type: FETCHED_ACCESS_TYPES, data });