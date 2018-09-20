import APIHelper from './APIHelper';

export default {
    getRepresentative: (state, success, error) => {
        if(!success) success = ()=>{};
        if(!error) error = ()=>{};
        APIHelper.getJson(`/representatives/${state}`).then(success).catch(error);
    },
    getSenator: (state, success, error) => {
        if(!success) success = ()=>{};
        if(!error) error = ()=>{};
        APIHelper.getJson(`/senators/${state}`).then(success).catch(error);
    },
};
