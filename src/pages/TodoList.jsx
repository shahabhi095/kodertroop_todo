import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoItemCard from "../components/TodoItemCard";
import { AiOutlineSearch } from "react-icons/ai";
const DisplayTodoList = () => {
  const [searchTodo, setSearch] = useState("");
  const [getTodo, setGetTodo] = useState([]);
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  useEffect(() => {
    GetTodo();
  }, []);

  const GetTodo = async () => {
    setLoader(true);
    try {
      let res = await axios.get(`https://your-todo-w2x0.onrender.com/api/todo`);
      setGetTodo(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `https://your-todo-w2x0.onrender.com/api/delete/${id}`
      );
      toast({
        title: "Todo Deleted.",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      GetTodo();
    } catch (err) {
      console.log(err);
    }
  };
  // HandleChange will change the status of todo
  const HandleChange = async (val) => {
    try {
      let res = await axios.patch(
        `https://your-todo-w2x0.onrender.com/api/update/${val._id}`,
        val
      );
      toast({
        title: "Todo Updated.",
        description: res.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      GetTodo();
    } catch (err) {
      console.log(err);
    }
  };
  
  const HandleSearch = async () => {
    setLoader(true);
    try {
      let res = await axios.get(
        `https://your-todo-w2x0.onrender.com/api/todo/search?q=${searchTodo}`
      );
      setLoader(false);
      setGetTodo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box ml={4}>
      {/*----------- Search section start------------------------ */}
      <Box w={"40%"} m={2} ml={0} display={"flex"}>
        {" "}
        <InputGroup borderColor={"facebook.800"}>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Todo"
            value={searchTodo}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>{" "}
        <Button onClick={HandleSearch} colorScheme="facebook">
          Search
        </Button>
      </Box>
      {/*----------- Search section emd------------------------ */}

      {/*----------- Todolist desplay start------------------------ */}
      {loader === true ? (
        <Box
          position={"fixed"}
          w={"15%"}
          top={"37%"}
          left={"45%"}
          borderRadius={"50%"}
        >
          <Image
            borderRadius="50%"
            src="https://i.gifer.com/origin/d3/d3f472b06590a25cb4372ff289d81711_w200.gif"
            alt=""
          />
        </Box>
      ) : (
        <Box display={"flex"} gap={"20px"} justifyContent={"space-betwen"}>
          {/*-----------Todo pending start------------------------ */}
          <Box bgColor={"#dbdbce"} w={"300px"}>
            <Heading
              fontSize={"18px"}
              textAlign={"center"}
              p={1}
              color={"#2f3639"}
            >
              TODO
            </Heading>
            {getTodo &&
              getTodo.map((el) =>
                el.status == "Pending" ? (
                  <TodoItemCard
                    key={el._id}
                    el={el}
                    HandleDelete={HandleDelete}
                    HandleChange={HandleChange}
                  />
                ) : null
              )}
          </Box>
          {/*-----------Todo pending end------------------------ */}
          {/*-----------Todo Inprogress start------------------------ */}
          <Box bgColor={"#dbdbce"} w={"300px"}>
            <Heading
              fontSize={"18px"}
              textAlign={"center"}
              color={"#2f3639"}
              p={1}
            >
              INPROGRESS
            </Heading>
            {getTodo &&
              getTodo.map((el) =>
                el.status == "Inprogress" ? (
                  <TodoItemCard
                    key={el._id}
                    el={el}
                    HandleDelete={HandleDelete}
                    HandleChange={HandleChange}
                  />
                ) : null
              )}
          </Box>
          {/*-----------Todo Inprogress end------------------------ */}
          {/*-----------Todo QA start------------------------ */}
          <Box bgColor={"#dbdbce"} w={"300px"}>
            <Heading
              fontSize={"18px"}
              textAlign={"center"}
              color={"#2f3639"}
              p={1}
            >
              IN QA
            </Heading>
            {getTodo &&
              getTodo.map((el) =>
                el.status == "QA" ? (
                  <TodoItemCard
                    key={el._id}
                    el={el}
                    HandleDelete={HandleDelete}
                    HandleChange={HandleChange}
                  />
                ) : null
              )}
          </Box>
          {/*-----------Todo QA end------------------------ */}
          {/*-----------Todo Completed start------------------------ */}
          <Box bgColor={"#dbdbce"} w={"300px"}>
            <Heading
              fontSize={"18px"}
              textAlign={"center"}
              ccolor={"#2f3639"}
              p={1}
            >
              COMPLETED
            </Heading>
            {getTodo &&
              getTodo.map((el) =>
                el.status == "Completed" ? (
                  <TodoItemCard
                    key={el._id}
                    el={el}
                    HandleDelete={HandleDelete}
                    HandleChange={HandleChange}
                  />
                ) : null
              )}
          </Box>
          {/*-----------Todo Completed end------------------------ */}
        </Box>
      )}
      {/*----------- Todolist desplay end------------------------ */}
    </Box>
  );
};

export default DisplayTodoList;
