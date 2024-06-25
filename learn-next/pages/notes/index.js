import dynamic from "next/dynamic";
import Link from "next/link";
const LayoutComponent = dynamic(() => import("@/Layouts"));

export default function Notes({ notes }) {
  console.log("Data notes =>", notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes" metasDescription="Ini meta deskripsi dari Notes">
        {notes.data.map((item) => (
          <Link href={`/notes/${item.id}`}>
            <div>
              <p>{item.title}</p>
            </div>
          </Link>
        ))}
      </LayoutComponent>
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
