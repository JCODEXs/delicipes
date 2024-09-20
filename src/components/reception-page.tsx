import { UploadSVG } from "~/app/_components/simple-upload-button";
export default async function FullPageRecetionView() {
  const imageUrl =
    "https://utfs.io/f/3nPJ2rcd2SU4w0aej4VI5lEgk2czMSXHGoYWOp9CTDNx4eLj";

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full border-b p-2 text-center text-red-900">
          Design delicious recipes
        </div>
        <div className="flex items-center justify-center rounded-md p-2">
          <img
            src={imageUrl}
            height={400}
            width={"auto"}
            alt="img"
            className="w-full max-w-md object-contain"
          />
        </div>
        <div className="mb-4 flex w-full flex-1 flex-col border-t bg-gray-800 text-yellow-200 lg:w-1/3 lg:border-l lg:border-t-0">
          <div className="p-2">
            <div>
              Adjust prices and ingredients quantities to your will and build
              your own recipes
            </div>
          </div>
          <div className="p-2">
            <div className="flex items-center justify-center text-orange-800">
              Plan your week meals and get your groseries list whit a budget
              {/* <span className="ml-1 inline-flex items-center">
                <UploadSVG />
              </span> */}
            </div>
          </div>
          <div className=""> </div>
        </div>
      </div>
    </div>
  );
}
