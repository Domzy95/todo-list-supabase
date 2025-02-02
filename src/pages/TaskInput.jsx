//*KOMPONENTA ZA VNOS NOVE NALOGE IN PA SEARCH INPUT

import { Input, Button, HStack, VStack } from "@chakra-ui/react";

const TaskInput = ({ task, setTask, addTask, search, setSearch }) => {
  //OB KLIKU NA ENTER SPROZI FUNKCIJO ADDTASK
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <>
      <VStack spacing={3} align="center" w="100%">
        <HStack>
          <Input
            onKeyDown={handleKeyDown}
            borderRadius="md"
            w="70%"
            borderColor="orange.500"
            color="white"
            placeholder="Got Something To Do?"
            _placeholder={{ color: "grey" }}
            value={task}
            borderWidth="2px"
            size="lg"
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            alignContent="center"
            borderRadius="md"
            _hover={{ bg: "orange.600" }}
            bg="orange.500"
            colorScheme="teal"
            size="lg"
            w="25%"
            onClick={addTask}
          >
            Add Task
          </Button>
        </HStack>
        <Input
          borderRadius="md"
          borderColor="orange.500"
          color="white"
          placeholder="Type to search your tasks"
          _placeholder={{ color: "grey" }}
          borderWidth="2px"
          size="lg"
          w={{ base: "100%", md: "72%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </VStack>
    </>
  );
};

export default TaskInput;
