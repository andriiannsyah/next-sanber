import dynamic from "next/dynamic";

export default function DetailNotes({ notes }) {
  const LayoutComponent = dynamic(() => import("@/Layouts"));
  console.log("Data notes => ", notes);
  return (
    <>
      <LayoutComponent metaTitle="Detail Notes" metasDescription="Ini meta deskripsi dari menu Detail Notes">
        <div>
          <p>Title : {notes.data.title}</p>
          <p>Description : {notes.data.description}</p>
          <p>Update : {notes.data.created_at}</p>
        </div>
      </LayoutComponent>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();

  const paths = notes.data.map((item) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths,
    fallback: false, // false or "blocking"
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
