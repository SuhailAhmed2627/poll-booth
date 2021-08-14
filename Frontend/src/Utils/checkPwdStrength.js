const checkPwdStength = (password) => {
   let strongPassword = new RegExp("^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
   let mediumPassword = new RegExp("^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
   let validPassword = new RegExp("(?=.{8,}).*", "g");
   if (strongPassword.test(password)) {
      return { content: "Password is Strong", color: "green" };
   } else if (mediumPassword.test(password)) {
      return { content: "Password is Medium", color: "green" };
   } else if (validPassword.test(password)) {
      return { content: "Password is Weak", color: "yellow" };
   }
   return { content: "Password is Invalid", color: "red" };
};

export default checkPwdStength;
