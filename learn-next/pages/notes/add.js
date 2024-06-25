import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/Layouts"));
import { Box, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Notes() {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();

  const HandleSubmit = async () => {
    try {
      const res = await fetch("https://service.pace-unv.cloud/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });
      const result = await res.json();
      if (result?.success) {
        router.push("/notes");
      }
      console.log("Hasil =>", result);
    } catch (error) {}
  };

  return (
    <>
      <LayoutComponent metaTitle="Add Notes" metasDescription="Ini meta deskripsi dari Add Notes">
        <Card margin="5" padding="5">
          <Heading>Add Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
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
