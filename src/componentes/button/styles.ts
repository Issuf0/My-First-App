import { StyleSheet } from "react-native";
import { normalize, vh } from "../../utils/responsive";

export const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: vh(7),
        backgroundColor: "#E15610",
        borderRadius: normalize(10),
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: normalize(16),
        fontWeight: "bold",
        color: "#FFF",
    },
})