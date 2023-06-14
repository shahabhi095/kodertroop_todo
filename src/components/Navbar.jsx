
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box p={2} pl={0}>
      <Link to="/">
        {" "}
        <Button colorScheme="teal" variant="ghost" fontSize={"20px"}>
          Home
        </Button>
      </Link>
      <Link to="/todolist">
        {" "}
        <Button colorScheme="teal" variant="ghost" fontSize={"20px"}>
          Todolist
        </Button>
      </Link>
    </Box>
  );
}

export default Navbar
