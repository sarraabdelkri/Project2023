import React from "react";
import ChatGpt from "@/components/chat/chat";
import { AppLayout } from "@/widgets/layout";
export function Chat() {

    return (
        <>
            <AppLayout>
                <AppLayout.Header>Ask Anything</AppLayout.Header>
                <AppLayout.Content>
                    <ChatGpt />
                </AppLayout.Content>
            </AppLayout>
        </>
    );
}

export default Chat;
