import axios from 'axios';

const loginUser = async (loginCreds) => {
  const loginUrl = '/api/auth/login';
  try {
    const { data, status } = await axios.post(loginUrl, loginCreds);
    if (status === 200)
      return data;
    if(status === 500)
      throw new Error("Login Failed ");
    if(status === 401)
      throw new Error("Unauthorized access");
  }catch(error){
    console.log(error.message);
    return false;
  }
  
}

const signupUser = async (signupCreds) => {
  const signupUrl='/api/auth/signup';
  try {
    const { data, status } = await axios.post(signupUrl, signupCreds);
    if (status>=200 && status <=300)
      return data;
    if(status === 500)
      throw new Error("Signup Failed!");
    if(status === 401)
      throw new Error("Unauthorized access");
  }catch(error){
    console.log(error.message);
    return false;
  }
}

export {loginUser, signupUser}