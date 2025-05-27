import { useState } from "react";
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
import type { LoginFormValues } from "@/shared/schemas/login.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/api/login";
import { Alerts } from "@/shared/components/alert/alerts";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        navigate("/app/inicio");
      },
      onError: () => {
        setAlertMsg("ERROR EN EL USUARIO Y/O CONTRASEÑA");
        setAlertOpen(true);
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-muted px-4">
        <Card className="w-full max-w-sm shadow-lg border-none">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold">Iniciar sesión</CardTitle>
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
                  {isPending ? "INICIANDO SESION" : "Iniciar sesión"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col text-center gap-1 text-sm text-muted-foreground">
            <span>¿No tienes una cuenta?</span>
            <Link
              to="/register"
              className="text-primary hover:underline transition-colors"
            >
              Regístrate aquí
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Alerts contenido={alertMsg} open={alertOpen} onOpenChange={setAlertOpen} />
    </>
  );
};

export default Login;
