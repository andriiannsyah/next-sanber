import dynamic from "next/dynamic";

export default function Main() {
  const LayoutComponent = dynamic(() => import("@/Layouts"));
  return (
    <>
      <LayoutComponent metaTitle="Home" metasDescription="Ini meta deskripsi dari menu Home">
        <p>Home</p>
      </LayoutComponent>
    </>
  );
}
