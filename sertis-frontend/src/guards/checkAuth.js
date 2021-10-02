export default function checkAuth(props) {
  // props from react-router-dom
  return new Promise((resolve, reject) => {
    let user_value = sessionStorage.getItem("cc")
    let userGroup = sessionStorage.getItem("user_group")
    
    if (user_value) {
      resolve({ user: { email: "user@gmai.com", name: "Test", user_cc: user_value, userGroup: userGroup } });
    } else {
      reject(new Error('/login'));
    }
    
  });
}
