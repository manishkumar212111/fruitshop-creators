const BASE_URL = 'http://localhost:5000/';
// const BASE_URL = 'https://serene-springs-70492.herokuapp.com/';
const IMAGE_URL = "https://ik.imagekit.io/i2wp0fsg8dx/";

const getImageURL = (imgName) => IMAGE_URL.concat(imgName);

const EndPoints = {
    Users: {
        url: 'api/users',
    },
    Login : {
        url : "api/auth/login"
    },
    Register : {
        url : "api/auth/register"
    },
    Forgot_Password : {
        url : "api/auth/forgot-password"
    },
    ResetPassword : {
        url : "/api/auth/reset-password"
    },
    Auth: {
        url : "api/user/auth"
    },
    Product : {
        url : "api/product/user"
    },
    ProductOpen : {
        url : "api/product"
    }
    
};

export { BASE_URL, EndPoints, getImageURL };