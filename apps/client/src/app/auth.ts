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
  setAuthHeader() {
    if (this.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  },
};
