import dynamic from "next/dynamic";

export default function Posts({ posts }) {
  const LayoutComponent = dynamic(() => import("@/Layouts"));

  console.log("Data Post ==> ", posts);
  return (
    <>
      <LayoutComponent metaTitle="Post" metasDescription="Ini meta deskripsi dari menu Post">
        {posts.map((item) => (
          <div>
            <p>{item.id}</p>
            <p>
              <b>{item.title}</b>
            </p>
            <p>{item.body}</p>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
