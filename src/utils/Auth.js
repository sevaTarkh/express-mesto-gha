class Auth{
    constructor(options){
        this._options = options;
        this._baseUrl = this._options.baseUrl;
        this._headers = this._options.headers;
    }

    _getResJson(res){
        if (res.ok){
            return res.json();
        } 
            return Promise.reject(`Ошибка: ${res.status}`); 
    }
    register(data){
        return fetch(`${this._baseUrl}/signup`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
          })
          .then(this._getResJson)
    }
    login(data){
        return fetch(`${this._baseUrl}/signin`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
        .then(this._getResJson)
    }
    checkToken(token){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'GET',
            headers:{
                ...this._headers,
                Authorization: `Bearer ${token}`
            }
        })
        .then(this._getResJson)
    }
}
const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co', 
    headers: {
        'Content-Type': 'application/json'
    },
});

export default auth;