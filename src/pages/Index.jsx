import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Stack, Text, useDisclosure, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onDelete }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Stack direction="row" justifyContent="space-between">
        <Text mt={4}>{note.content}</Text>
        <IconButton icon={<FaTrash />} isRound="true" size="sm" alignSelf="flex-start" onClick={() => onDelete(note.id)} />
      </Stack>
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = React.useRef();

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), content: input }]);
    setInput("");
    onClose(); // Close the input if it was in a modal or similar
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.md" pt={5}>
      <VStack spacing={8}>
        <Flex justifyContent="space-between" width="100%">
          <Heading>Notes</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
            Add Note
          </Button>
        </Flex>
        {isOpen && (
          <Flex width="100%">
            <Input
              ref={inputRef}
              placeholder="Type your note here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && input) {
                  addNote();
                }
              }}
            />
          </Flex>
        )}
        <Wrap spacing="30px" justify="center">
          {notes.map((note) => (
            <WrapItem key={note.id}>
              <NoteCard note={note} onDelete={deleteNote} />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Container>
  );
};

export default Index;
