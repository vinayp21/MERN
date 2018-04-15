import fetch from 'isomorphic-fetch'
import storeCollection from './store/index';

export function apiCall (action={}){
  return new Promise(function(resolve, reject) {
    fetch(action.url, {
 	  credentials: 'include',
 	  method: 'post',
 	  headers: {
 	  	'Content-Type': 'application/json',
       'authorization':action.token
 	  },
 		body: JSON.stringify(action.reqObj)
 	}).then((response) => {
     	return response.json();
   }).then(data => {
     if(data.msg==='Session Logout'){
       window.location.href='/'
     }else if (data.err){
       reject(data.err);
     }else{
       resolve(data);
     }
   });
  });




}
