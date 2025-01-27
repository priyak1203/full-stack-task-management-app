import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function FormCardWrapper({ title = 'Please fill details', children }) {
  return (
    <div className="min-h-screen flex items-center">
      <Card className="w-[500px] mx-auto  px-2 py-0">
        <CardHeader className="text-center">
          <CardTitle className="tracking-wide font-bold text-2xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

export default FormCardWrapper;
