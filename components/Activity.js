import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function Activity() {
    return(
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
})