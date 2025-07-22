export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  
  export const logout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  