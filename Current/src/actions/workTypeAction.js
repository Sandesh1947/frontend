import {
  GET_WORK_TYPES,
  FETCHED_WORK_TYPES,
} from './types';

export const getWorkTypes = () => ({ type: GET_WORK_TYPES });
export const fetchedWorkTypes = data => ({ type: FETCHED_WORK_TYPES, data });