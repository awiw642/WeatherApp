import { UPDATE_LOCATION, UPDATE_SEARCH_LOCATION } from './actions';

export const updateSearchLocationValue = location => ({
  type: UPDATE_SEARCH_LOCATION,
  location,
});
