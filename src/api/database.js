import { firebase } from "./firebase";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";

const db = getDatabase(firebase);

export const getAllChatsFb = async () => {
    return new Promise((resolve, rejected) => {
        get(child(ref(db), "chats"))
            .then((snapshots) => {
                const chats = [];
                snapshots.forEach(snapshot => {
                    chats.push(snapshot.val());
                });
                
                resolve(chats);
            })
            .catch((error) => { rejected(error) })
    })
};

export const setChatFb = async (chat) => {
    return new Promise((resolve, rejected) => {
        set(ref(db, 'chats/' + chat.id), { ...chat })
            .then(() => { resolve() })
            .catch((error) => { rejected(error) })
    })
};

export const deleteChatFb = async (chatId) => {
    return new Promise((resolve, rejected) => {
        remove(ref(db, 'chats/' + chatId))
            .then(() => { resolve() })
            .catch((error) => { rejected(error) })
    })
};

export const getAllMessagesFb = async (chatId) => {
    return new Promise((resolve, rejected) => {
        get(child(ref(db), "messages/" + chatId))
            .then((snapshots) => {
                const messages = [];
                snapshots.forEach(snapshot => {
                    messages.push(snapshot.val());
                });
                
                resolve(messages);
            })
            .catch((error) => { rejected(error) })
    })
};

export const setMessageFb = async (message) => {
    return new Promise((resolve, rejected) => {
        set(ref(db, `messages/${message.chat}/${message.id}`), { ...message })
            .then(() => { resolve() })
            .catch((error) => { rejected(error) })
    })
}

export const deleteMessageFb = async (chatId, messageId) => {
    return new Promise((resolve, rejected) => {
        remove(ref(db, `messages/${chatId}/${messageId}`))
            .then(() => { resolve() })    
            .catch((error) => { rejected(error) })
    })
};

export const getAllProfilesFb = async () => {
    return new Promise((resolve, rejected) => {
        get(child(ref(db), "profiles"))
            .then((snapshots) => {
                const profiles = {};
                snapshots.forEach(snapshot => {
                    const profile = snapshot.val();
                    if (profile) { profiles[profile.id] = profile };
                });
                
                resolve(profiles);
            })
            .catch((error) => { rejected(error) })
    })
};

export const setProfileFb = async (profile) => {
    return new Promise((resolve, rejected) => {
        set(ref(db, 'profiles/' + profile.id), { ...profile })
            .then(() => { resolve() })
            .catch((error) => { rejected(error) })
    })
};