'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { useLoadingState } from '@/app/hooks';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/button';
import AuthSocialButton from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
   const [variant, setVariant] = useState<Variant>('LOGIN');
   const { isLoading, startLoading, finishLoading } = useLoadingState();
   const session = useSession();
   const router = useRouter();

   useEffect(() => {
      if (session?.status === 'authenticated') {
         console.log('authenticated');
         router.push('/users');
      }
   }, [session?.status, router]);

   const toggleVariant = useCallback(() => {
      if (variant === 'LOGIN') {
         setVariant('REGISTER');
      } else {
         setVariant('LOGIN');
      }
   }, [variant]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         email: '',
         password: '',
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      startLoading();
      if (variant === 'REGISTER') {
         axios
            .post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong'))
            .finally(() => finishLoading());
      }
      if (variant === 'LOGIN') {
         signIn('credentials', {
            ...data,
            redirect: false,
         })
            .then((callback) => {
               if (callback?.error) {
                  toast.error('Invalid credentials');
               }

               if (callback?.ok && !callback?.error) {
                  toast.success('Logged in');
                  router.push('/users');
               }
            })
            .finally(() => finishLoading());
      }
   };

   const socialAction = (action: string) => {
      startLoading();
      signIn(action, {
         redirect: false,
      })
         .then((callback) => {
            if (callback?.error) {
               toast.error('Invalid credentials');
            }

            if (callback?.ok && !callback?.error) {
               toast.success('Logged in');
            }
         })
         .finally(() => finishLoading());
   };

   return (
      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
         <div className='bg-white px-4 py-6 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
               {variant === 'REGISTER' && (
                  <Input
                     label='Name'
                     id='name'
                     errors={errors}
                     register={register}
                     disabled={isLoading}
                  />
               )}
               <Input
                  label='Email'
                  type='email'
                  id='email'
                  errors={errors}
                  register={register}
                  disabled={isLoading}
               />
               <Input
                  label='Password'
                  type='password'
                  id='password'
                  errors={errors}
                  register={register}
                  disabled={isLoading}
               />
               <div>
                  <Button disabled={isLoading} fullWidth type='submit'>
                     {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                  </Button>
               </div>
            </form>
            <div className='mt-6 '>
               <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                     <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                     <span className='bg-white px-2 text-gray-500'>
                        Or continue with
                     </span>
                  </div>
               </div>
               <div className='mt-6 flex gap-2'>
                  <AuthSocialButton
                     icon={BsGithub}
                     onClick={() => socialAction('github')}
                  />
                  <AuthSocialButton
                     icon={BsGoogle}
                     onClick={() => socialAction('google')}
                  />
               </div>
            </div>
            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
               <div>
                  {variant === 'LOGIN'
                     ? 'New to messenger?'
                     : 'Already have an account?'}
               </div>
               <div
                  onClick={toggleVariant}
                  className='underline cursor-pointer '
               >
                  {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
               </div>
            </div>
         </div>
      </div>
   );
}
