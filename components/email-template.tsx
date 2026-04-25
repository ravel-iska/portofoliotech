import {
    Html, Head, Body, Container, Section,
    Heading, Text, Hr, Preview
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    senderName: string;
    senderEmail: string;
    message: string;
}

export const ContactEmailTemplate = ({
    senderName = "Visitor",
    senderEmail = "visitor@example.com",
    message = "Hello!",
}: ContactEmailProps) => (
    <Html>
        <Head />
        <Preview>Pesan baru dari {senderName} via Vibe Studio</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={headerSection}>
                    <Heading style={headerTitle}>📨 New Contact Message</Heading>
                    <Text style={headerSub}>From your Vibe Studio portfolio</Text>
                </Section>

                <Section style={contentSection}>
                    <Text style={label}>SENDER</Text>
                    <Text style={value}>{senderName}</Text>

                    <Text style={label}>EMAIL</Text>
                    <Text style={emailValue}>{senderEmail}</Text>

                    <Section style={messageBox}>
                        <Text style={label}>MESSAGE</Text>
                        <Text style={messageText}>{message}</Text>
                    </Section>
                </Section>

                <Hr style={hr} />
                <Text style={footer}>
                    Sent via Vibe Studio Portfolio — {new Date().toLocaleDateString("id-ID")}
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactEmailTemplate;

// Styles
const main = {
    backgroundColor: "#0a0a0a",
    fontFamily: "'Segoe UI', sans-serif",
};

const container = {
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #1a1a1a",
    borderRadius: "16px",
    overflow: "hidden" as const,
};

const headerSection = {
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    padding: "24px 32px",
};

const headerTitle = {
    color: "white",
    margin: "0",
    fontSize: "20px",
};

const headerSub = {
    color: "rgba(255,255,255,0.7)",
    margin: "4px 0 0",
    fontSize: "13px",
};

const contentSection = {
    padding: "32px",
};

const label = {
    color: "#888",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    margin: "0 0 6px",
};

const value = {
    color: "white",
    fontSize: "16px",
    fontWeight: "bold" as const,
    margin: "0 0 20px",
};

const emailValue = {
    color: "#3b82f6",
    fontSize: "14px",
    margin: "0 0 20px",
};

const messageBox = {
    backgroundColor: "#111",
    border: "1px solid #222",
    borderRadius: "12px",
    padding: "20px",
};

const messageText = {
    color: "#ddd",
    fontSize: "14px",
    lineHeight: "1.7",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
};

const hr = {
    borderColor: "#1a1a1a",
    margin: "0",
};

const footer = {
    color: "#555",
    fontSize: "11px",
    textAlign: "center" as const,
    padding: "16px 32px",
};
