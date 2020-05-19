class Account {
  static getData() {
    let account;
    try {
      account = JSON.parse(localStorage.getItem('account'));
    } catch (e) {

    }
    return account || {};
  }

  static setData(data) {
    localStorage.setItem(JSON.stringify(data));
  }

  static deleteData() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static setToken(token) {
    return localStorage.setItem('token', token)
  }
}

export default Account
