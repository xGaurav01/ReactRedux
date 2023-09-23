import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, update } from '../../todoSlice';


const allTodos =(state)=>{
  return Object.values(state.todo.todos)
}

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text,setText]= useState("");
  const [todoTitle, setTodoTitle] = useState('');
  const [itemId,setItemId]= useState()
  const dispatch = useDispatch();

  const title = useSelector(allTodos);
  console.log({title},"title")
  const id=Math.floor(Math.random() * 100);
  console.log(title,"title")
  
  const addFunction =()=>{
    dispatch(add({title:text,id:id}))
    setText("")
  }
  
  const updateData =(text,id)=>{
    dispatch(update({title:text,id:id}))
    setModalVisible(!modalVisible)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setText(e)}
        value={text}
      />

      {/* //Modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Todo!</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={e => setTodoTitle(e)}
              value={todoTitle}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={()=>updateData(todoTitle,itemId)}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={addFunction}>
        <Icon name="add-circle" color="#000" size={40} />
      </TouchableOpacity>

      <View style={styles.listView}>
        <FlatList
          data={title}
          renderItem={({item, index}) => {
            return (
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <Text style={styles.listItem}> {item.title}</Text>

                <TouchableOpacity
                  style={{alignSelf: 'center', marginLeft: 5}}
                  onPress={() => {setModalVisible(!modalVisible), setItemId(item.id)}}>
                  <FontAwesome5 name="edit" color="#000" size={25} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => dispatch(remove(item.id))}>
                  <MaterialCommunityIcons
                    name="delete"
                    color="#000"
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 35,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addButton: {
    alignSelf: 'center',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%',
  },
  listItem: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    paddingTop: 5,
    color: 'white',
    backgroundColor: 'red',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  modalInput: {
    height: 40,
    width:'60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '40%',
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop:15,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});