//*KOMPONENTA ZA AVTENTIKACIJO UPORABNIKA

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Toaster, toaster } from "@/components/ui/toaster";
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
  let canSignUp = true; //prepreči spam mailov
  const handleSignUp = async () => {
    if (!canSignUp) return; // Če je že v teku, ne dovoli nove zahteve
    setLoading(true);
    canSignUp = false; // Zaklenemo možnost klika
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error)
      toaster.create({
        title: "Error",
        description: "No user with this email was found!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    else
      toaster.create({
        title: "Success",
        description: "Check your email for a confirmation link!",
        type: "success",
        duration: 6000,
        isClosable: true,
      });
    setTimeout(() => (canSignUp = true), 10000); // Pocakaj 10 sekund
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error)
      toaster.create({
        title: "Error",
        description: "Missing email or password!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
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
      <Toaster />{" "}
      <VStack spacing={4}>
        <Heading mt={4} size="4xl" color="white">
          Welcome to our To-Do app! <br /> Sign in and stay organized ✅
        </Heading>
        <Image
          mt={4}
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
          w={{ base: "80%", md: "30%", lg: "20%" }}
          mt={4}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Input
          borderRadius="md"
          borderColor="orange.500"
          color="white"
          _placeholder={{ color: "grey" }}
          borderWidth="2px"
          size="lg"
          w={{ base: "80%", md: "30%", lg: "20%" }}
          mt={2}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
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
            {loading ? "Logging in..." : "Login"}
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
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </HStack>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
}
