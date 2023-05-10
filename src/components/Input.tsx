import * as React from 'react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  validation?: RegisterOptions<FieldValues, string>;
};

const Input = ({ id, className, type, validation, ...props }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <input
        id={id}
        type={type}
        {...register(id, validation)}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground invalid:border-destructive invalid:ring-destructive invalid:ring-opacity-50 invalid:ring-offset-2 invalid:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          errors[id] &&
            'invalid:border-destructive invalid:ring-destructive invalid:ring-opacity-50 invalid:ring-offset-2 invalid:ring-offset-background',
          className
        )}
        {...props}
      />
    </>
  );
};

// const MemoedInput = React.memo(Input);

// export default MemoedInput;
export default Input;
