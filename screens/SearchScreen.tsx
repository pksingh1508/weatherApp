import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

function SearchScreen({ navigation }: { navigation: any }) {
    const [inputValue, setInputValue] = useState('');

    function handleInputChange(text: string) {
        setInputValue(text);
    }
    function handleSubmitting() {
        navigation.navigate('Home', { inputValue: inputValue });
        setInputValue('');
    }
    return (
        <View style={styles.mainContainer}>
            <View style={{ marginTop: 5, paddingHorizontal: 5 }}>
                <TextInput
                    placeholder="  &#x1F50D; Search for a city or airport"
                    cursorColor={'white'}
                    placeholderTextColor={'#ccc'}
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    onSubmitEditing={handleSubmitting}
                    returnKeyType="done"
                />
            </View>
        </View>
    )
}
export default SearchScreen;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 9
    },
    input: {
        color: 'white',
        fontSize: 17,
        paddingHorizontal: 8,
        backgroundColor: '#1C1B33',
        borderRadius: 6,
        paddingVertical: 9,
        alignItems: 'center',
        justifyContent: 'center'
    }
})