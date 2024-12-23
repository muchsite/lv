import React, { useEffect, useState } from "react";
import search from "../../assets/search.svg";
import "./settings.scss";
import SettingsModal from "./SettingsModal";
import { IEmploye } from "../../Types";
import { useGetEmployesQuery } from "../../store/api/users";
import { useUpdateUserMutation } from "../../store/api/updateUser";
import Loading from "../../components/loading/Loading";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
const Settings: React.FC = () => {
  const [updateUser] = useUpdateUserMutation();
  const handleClick = async (action: string, card: IEmploye) => {
    const newUser = { ...card, role: action };
    try {
      await updateUser({ user: newUser }).unwrap();
      setData((prev) =>
        prev.map((item) => (item.id === newUser.id ? newUser : item))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const { data: allUsers, isLoading, isError } = useGetEmployesQuery();
  const [opeModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<IEmploye[]>([]);
  const userId = localStorage.getItem("user") || sessionStorage.getItem("user");
  useEffect(() => {
    if (allUsers) {
      const admin = allUsers.find((item) => item.id == userId);
      if (admin?.role == "admin") {
        setData(allUsers);
      }
    }
  }, [isLoading]);

  const handleSearch = (e: string) => {
    setSearchInput(e);
    const filteredData = allUsers?.filter(
      (item) =>
        item.first_name?.toLowerCase().includes(e.trim().toLowerCase()) ||
        item.last_name?.toLowerCase().includes(e.trim().toLowerCase())
    );
    setData(filteredData || []);
  };
  const [modalId, setModalId] = useState("");
  const handleOpenModal = (id: string) => {
    setModalId(id);
    handleSettingsModal();
  };
  const handleSettingsModal = () => {
    setOpenModal(!opeModal);
    if (opeModal) {
      document.body.classList.remove("no_scroll");
    } else {
      document.body.classList.add("no_scroll");
    }
  };
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Navigate to="/login" />
      ) : (
        <>
          {opeModal && (
            <SettingsModal
              id={modalId}
              handleSettingsModal={handleSettingsModal}
            />
          )}
          <div className="settings_container">
            <div className="settings_content">
              <h3 className="settings_header">ROLES & PERMISSIONS</h3>
              <div className="setting_top">
                <div className="settings_input">
                  <img src={search} alt="Search" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => handleSearch(e.currentTarget.value)}
                  />
                </div>
                <div className="top_roles">Address book role</div>
                <div className="top_admin">Admin</div>
              </div>
              <div className="settings_items_container">
                {data?.map((item, index) => (
                  <div className="settings_item_container" key={index}>
                    <div className="settings_item_first">
                      <img src={item.user_avatar} alt="Avatar" />
                      <p>
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                    <div className="settings_item_second">
                      <div className="settings_btns_container">
                        <p
                          className={`${item?.role == "user" && "active_role"}`}
                          onClick={() => handleClick("user", item)}
                        >
                          User
                        </p>
                        <div className="settings_border"></div>
                        <p
                          className={`${item?.role == "hr" && "active_role"}`}
                          onClick={() => handleClick("hr", item)}
                        >
                          HR
                        </p>
                      </div>
                      {item.role == "hr" && (
                        <div
                          onClick={() => handleOpenModal(item.id)}
                          className="select_user"
                        >
                          Select user
                        </div>
                      )}
                    </div>
                    <div className="settings_item_third">
                      <p
                        className={`${
                          item?.role == "admin" && "active_role_admin"
                        }`}
                        onClick={() => handleClick("admin", item)}
                      >
                        Admin
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
