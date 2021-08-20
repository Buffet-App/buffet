import React, {useState} from "react";
import {StyleSheet, Text, View, Button, TextInput,
    TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback} from "react-native";
import {Form, Formik} from "formik";
import {globalStyles} from "../config/globalStyles";
import colors from "../config/colors";

export default function LoginScreen() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Formik
                    initialValues={
                        {
                            email: '',
                            password: '',
                        }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {(formikProps) => (
                        <View style={styles.formContainer}>
                            <Image
                                style={styles.image__logo}
                                source={require("../assets/buffet-logo-vertical.png")}
                            />

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={formikProps.handleChange('email')}
                                    value={formikProps.values.email}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Password"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={formikProps.handleChange('password')}
                                    value={formikProps.values.password}
                                    secureTextEntry={true}
                                />
                            </View>

                            <TouchableOpacity onPress={() => {console.log('Trouble with sign in')}}>
                                <Text style={styles.trouble}>Having trouble logging in?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[globalStyles.loginButton, {marginTop: 40, backgroundColor: colors.secondary}]}
                                onPress={formikProps.handleSubmit}
                            >
                                <Text style={[styles.text, {color: colors.white}]}>Log In</Text>
                            </TouchableOpacity>

                            {/*<TouchableOpacity style={styles.signupButton}>*/}
                            {/*    <Text>SIGN UP</Text>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                    )}

                </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: colors.white,
        borderRadius: 30,
        width: 250,
        height: 45,
        marginBottom: 20,
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    signupButton: {
        width: 300,
        borderRadius: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: colors.primary,
    },
    image__logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    trouble: {
        color: colors.text,
    }
})
