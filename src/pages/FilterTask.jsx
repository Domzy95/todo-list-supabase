//*KOMPONENTA ZA FILTRIRANJE TASKOV PO KONČANIH, NEKONČANIH IN VSEH TASKIH

import { Button, HStack } from "@chakra-ui/react";

const FilterTask = ({ filter, setFilter }) => {
  return (
    <>
      <HStack justify="center" align="center" mt={5} spacing={2}>
        <Button
          bg={filter == "all" ? "orange.500" : "gray.700"}
          size="md"
          color="white"
          _hover={{ bg: "orange.600" }}
          borderRadius="md"
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          size="md"
          color="white"
          _hover={{ bg: "green.600" }}
          borderRadius="md"
          bg={filter === "completed" ? "green.600" : "gray.700"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
        <Button
          size="md"
          color="white"
          _hover={{ bg: "red.600" }}
          borderRadius="md"
          bg={filter === "incomplete" ? "red.600" : "gray.700"}
          onClick={() => setFilter("incomplete")}
        >
          Incomplete
        </Button>
      </HStack>
    </>
  );
};

export default FilterTask;
