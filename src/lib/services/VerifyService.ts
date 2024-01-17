import {useMutation} from 'react-query';
import {postData} from '.';
import {SignUpFormData} from './SignUpService';
type VerifyFormData = {
  verificationCode: string;
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (body: VerifyFormData) => postData(`/user/verifyotp`, body),
  });
};

export const useGetOtp = () => {
  return useMutation({
    mutationFn: (body: null) => postData(`/user/requestotp`, {}),
  });
};
