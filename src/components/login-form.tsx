import { useState } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { useForm } from 'react-hook-form';

const LoginForm: React.FC = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY!);

      const didToken = await magic.auth.loginWithMagicLink({
        email: formData.email,
      });

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="hello@example.com"
        className="w-full p-4"
        {...register('email', { required: 'Email is required' })}
      />
      {errors.email && (
        <div role="alert" className="text-red-600">
          {errors.email.message}
        </div>
      )}
      {errorMessage && (
        <div role="alert" className="text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4"
      >
        Sign up / Log in
      </button>
    </form>
  );
};

export default LoginForm;
