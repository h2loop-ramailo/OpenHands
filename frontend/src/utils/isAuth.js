// "use server";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

export const isAuthenticated = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get('token');

  // try {
  //     if (!token) {
  //         return {
  //             authenticated: false,
  //             message: 'No authentication token found'
  //         };
  //     }

  //     const decodedToken = jwt.decode(token.value);
  //     if (decodedToken.exp < Date.now() / 1000) {
  //         return {
  //             authenticated: false,
  //             message: 'Token has expired'
  //         };
  //     }

  //     if (token && token.value) {
  //         return {
  //             authenticated: true,
  //             token: token.value
  //         };
  //     }

  //     return {
  //         authenticated: false,
  //         message: 'Invalid authentication token'
  //     };

  // } catch (error) {
  //     return {
  //         authenticated: false,
  //         message: 'Authentication check failed',
  //         error: error.message
  //     };
  // }

  return {
    authenticated: true,
    token: import.meta.env.VITE_AUTH_TOKEN,
  };
};
