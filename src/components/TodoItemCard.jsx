import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";

const TodoItemCard = ({ el, HandleDelete, HandleChange }) => {
  const { title, description, _id, status } = el;
  return (
    <Card p={2} mt={1} w={"280px"}>
      <CardHeader p={2}>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody p={2}>
        <Text>{description}</Text>
      </CardBody>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        {" "}
        <CardFooter p={3}>
          <Button
            onClick={() => HandleDelete(_id)}
            colorScheme="red"
            variant="outline"
          >
            Delete
          </Button>
        </CardFooter>
        <FormControl>
          <Select
            borderColor="blue"
            placeholder="Todo Status"
            name="status"
            value={status}
            onChange={(e) => HandleChange({ ...el, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Inprogress">Inprogress</option>
            <option value="QA">QA</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormControl>
      </Box>
    </Card>
  );
};

export default TodoItemCard;
