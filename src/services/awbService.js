const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/awbs`;

const index = async (page = 1, limit = 10, filters = {}) => {
    try {
        const url = new URL(BASE_URL);
        url.searchParams.set('page', page);
        url.searchParams.set('limit', limit);
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                url.searchParams.set(key, value);
            }
        });
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('Failed to fetch AWBs');
        }
        return res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getAwbById = async (awbId) =>{
    try {
        const res = await fetch(`${BASE_URL}/${awbId}`);
        if(!res.ok) {
            throw new Error('Failed to fetch AWB');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
    index,
    getAwbById,
};