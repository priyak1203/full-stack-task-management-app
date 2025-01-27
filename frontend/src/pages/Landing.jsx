import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="h-screen grid items-center justify-center ">
      <div>
        <h1 className="text-3xl border border-red-600">Front End OF FDS</h1>
        <div className="mx-auto">
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
