'use client';
import React, { useState } from 'react';
import styles from './ChatBot.module.css';

const Chat = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]); // כאן נשמור את כל הדיאלוג
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
             const response = await fetch('/api/ChatBot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: input,
                    history: messages 
                })
            });


            const data = await response.json();

            setMessages([...newMessages, { role: "assistant", content: data.reply }]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.messageRow} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
                        <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && <p>ה-AI חושב...</p>}
            </div>
            
            <div className={styles.inputRow}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className={styles.chatInput}
                    placeholder="הקלד הודעה..."
                />
                <button onClick={sendMessage} disabled={isLoading} className={styles.sendButton}>
                    שלח
                </button>
            </div>
        </div>
    );
};

export default Chat;