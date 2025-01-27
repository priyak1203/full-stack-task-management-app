import { FormCardWrapper } from '@/components/globals';
import CustomFormInput from '@/components/globals/CustomFormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '@/utils/axios';
import { toast } from 'react-toastify';
import { useUserContext } from '@/context/userContext';

const LoginSchema = z.object({
  username: z.string().nonempty({ message: 'Please enter username' }),
  password: z.string().nonempty({ message: 'Please enter password' }),
});

function Login() {
  const { setUserInfo } = useUserContext();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const {
        data: { user },
      } = await customFetch.post('/login', values);
      // set user value in the context
      setUserInfo(user);
      // redirect user to dashboard
      navigate('/dashboard');
      toast.success(`Welcome ${user.username}`);
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || `Oops there was an error`;
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <FormCardWrapper title="Login">
        <Form {...form}>
          <form
            className="space-y-2 border-slate-600"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* USERNAME */}
            <CustomFormInput
              name="username"
              control={form.control}
              type="text"
            />
            {/* PASSWORD */}
            <CustomFormInput
              name="password"
              control={form.control}
              type="password"
            />
            {/* SUBMIT BUTTON */}
            <div className="flex pt-6">
              <Button
                type="submit"
                className="mx-auto"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : ' Submit'}
              </Button>
            </div>
          </form>
        </Form>
        <h3 className="capitalize text-center text-md mt-4">
          not registered yet?
          <Link to="/register">
            <Button variant={'link'} className="capitalize ml-0 pl-2 font-bold">
              register
            </Button>
          </Link>
        </h3>
      </FormCardWrapper>
    </>
  );
}

export default Login;
