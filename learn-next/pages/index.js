import dynamic from "next/dynamic";
import { useEffect } from "react";
import Image from "next/image";

export default function Main() {
  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("Error => ", err));
  }, []);

  const LayoutComponent = dynamic(() => import("@/Layouts"));
  return (
    <>
      <LayoutComponent metaTitle="Home" metasDescription="Ini meta deskripsi dari menu Home">
        <p>Home</p>
        <Image priority={true} src="/logo-next.png" width={200} height={200} alt="next-image" />
        <img src="/logo-next.png" style={{ width: 200, height: 200 }} alt="next-image" />
      </LayoutComponent>
    </>
  );
}
