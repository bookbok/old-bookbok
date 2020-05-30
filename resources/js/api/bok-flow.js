import * as utils from '../utils';

export const fetchBokFlow = () => {
    return utils.wrapFetch('/api/bok_flow');
};
