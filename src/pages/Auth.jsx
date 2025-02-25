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
  const [mode, setMode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let canSignUp = true; //prepreči spam mailov
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  const validateEmail = () => {
    if (email && !isValidEmail(email)) {
      toaster.create({
        title: "Error",
        description: "Invalid email!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };
  const validatePasswordMatch = () => {
    if (mode === "register" && password !== confirmPassword) {
      toaster.create({
        title: "Error",
        description: "Passwords do not match!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };
  //*HANDLESIGNUP FUNKCIJA
  const handleSignUp = async () => {
    if (!canSignUp) return; // Če je že v teku, ne dovoli nove zahteve
    if (!validateEmail() || !validatePasswordMatch()) return; // Preprečuje poskus registracije z neveljavnimi podatki
    setLoading(true);
    canSignUp = false;
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toaster.create({
        title: "Error",
        description: error.message, // Prikaže pravo Supabase napako
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Check your email for a confirmation link!",
        type: "success",
        duration: 6000,
        isClosable: true,
      });
      setMode("");
    }

    setTimeout(() => (canSignUp = true), 10000);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  };
  //*HANDLELOGIN FUNKCIJA
  const handleLogin = async () => {
    // Preveri samo, če je email veljaven, če je vnesen
    if (email && !isValidEmail(email)) {
      toaster.create({
        title: "Error",
        description: "Invalid email!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Preveri, če sta email in geslo sploh vnesena
    if (!email || !password) {
      toaster.create({
        title: "Error",
        description: "Email and password are required!",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("Napaka pri prijavi:", error.message);
        toaster.create({
          title: "Error",
          description: error.message || "Login failed!",
          type: "error",
          duration: 3000,
          isClosable: true,
        });
        setError(error.message);
      } else {
        console.log("Uspešna prijava:", data.user);
        if (onLogin) onLogin(data.user);
      }
    } catch (err) {
      console.error("Nepričakovana napaka:", err);
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  //*HANDLERESET FUNKCIJA
  const handleReset = () => {
    setMode("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
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
        {/* Polja za vnos se prikažejo samo, če je izbran mode */}
        {mode === "login" && (
          <>
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
                onClick={handleReset}
                disabled={loading}
              >
                Back
              </Button>
            </HStack>
          </>
        )}
        {/* REGISTER MODE */}
        {mode === "register" && (
          <>
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
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={handleSignUp}
                isLoading={loading}
              >
                {loading ? "Signing Up..." : "Register"}
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
                onClick={handleReset}
                disabled={loading}
              >
                Back
              </Button>
            </HStack>
          </>
        )}
        {/* Prikaz glavnih gumbov samo, če ni izbran mode */}
        {mode === "" && (
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
              onClick={() => setMode("login")}
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
              onClick={() => setMode("register")}
              isLoading={loading}
            >
              Register
            </Button>
          </HStack>
        )}
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
}
