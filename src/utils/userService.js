
export const userService = {
  getLocal: () => {
    return localStorage.getItem('UNIVERSITY_ID');

  },

  updateLocal: (token) => {
    localStorage.setItem('UNIVERSITY_ID', token);
  },
};
