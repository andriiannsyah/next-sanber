import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/Layouts"));
import { Grid, GridItem, Card, Heading, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditNotes() {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();
  const { id } = router.query;

  const HandleSubmit = async () => {
    try {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: notes.title, description: notes.title }),
      });
      const result = await res.json();
      if (result?.success) {
        router.push("/notes");
      }
      console.log("Hasil =>", result);
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const listNotes = await res.json();
      setNotes(listNotes?.data);
    }
    fetchingData();
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Add Notes" metasDescription="Ini meta deskripsi dari Add Notes">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })} value={notes?.title || ""} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} value={notes?.description || ""} />
            </GridItem>
            <GridItem>
              <Button colorScheme="blue" onClick={() => HandleSubmit()}>
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
