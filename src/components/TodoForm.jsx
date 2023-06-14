import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
const initialState = { title: "", description: "", status: "Pending" };
const TodoForm = () => {
  const [todo, setTodo] = useState(initialState);
  const [loader, setLoader] = useState(false);
  const toast = useToast();
  
  const HandleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      let res = await axios.post(
        `https://your-todo-w2x0.onrender.com/api/create`,
        todo
      );

      toast({
        title: "Todo Added.",
        description: res.data.title,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoader(false);

      setTodo(initialState);
    } catch (err) {
      console.log(err);
    }
  };
  const HandleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create Your Todo </Heading>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={todo.title}
              onChange={HandleChange}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              size="sm"
              type="text"
              name="description"
              value={todo.description}
              placeholder="Enter description"
              onChange={HandleChange}
            />
          </FormControl>
          <FormControl>
            <Select
              placeholder="Todo Status"
              name="status"
              value={todo.status}
              onChange={HandleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Inprogress">Inprogress</option>
              <option value="QA">QA</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={HandleSubmit}
              isLoading={loader}
              loadingText="Adding"
            >
              Create Todo
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://media.istockphoto.com/id/1298394219/vector/flat-vector-illustration-of-person-checking-to-do-list-at-desk.jpg?s=612x612&w=0&k=20&c=32P-N-h388WqRFQxQBQU3wp-eb_ISah6AcIEUft1Cj0="
          }
        />
      </Flex>
    </Stack>
  );
};

export default TodoForm;
