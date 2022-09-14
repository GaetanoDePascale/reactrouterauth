import tokenAdminData from './token_admin.json';
import decodeTokenAdminData from './decoded_token_admin.json';
import tokenUserData from './token_user.json';
import decodeTokenUserData from './decoded_token_user.json';

export function getMockupData(url) {
  console.log('using mockup data for ' + url);
  switch (url) {
    case 'token_admin':
      return { executionResult: true, data: tokenAdminData };
    case 'decode_token_admin':
      return { executionResult: true, data: decodeTokenAdminData };
    case 'token_user':
      return { executionResult: true, data: tokenUserData };
    case 'decode_token_user':
      return { executionResult: true, data: decodeTokenUserData };

    default:
      return { executionResult: false, error: 'Not implemented in mockup!' };
  }
}
