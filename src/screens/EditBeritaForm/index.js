import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { fontType, colors } from "../../assets/theme";
import axios from 'axios';

const EditBeritaForm = ({ route }) => {
    const { blogId } = route.params;

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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getBlogById();
    }, [blogId]);

    const getBlogById = async () => {
        try {
            const response = await axios.get(
                `https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita/${blogId}`,
            );
            setBlogData({
                title: response.data.title,
                content: response.data.description,
            })
            setImage(response.data.image)
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios
                .put(`https://6567ff2e9927836bd973fa98.mockapi.io/sitarika/Berita/${blogId}`, {
                    title: blogData.title,
                    image,
                    createdAt: new Date(),
                    description: blogData.content,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(false);
            navigation.navigate('Berita');
        } catch (e) {
            console.log(e);
        }
    };
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
                <View style={[textInput.borderDashed]}>
                    <TextInput
                        placeholder="Upload Gambar"
                        value={image}
                        onChangeText={(text) => setImage(text)}
                        placeholderTextColor={colors.grey(0.6)}
                        style={textInput.content}
                    />
                </View>

            </ScrollView>
            <View style={styles.bottomBar}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color={'blue'} />
                    </View>
                )}
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonLabel}>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditBeritaForm;

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