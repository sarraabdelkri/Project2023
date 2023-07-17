import React, { useState, useEffect } from "react";
import {
    Page,
    Text,
    Image,
    Document,
    StyleSheet,
    View,
} from "@react-pdf/renderer";
import logo from "../../../public/img/logo.png";
import axios from "axios";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    image: {
        marginVertical: 20,
        marginHorizontal: 75,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

const PDFFile = ({ score, assessment, result }) => {
    const [userName, setUserName] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    useEffect(() => {
        axios
            .get(`https://expertise-shaper-37ut.onrender.com/api/user/getUserNameById/${result.userId}`)
            .then((response) => {
                const userName = response.data.userName;
                setUserName(userName);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [result.userId]);

    useEffect(() => {
        axios
            .get(`https://expertise-shaper-37ut.onrender.com/api/user/getUserNameById/${assessment.createdBy}`)
            .then((response) => {
                const createdBy = response.data.userName;
                setCreatedBy(createdBy);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [result.userId]);
    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.body}>
                <View style={{ flexGrow: 1, justifyContent: "center" }}>
                    <Image style={styles.image} src={logo} />
                    <Text style={styles.title}>Certificate of Achievement</Text>
                    <Text style={styles.subtitle}>Presented to:</Text>
                    <Text style={styles.subtitle}>{userName}</Text>
                    <Text style={styles.text}>
                        In recognition of outstanding performance and dedication in{" "}
                        {assessment.name}.
                    </Text>
                    <Text style={styles.subtitle}>With score:</Text>
                    <Text style={styles.subtitle}>{score}</Text>
                    <Text style={styles.signature}>
                        Signed by the Creator of assessment:&nbsp;{createdBy}
                    </Text>
                </View>
                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    );
};

export default PDFFile;
