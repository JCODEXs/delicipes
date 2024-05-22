import { UploadSVG } from "~/app/_components/simple-upload-button";
export default async function FullPageRecetionView() {
  const imageUrl = "reception.jpeg";

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full border-b p-2 text-center">
          Bienvenidos a nuestro Matrimonio
        </div>
        <div className="flex items-center justify-center rounded-md p-4">
          <img
            src={imageUrl}
            height={300}
            width={"auto"}
            alt="img"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col border-t bg-gray-800 text-white lg:w-1/3 lg:border-l lg:border-t-0">
        <div className="p-2">
          <div>Estamos muy felices de tenerlos con nosotros</div>
        </div>
        <div className="p-2">
          <div className="flex items-center text-xs">
            Esta aplicacion fue creada para que nos dejen las fotos de la
            reunion usando el boton
            <span className="ml-1 inline-flex items-center">
              <UploadSVG />
            </span>
          </div>
        </div>
        <div className="p-2"></div>
      </div>
    </div>
  );
}
