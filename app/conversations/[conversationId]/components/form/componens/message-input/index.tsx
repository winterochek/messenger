'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
   type?: string;
   id: string;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
   required?: boolean;
   placeholder?: string;
}

export default function MessageInput({
   id,
   register,
   errors,
   required,
   placeholder,
   type,
}: Props) {
   return (
      <div className='relative w-full'>
         <input
            id={id}
            autoComplete={id}
            {...register(id, { required })}
            placeholder={placeholder}
            type={type}
            className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
         />
      </div>
   );
}
