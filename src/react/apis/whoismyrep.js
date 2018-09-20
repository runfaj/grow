import APIHelper from './APIHelper';

export default {
    getRepresentative: (state, success, error) => {
        if(!success) success = ()=>{};
        if(!error) error = ()=>{};
        APIHelper.getJson(`/whoismy/representatives/${state}`).then(success).catch(error);
    },
    getSenator: (state, success, error) => {
        if(!success) success = ()=>{};
        if(!error) error = ()=>{};
        APIHelper.getJson(`/whoismy/senators/${state}`).then(success).catch(error);
    },
};
