import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    Switch,
    StyleSheet,
} from 'react-native'
import * as LOCAL from '../model/API/SQLite'


export default function ToDoListItem(props) {

  const { item} = props;

    // const time = dateTime.substring(10);
    // const date = dateTime.substring(0, 10);

    // Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) LOCAL.Using(item.id, console.log)
    else LOCAL.Cancel(item.id, console.log)
  }
	
  useEffect(()=>{
    console.log(item.on)
    setIsEnabled(item.on == 1)
  }, []);

    return (
        <View style={styles.item}>
        <View style={styles.todo}>
          { item.name.length < 22 ? 
            <Text style={styles.title}>{ item.name }</Text>:
            <Text style={styles.title}>{ item.name.substring(0, 20) }...</Text>
          }
          {/* <Text style={styles.timeStart}>{time} | { date }</Text> */}
        </View>
        <View style={styles.status}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        </View>
      </View>
    );
}


const styles = StyleSheet.create({ 
    item: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#E5E5E5',
        height: 100,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
      },

      todo: {
        flex: 3,
      },
      status: {
        flex: 1,
      },
      title: {
        fontSize: 17,
      },
      timeStart: {
        paddingTop: 15,
      }
})