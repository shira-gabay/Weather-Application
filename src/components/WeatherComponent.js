import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, ActivityIndicator, TextInput, 
    Switch, Image, ScrollView, Animated, SafeAreaView, 
    KeyboardAvoidingView, Alert, Pressable, Modal 
} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

const WeatherComponent = ({ navigation }) => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const [textColor] = useState(new Animated.Value(0)); // ערך אנימציה
    const [modalVisible, setModalVisible] = useState(false);

    const colors = ['#FF4500', '#FFD700', '#1E90FF', '#808080']; // אדום, צהוב, כחול, אפור

    useEffect(() => {
        const colorInterval = setInterval(() => {
            const nextIndex = (Math.round(textColor._value) + 1) % colors.length;
            Animated.timing(textColor, {
                toValue: nextIndex,
                duration: 1000, // משך שינוי צבע
                useNativeDriver: false,
            }).start();
        }, 1000); // שינוי צבע כל שניה

        return () => clearInterval(colorInterval); // ניקוי ה-interval
    }, [textColor]);

    const interpolateColor = textColor.interpolate({
        inputRange: [0, 1, 2, 3],
        outputRange: colors,
    });

    const fetchWeather = async () => {
        if (!city) {
            Alert.alert("שגיאה", "נא להזין שם עיר.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0e3c9e359e1ace35eae6d698aa1cd44&units=metric`);
            setWeather(response.data);
            setModalVisible(true); // הצגת מודל לאחר קבלת נתוני מזג האוויר
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("אופס! העיר לא נמצאה. נסה שוב."); // הודעה מותאמת
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={isEnabled ? styles.darkContainer : styles.container}>
                    <View style={styles.iconContainer}>
                        <Icon name="sunny" size={40} color="#FFD700" />
                        <Icon name="rainy" size={40} color="#1E90FF" />
                        <Icon name="cloud" size={40} color="#B0C4DE" />
                    </View>

                    <Animatable.Text 
                        animation="fadeInDown" 
                        duration={1500} 
                        style={[styles.welcomeText, { color: interpolateColor }]} // צבע משתנה
                    >
                        ברוכים הבאים לאפליקציית מזג אויר
                    </Animatable.Text>

                    <Animatable.View animation="fadeInUp" duration={1500}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter city name"
                            value={city}
                            onChangeText={setCity}
                        />
                    </Animatable.View>

                    <Animatable.View animation="pulse" iterationCount="infinite">
                        <Pressable style={styles.button} onPress={fetchWeather}>
                            <Icon name="cloud" size={20} color="white" />
                            <Text style={styles.buttonText}>Get Weather</Text>
                        </Pressable>
                    </Animatable.View>

                    <Animatable.View animation="pulse" iterationCount="infinite">
                        <Pressable style={styles.button} onPress={() => navigation.navigate('Info')}>
                            <Icon name="information-circle" size={20} color="white" />
                            <Text style={styles.buttonText}>Show Info</Text>
                        </Pressable>
                    </Animatable.View>

                    {loading && <ActivityIndicator size="large" color="#FFD700" />}
                    {error && (
                        <View style={styles.errorContainer}>
                            <Icon name="alert-circle" size={40} color="red" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}
                    {weather && (
                        <Animatable.View animation="fadeIn" duration={2000} style={[styles.weatherInfo, { backgroundColor: isEnabled ? '#444' : '#FFFAFA' }]}>
                            <Text style={[styles.title, { color: isEnabled ? '#FFFFFF' : '#333' }]}>Weather in {weather.name}</Text>
                            <Image
                                style={styles.weatherIcon}
                                source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                            />
                            <Text style={[styles.temp, { color: isEnabled ? '#FFD700' : '#FF4500' }]}>{weather.main.temp}°C</Text>
                            <Text style={[styles.description, { color: isEnabled ? '#CCCCCC' : '#555' }]}>{weather.weather[0].description}</Text>
                        </Animatable.View>
                    )}

                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#FFD700" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    <Text style={{ color: isEnabled ? '#FFD700' : '#333' }}>{isEnabled ? "Dark Mode is ON" : "Dark Mode is OFF"}</Text>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Weather data fetched successfully!</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0FFFF',
        padding: 20,
    },
    darkContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F4F4F',
        padding: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold', // עבה יותר
        textShadowColor: '#000', // צבע הצללה
        textShadowOffset: { width: 1, height: 1 }, // מיקום הצללה
        textShadowRadius: 5, // רדיוס הצללה
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#FF4500',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 15,
        fontSize: 18,
        backgroundColor: '#FFFFFF',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF4500',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        marginLeft: 10,
        fontSize: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    temp: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 20,
    },
    weatherInfo: {
        marginTop: 20,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonClose: {
        backgroundColor: '#FF4500',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WeatherComponent;
