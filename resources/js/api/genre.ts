import * as utils from '../utils';

export const fetchGenres = () => {
    return utils.wrapFetch('/api/genres');
};
