import Link from "next/link";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";
const mockUrl = [
  "https://utfs.io/f/3849b83f-40f9-428e-8b2e-2efaa0f2b6ce-b280y9.jpg",
  "https://utfs.io/f/0030dba0-fa65-49b0-952d-7a971d79ce3b-3lq3q2.png",
  "https://utfs.io/f/77ca9942-7803-480f-ac74-21b4ea9d90b9-orx84a.bmp",
  "https://utfs.io/f/71574bcc-ac9c-4176-8f67-f5c518262a03-1xa0my.jpeg",
];

const MockImages = mockUrl.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <div className=" flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...MockImages, ...MockImages, ...MockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="max-h-50 w-48 ">
            <img src={image.url} alt="image" height={160} width={160} />
          </div>
        ))}
      </div>
    </main>
  );
}
