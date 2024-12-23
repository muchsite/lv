import React, { SetStateAction, Dispatch, useState, useEffect } from "react";
import "./settingsModal.scss";
import { IEmploye } from "../../Types";
import {
  useGetEmployesQuery,
  useGetSingleEmployQuery,
} from "../../store/api/users";
import { useUpdateUserMutation } from "../../store/api/updateUser";
import close from "../../assets/close.svg";
import logo from "../../assets/logo.svg";
interface ModalProps {
  id: string;
  handleSettingsModal: () => void;
}
const SettingsModal: React.FC<ModalProps> = ({ id, handleSettingsModal }) => {
  const { data: singleUser, refetch } = useGetSingleEmployQuery(id);
  const { data: allUsers } = useGetEmployesQuery();
  const [hrDat, setHrDat] = useState<IEmploye>();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (singleUser) {
      setHrDat(singleUser);
    }
  }, [singleUser]);
  useEffect(() => {
    refetch();
  }, []);
  const hadleSelectSub = (id: string) => {
    setHrDat((prev) => {
      if (!prev) return prev;
      const isSub = prev.sub.includes(id);
      return {
        ...prev,
        sub: isSub ? prev.sub.filter((item) => item !== id) : [...prev.sub, id],
      };
    });
  };

  const handleSave = async () => {
    try {
      if (hrDat) {
        await updateUser({ user: hrDat }).unwrap();
      }
      handleSettingsModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="settings_modal_container">
      <div className="settings_modal_content">
        <div className="settings_modal_top">
          <img src={logo} alt="Logo" className="settings_modal_logo" />
          <img
            src={close}
            alt="Close"
            className="close_settings_modal"
            onClick={() => handleSettingsModal()}
          />
        </div>
        <div className="settings_modal_items">
          {allUsers?.map((item) => (
            <div
              className={`settings_modal_item ${
                hrDat?.sub.includes(item.id) && "sub_user"
              }`}
              onClick={() => hadleSelectSub(item.id)}
              key={item.id}
            >
              <img src={item.user_avatar} alt="" />
              <p>{item.email}</p>
            </div>
          ))}
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
      <div
        className="settings_background"
        onClick={() => handleSettingsModal()}
      ></div>
    </div>
  );
};

export default SettingsModal;
