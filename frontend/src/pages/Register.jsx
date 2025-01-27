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

const RegisterSchema = z.object({
  username: z.string().nonempty({ message: 'Please enter username' }),
  password: z.string().nonempty({ message: 'Please enter password' }),
});

function Register() {
  const { setUserInfo } = useUserContext();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const navigate = useNavigate();

  async function onSubmit(values) {
    console.log('register user');
    console.log(values);

    try {
      const { data } = await customFetch.post('/register', values);
      const { user, msg } = data;
      // set user in the context
      setUserInfo(user);
      // redirect user to dashboard
      navigate('/dashboard');
      toast.success(msg);
      toast.success(`Welcome, ${user.username}`);
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || `Oops there was an error`;
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <FormCardWrapper title="Register">
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
          already registered?
          <Link to="/login">
            <Button variant={'link'} className="capitalize ml-0 pl-2 font-bold">
              login
            </Button>
          </Link>
        </h3>
      </FormCardWrapper>
    </>
  );
}

export default Register;
