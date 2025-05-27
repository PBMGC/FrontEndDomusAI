import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterFormValues } from "@/shared/schemas/register.schema";
import { useRegister } from "@/api/register";

const Register = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    register(values, {
      onSuccess: () => {
        navigate("/");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-sm shadow-lg border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-semibold">REGISTRARSE</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="correo@ejemplo.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isPending?"REGISTRANDO":"REGISTRAR"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col text-center gap-1 text-sm text-muted-foreground">
          <span>¿Tienes una cuenta?</span>
          <Link
            to="/"
            className="text-primary hover:underline transition-colors"
          >
            Iniciar sesion
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
