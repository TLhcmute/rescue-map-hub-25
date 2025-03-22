
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { authState, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoggingIn(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn quay trở lại!'
        });
      } else {
        toast({
          title: 'Đăng nhập thất bại',
          description: 'Email hoặc mật khẩu không chính xác',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Đã xảy ra lỗi, vui lòng thử lại sau',
        variant: 'destructive'
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Redirect if already logged in
  if (authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
          <p className="mt-2 text-gray-600">Vui lòng đăng nhập để tiếp tục</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>
        </Form>
        
        <div className="text-center text-sm text-gray-600">
          <p>Tài khoản demo: demo@rescue.com / demo123</p>
          <p className="mt-2">
            Chưa có tài khoản?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
