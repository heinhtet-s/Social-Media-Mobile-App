import {useMutation} from 'react-query';
import {z} from 'zod';
import {postData} from '.';
export const LoginSchema = z.object({
  email: z.string().email(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
interface LoginArgType {
  email: string;
}
export const useUserLogin = () => {
  return useMutation({
    mutationFn: (body: LoginArgType) => postData(`/user/login`, body),
  });
};
