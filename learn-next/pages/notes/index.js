import dynamic from "next/dynamic";
const LayoutComponent = dynamic(() => import("@/Layouts"));
import { Box, Flex, Grid, GridItem, Card, CardBody, CardHeader, CardFooter, Heading, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Notes() {
  const [notes, setNotes] = useState();
  const router = useRouter();

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("https://service.pace-unv.cloud/api/notes");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
    fetchingData();
  }, []);
  console.log(notes);
  return (
    <>
      <LayoutComponent metaTitle="Notes" metasDescription="Ini meta deskripsi dari Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={() => router.push("/notes/add")}>
              Add Notes
            </Button>
          </Flex>
          <Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
              {notes?.data?.map((item) => (
                <GridItem>
                  <Card>
                    <CardHeader>
                      <Heading>{item?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>{item?.description}</Text>
                    </CardBody>

                    <CardFooter justify="space-between" flexWrap="wrap">
                      <Button onClick={() => router.push(`/notes/edit/${item?.id}`)} flex="1" variant="ghost">
                        Edit
                      </Button>
                      <Button flex="1" colorScheme="red">
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </LayoutComponent>
    </>
  );
}
// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
