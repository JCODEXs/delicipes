"use client";
import Image from "next/image";
import { Virtuoso } from "react-virtuoso";
import { ImageType } from "~/types/types";
import Link from "next/link";
type DashboardProps = {
  images: ImageType[];
};

const Dashboard: React.FC<DashboardProps> = ({ images }) => {
  // console.log("images2", images);

  return (
    <Virtuoso
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",

        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

        marginLeft: "5rem",
      }}
      totalCount={images.length}
      itemContent={(index) => {
        const image = images[index];
        // console.log("image", image);
        return (
          <div key={index} className="flex h-auto w-72 flex-row">
            <Link
              key={image.id}
              href={{ pathname: `/img/${image.id}`, query: { modal: "true" } }}
              passHref
              shallow
            >
              <Image
                src={image.url}
                style={{ objectFit: "contain" }}
                width={292}
                height={292}
                alt={image.name}
              />
              <div>{image.name}</div>
            </Link>
          </div>
        );
      }}
    />
  );
};
export default Dashboard;
