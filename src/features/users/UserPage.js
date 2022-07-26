import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import { selectUserById, updateProfile } from "./usersSlice";

import "./UserPage.css";

export const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, userId));

    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [nickname, setNickname] = useState(user.nickname);

    const [isVisibleEditForm, setIsVisibleEditForm] = useState(false);

    const dispatch = useDispatch();

    const updateUser = () => {
        if (firstname && lastname && nickname) {
            dispatch(updateProfile({
                id: user.id,
                firstname,
                lastname,
                nickname
            }));
        }
        setIsVisibleEditForm(false);
    };

    return (
        <div className={classNames("profile__container", "text_regular")}>
            <img src="/profile.png" alt="My Profile" />
            {!isVisibleEditForm
                ?   <div>
                        <h2>{user.firstname} {user.lastname}</h2>
                        <p>{user.nickname}</p>
                        <button onClick={() => { setIsVisibleEditForm(true) }}>
                            <span className="text_regular">Edit Profile</span>
                        </button>
                    </div>
                :   <div>
                        <div>
                            <label htmlFor="firstname">Firstname: </label>
                            <input
                                type="text"
                                id="firstname"
                                value={firstname}
                                onChange={event => { setFirstname(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="lastname">Lastname: </label>
                            <input
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={event => { setLastname(event.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="nickname">Nickname: </label>
                            <input
                                type="text"
                                id="nickname"
                                value={nickname}
                                onChange={event => { setNickname(event.target.value) }} />
                        </div>
                        <button onClick={updateUser}>
                            <span className="text_regular">Save Changes</span>
                        </button>
                    </div>
            }
        </div>
    )
}