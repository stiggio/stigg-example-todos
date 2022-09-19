import axios from 'axios';

export default {
  token: sessionStorage.getItem('token'),
  setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', token);
    this.setAuthHeader();
  },
  logout() {
    delete axios.defaults.headers.common['Authorization'];
    sessionStorage.removeItem('token');
    this.token = null;
  },
  loggedIn() {
    return !!this.token;
  },
  // Instruct Vue to include a header with the JWT in every request
  setAuthHeader() {
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  },
};
