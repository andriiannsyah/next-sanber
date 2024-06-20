import Layout from "@/Layouts";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetch("api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("Error => ", err));
  }, []);
  return (
    <>
      <Layout metaTitle="Home" metasDescription="Ini meta deskripsi dari menu Home">
        <p>Home</p>
      </Layout>
    </>
  );
}
