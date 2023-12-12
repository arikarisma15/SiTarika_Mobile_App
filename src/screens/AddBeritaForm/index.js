import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { ArrowLeft, Add, AddSquare } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../../assets/theme";
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from "react-native-fast-image";

const AddBeritaForm = () => {

    const [loading, setLoading] = useState(false);
    const handleImagePick = async () => {
        ImagePicker.openPicker({
            width: 1920,
            height: 1080,
            cropping: true,
        })
            .then(image => {
                console.log(image);
                setImage(image.path);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handleUpload = async () => {
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`beritaimages/${filename}`);

        setLoading(true);
        try {
            await reference.putFile(image);
            const url = await reference.getDownloadURL();
            await firestore().collection('berita').add({
                title: blogData.title,
                image: url,
                createdAt: new Date(),
                description: blogData.content,
                uploadBy: 'Admin',
            });
            setLoading(false);
            console.log('Blog added!');
            navigation.navigate('Berita');
        } catch (error) {
            console.log(error);
        }
    };
    // const handleUpload = async () => {
    //     setLoading(true);
    //     try {
    //         await axios.post('https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita', {
    //             title: blogData.title,
    //             image,
    //             createdAt: new Date(),
    //             description: blogData.content,
    //         })
    //             .then(function (response) {
    //                 console.log(response);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //         setLoading(false);
    //         navigation.navigate('Berita');
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
    });

    const handleChange = (key, value) => {
        setBlogData({
            ...blogData,
            [key]: value,
        });
    };
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft color={colors.black()} variant="Linear" size={24} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.title}>Tambah Berita </Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingVertical: 10,
                    gap: 10,
                }}
            >
                <View style={textInput.borderDashed}>
                    <TextInput
                        placeholder="Masukkan Judul Berita"
                        value={blogData.title}
                        onChangeText={(text) => handleChange("title", text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={textInput.title}
                    />
                </View>
                <View style={[textInput.borderDashed, { minHeight: 250 }]}>
                    <TextInput
                        placeholder="Masukkan Detail Berita"
                        value={blogData.content}
                        onChangeText={(text) => handleChange("content", text)}
                        placeholderTextColor={colors.grey(0.6)}
                        multiline
                        style={textInput.content}
                    />
                </View>
                {image ? (
                    <View style={{ position: 'relative' }}>
                        <FastImage
                            style={{ width: '100%', height: 127, borderRadius: 5 }}
                            source={{
                                uri: image,
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                backgroundColor: colors.blue(),
                                borderRadius: 25,
                            }}
                            onPress={() => setImage(null)}>
                            <Add
                                size={20}
                                variant="Linear"
                                color={colors.white()}
                                style={{ transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleImagePick}>
                        <View
                            style={[
                                textInput.borderDashed,
                                {
                                    gap: 10,
                                    paddingVertical: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                            ]}>
                            <AddSquare color={colors.grey(0.6)} variant="Linear" size={42} />
                            <Text
                                style={{
                                    fontFamily: fontType['Pjs-Regular'],
                                    fontSize: 12,
                                    color: colors.grey(0.6),
                                }}>
                                Upload Thumbnail
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
            <View style={styles.bottomBar}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={colors.blue()} />
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={handleUpload}>
                    <Text style={styles.buttonLabel}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddBeritaForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white(),
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.black(0.4),
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        height: 52,
        elevation: 8,
        paddingTop: 8,
        paddingBottom: 4,
    },
    title: {
        fontFamily: fontType["Pjs-Bold"],
        fontSize: 16,
        color: colors.black(),
    },
    bottomBar: {
        backgroundColor: colors.white(),
        alignItems: "flex-end",
        paddingHorizontal: 24,
        paddingVertical: 10,
        shadowColor: colors.black(),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FA6512',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonLabel: {
        fontSize: 14,
        fontFamily: fontType["Pjs-SemiBold"],
        color: colors.white(),
    },
});
const textInput = StyleSheet.create({
    borderDashed: {
        borderStyle: "dashed",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: colors.grey(0.4),
    },
    title: {
        fontSize: 16,
        fontFamily: fontType["Pjs-SemiBold"],
        color: colors.black(),
        padding: 0,
    },
    content: {
        fontSize: 12,
        fontFamily: fontType["Pjs-Regular"],
        color: colors.black(),
        padding: 0,
    },
});
const category = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: fontType["Pjs-Regular"],
        color: colors.grey(0.6),
    },
    container: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    item: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 25,
    },
    name: {
        fontSize: 10,
        fontFamily: fontType["Pjs-Medium"],
    },
});