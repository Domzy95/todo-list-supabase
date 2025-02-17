//*KOMPONENTA ZA AVTENTIKACIJO UPORABNIKA

import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Box,
  Input,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { CgLogIn } from "react-icons/cg";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError("Please enter a valid email!");
    else alert("Check your email for a confirmation link!");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError("Missing email or password!");
    else onLogin(data.user);
    setLoading(false);
  };

  return (
    <Box
      align="top"
      justify="center"
      minH="100vh"
      bg="gray.900"
      h="100%"
      w="100%"
      textAlign="center"
    >
      {" "}
      <VStack spacing={4}>
        <Heading mt={10} size="4xl" color="white">
          Welcome to our To-Do app! <br /> Sign in and stay organized ✅
        </Heading>
        <Image
          mt={10}
          align="top"
          justify="center"
          src="/assets/todo.png"
          alt="To-Do App"
          boxSize="150px"
        />
        <Input
          borderRadius="md"
          borderColor="orange.500"
          color="white"
          _placeholder={{ color: "grey" }}
          borderWidth="2px"
          size="lg"
          w={{ base: "80%", md: "20%", lg: "20%" }}
          mt={10}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          borderRadius="md"
          borderColor="orange.500"
          color="white"
          _placeholder={{ color: "grey" }}
          borderWidth="2px"
          size="lg"
          w={{ base: "80%", md: "20%", lg: "20%" }}
          mt={2}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <HStack>
          <Button
            _hover={{ bg: "orange.600" }}
            bg="orange.500"
            borderWidth="2px"
            size="lg"
            borderRadius="md"
            borderColor="orange.500"
            color="white"
            mt={2}
            onClick={handleLogin}
            isLoading={loading}
          >
            <CgLogIn />
            Login
          </Button>
          <Button
            _hover={{ bg: "orange.600" }}
            bg="orange.500"
            borderWidth="2px"
            size="lg"
            borderRadius="md"
            borderColor="orange.500"
            color="white"
            mt={2}
            onClick={handleSignUp}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </HStack>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
}
