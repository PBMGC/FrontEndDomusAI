import * as Toast from "@radix-ui/react-toast";

export const Alerts = ({
  contenido,
  open,
  onOpenChange,
}: {
  contenido: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={onOpenChange}
        className="bg-white shadow rounded p-4 flex items-center space-x-4 fixed bottom-5 right-5"
      >
        <Toast.Title className="font-bold">{contenido}</Toast.Title>
        <Toast.Action asChild altText="Cerrar">
          <button className="text-blue-500">Cerrar</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 p-4 space-y-2" />
    </Toast.Provider>
  );
};
