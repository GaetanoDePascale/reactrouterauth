import tokenAdminData from './token_admin.json';
import decodeTokenAdminData from './decoded_token_admin.json';
import tokenUserData from './token_user.json';
import decodeTokenUserData from './decoded_token_user.json';
import month_2023_01 from './month_2023_01.json';
import month_2023_02 from './month_2023_02.json';
import range_bonuses from './range_bonuses.json';

import dynamicFormData from './dynamic_form.json';

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

    case 'month_2023_01':
      return { executionResult: true, data: month_2023_01 };
    case 'month_2023_02':
      return { executionResult: true, data: month_2023_02 };
    case 'range_bonuses':
      return { executionResult: true, data: range_bonuses };

    case 'dynamic-from':
      return { executionResult: true, data: dynamicFormData }

    default:
      return { executionResult: false, error: 'Not implemented in mockup!' };
  }
}
