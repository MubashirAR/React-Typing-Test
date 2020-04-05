const register = async details => {
  let response = await fetch('http://localhost:6565/register', {  method: 'POST', body: JSON.stringify(details), 'headers': {
    'content-type': 'application/json'
  } });
  console.log({ response });
};
const loginUser = async details => {
  let response = await fetch('http://localhost:6565/login', {  method: 'POST', body: JSON.stringify(details), 'headers': {
    'content-type': 'application/json'
  } });
  console.log({ response });
};
const getUser = () => {};
export default {
  register,
  getUser,
  loginUser
};
