export const userService = {
    getLocal: () => {
        return localStorage.getItem('UNIVERSITY_CODE');
    },

    getId: () => {
        return localStorage.getItem('UNIVERSITY_ID');
    },

    updateLocal: (code, id) => {
        localStorage.setItem('UNIVERSITY_CODE', code);
        localStorage.setItem('UNIVERSITY_ID', id);
    },
};
