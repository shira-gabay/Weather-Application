import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const InfoComponent = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Animatable.View animation="fadeInUp" duration={1000} style={styles.infoBox}>
                    <Animatable.Text animation="zoomIn" duration={800} style={styles.title}>מידע נוסף</Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={1200} style={styles.description}>
                        אפליקציית מזג האוויר מספקת עדכונים בזמן אמת על מזג האוויר לכל עיר ברחבי העולם.
                    </Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={1400} style={styles.description}>תכונות כוללות:</Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={1600} style={styles.bulletPoint}>• טמפרטורה נוכחית ותנאי מזג האוויר</Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={1800} style={styles.bulletPoint}>• תחזיות מזג האוויר לימים הקרובים</Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={2000} style={styles.bulletPoint}>• ממשק ידידותי למשתמש עם תמיכה במצב כהה</Animatable.Text>
                    <Animatable.Text animation="fadeIn" duration={2200} style={styles.description}>
                        פשוט הכנס את שם העיר, ותקבל את המידע העדכני ביותר על מזג האוויר!
                    </Animatable.Text>
                    <Animatable.View animation="pulse" iterationCount="infinite">
                        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>חזרה לעמוד הקודם</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </Animatable.View>
            </ScrollView>
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
    infoBox: {
        backgroundColor: '#FFFAFA',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF4500',
        marginVertical: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginVertical: 5,
    },
    bulletPoint: {
        fontSize: 16,
        color: '#333',
        marginVertical: 2,
        textAlign: 'left',
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#FF4500',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default InfoComponent;
