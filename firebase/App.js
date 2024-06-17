
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button,TextInput} from 'react-native';
import { db } from './firebaseConfig';
import { collection, getDocs,addDoc, updateDoc  } from 'firebase/firestore';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Notes'));
        const notesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes(notesList);
      } catch (error) {
        console.error("Error fetching notes: ", error);
      }
    };

    fetchNotes();
  }, []);

  const handleEditNote = (id, title, content) => {
    setEditNoteId(id);  // Set the ID of the note to edit
    setNewNoteTitle(title);  // Set the title of the note to current value
    setNewNoteContent(content);  // Set the content of the note to current value
  };
  const handleUpdateNote = async () => {
    try {
      // Update the note in Firestore
      await updateDoc(doc(db, 'Notes', editNoteId), {
        title: newNoteTitle,
        content: newNoteContent,
      });
  
      // Update local state to reflect the updated note
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === editNoteId ? { ...note, title: newNoteTitle, content: newNoteContent } : note
        )
      );
  
      // Clear input fields and reset edit mode
      setEditNoteId(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      console.error('Error updating note: ', error);
    }
  };


  const handleAddNote = async () => {
    try {
      // Add a new note to Firestore
      const docRef = await addDoc(collection(db, 'Notes'), {
        title: newNoteTitle,
        content: newNoteContent,
      });

      // Update local state to include the new note
      setNotes(prevNotes => [
        ...prevNotes,
        { id: docRef.id, title: newNoteTitle, content: newNoteContent }
      ]);

      // Clear input fields
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      console.error('Error adding note: ', error);
    }
  };


  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={newNoteTitle}
        onChangeText={text => setNewNoteTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter note content"
        value={newNoteContent}
        onChangeText={text => setNewNoteContent(text)}
        multiline
      />
      <Button
        title="Add Note"
        onPress={handleAddNote}
      />
      {/* Input fields for editing note */}
      {editNoteId !== null && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter note title"
            value={newNoteTitle}
            onChangeText={text => setNewNoteTitle(text)}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter note content"
            value={newNoteContent}
            onChangeText={text => setNewNoteContent(text)}
            multiline
          />
          <Button
            title="Update Note"
            onPress={handleUpdateNote}
          />
        </>
      )}


      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.content}</Text>
            <Button
              title="Edit"
              onPress={() => handleEditNote(item.id, item.title, item.content)}
            />

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
