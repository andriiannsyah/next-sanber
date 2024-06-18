import Layout from "@/Layouts";
import { useRouter } from "next/router";

export default function userById() {
  const router = useRouter();
  const { id } = router?.query;
  return (
    <Layout>
      <div>user name by {id}</div>
    </Layout>
  );
}
