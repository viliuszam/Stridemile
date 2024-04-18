import { getUser } from "./User"

const ApplyNicknameEmoji = () => {
    const nickname = getUser().username;
    const userEmoji = getUser().emoji;
    if(getUser().emoji !== ""){
        return userEmoji + nickname + userEmoji;
    }

    return nickname;
}


export { ApplyNicknameEmoji };