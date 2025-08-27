import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/app/server/api/userRoute';
import { SignupForm } from '@/types/authForm';

export const useSignup = () => {
  return useMutation({
    mutationFn: registerUser,
    onError: (error: any) => {
      if (error.response?.status === 409) {
        throw new Error('User already exists with this email');
      } else if (error.response?.status === 400) {
        throw new Error('Invalid form data. Please check your inputs.');
      } else {
        throw new Error('Signup failed. Please try again.');
      }
    }
  });
};