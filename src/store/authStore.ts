let authState = {
    token: null as string | null,
  };
  
  export const setToken = (token: string) => {
    authState.token = token;
  };
  
  export const getToken = () => {
    return authState.token;
  };