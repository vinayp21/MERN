import fetch from 'isomorphic-fetch'
import storeCollection from './store/index';

export function apiCall (action={}){
  // const store = storeCollection({});
  return fetch(action.url,{
	  credentials: 'include',
	  method: 'post',
	  headers: {
	  	'Content-Type': 'application/json',
      'authorization':action.token
	  },
		body: JSON.stringify(action.reqObj)
	}).then(function(response) {
    	return response.json();
  });
}
