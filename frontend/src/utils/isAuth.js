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

  const TEST_AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijp7InVzZXJfaWQiOiI4In0sInR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3NTI3NTYwNTQsImlhdCI6MTc1MTQ2MDA1NCwianRpIjoiYjNlNjU2MTktNjJjYy00NDJiLTlhYzAtNjk2M2I2ZDI5NWE3In0.RtbiVpCw9WXONfIYzInQvk8hh0GP4U5hV1KBo5TK_EY";

  return {
    authenticated: true,
    token: TEST_AUTH_TOKEN,
  };
};
