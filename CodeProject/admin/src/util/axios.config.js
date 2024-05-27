import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
	//	请求发出前，执行的方法
	const token = localStorage.getItem('token')
	config.headers.Authorization  = `Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
	//	请求成功后，第一个执行的方法
	// console.log(response.headers)
	//	拿到响应头中的token，存到LocalStorage里
	const {authorization} = response.headers
	authorization && localStorage.setItem('token',authorization)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
	const {status} = error.response
	if(status === 401) {
		window.location.href = '#/login'
	}
    return Promise.reject(error);
  });