//*Ta komponenta prikaže POSAMEZNO nalogo in omogoča urejanje, brisanje ter označevanje kot dokončano.

import { HiOutlineTrash, HiOutlineClock } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";
import { FaPen } from "react-icons/fa6";
import { time } from "../utils/time";
import { HStack, VStack, Text, Icon, Input, Button } from "@chakra-ui/react";

const TaskItem = ({
  task,
  index,
  deleteTask,
  toggleTask,
  saveTask,
  startEditing,
  isEditing,
  editedTask,
  setEditedTask,
}) => {
  // Preverimo, ali je task definiran pred uporabo
  if (!task) return null; // Če task ni definiran, ne narišemo ničesar
  return (
    <>
      <HStack
        borderRadius="md"
        key={index}
        justify="space-between"
        p={2}
        borderWidth="2px"
        color={task.completed ? "green.300" : "white"}
        borderColor={task.completed ? "green.500" : "orange.500"}
        bg={task.completed ? "green.900" : "transparent"}
      >
        {/* Če je naloga v načinu urejanja*/}
        {isEditing === index ? (
          <HStack w="100%">
            <Input
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              color="white"
              borderColor="orange.500"
            />
            <Button
              size="sm"
              bg="orange.500"
              _hover={{ bg: "orange.600" }}
              onClick={() => saveTask(index)}
            >
              Update
            </Button>
          </HStack>
        ) : (
          // Če ni v stanju urejanja je običajen prikaz naloge
          <>
            <VStack align="start" spacing={1} w="80%">
              <Text
                fontWeight="bold"
                color={task.completed ? "gray.500" : "white"}
                textDecoration={task.completed ? "line-through" : "none"}
                opacity={task.completed ? 0.7 : 1}
              >
                {task.text}
              </Text>
              <HStack>
                <Icon as={HiOutlineClock} boxSize={4} color="gray.400" />
                <Text color="gray.400" fontSize="sm" fontStyle="italic">
                  {time(task.timeCreated)}
                </Text>
              </HStack>
            </VStack>
            <HStack>
              {/*Če je task completed se prikaže samo ikona za koš! */}
              {!task.completed && (
                <Icon
                  as={IoMdCheckmark}
                  boxSize={6}
                  cursor="pointer"
                  color="white"
                  _hover={{
                    color: "orange.600",
                  }}
                  onClick={() => toggleTask(task.id)}
                />
              )}
              {!task.completed && (
                <Icon
                  as={FaPen}
                  boxSize={5}
                  cursor="pointer"
                  color="white"
                  onClick={() => startEditing(index)}
                  _hover={{ color: "orange.600" }}
                />
              )}
              <Icon
                as={HiOutlineTrash}
                boxSize={5}
                color="white"
                cursor="pointer"
                _hover={{ color: "orange.600" }}
                onClick={() => deleteTask(index)}
              />
            </HStack>
          </>
        )}
      </HStack>
    </>
  );
};
export default TaskItem;
