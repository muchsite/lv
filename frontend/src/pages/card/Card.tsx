import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import copyImage from "../../assets/copy.svg";
import editImage from "../../assets/pen.svg";
import caseImage from "../../assets/case.svg";
import building from "../../assets/building.svg";
import room from "../../assets/room.svg";
import desk from "../../assets/hash.svg";
import date from "../../assets/date.svg";
import manager from "../../assets/p.svg";
import mobile from "../../assets/cardPhone.svg";
import email from "../../assets/email.svg";
import skype from "../../assets/skype.svg";
import globe from "../../assets/globe.svg";
import visa from "../../assets/visa.svg";
import visaC from "../../assets/visaC.svg";
import success from "../../assets/success.svg";
import notFound from "../../assets/notFound.svg";
import "./card.scss";
import CardModal from "./CardModal";
import Loading from "../../components/loading/Loading";
import { useGetSingleEmployQuery } from "../../store/api/users";
import { IEmploye } from "../../Types";
import { Helmet } from "react-helmet-async";
const Card: React.FC = () => {
  const { id } = useParams();
  const {
    data: cardsData,
    isLoading,
    isError,
    error: userError,
  } = useGetSingleEmployQuery(id || "");
  const logedInId =
    localStorage.getItem("user") || sessionStorage.getItem("user") || "";
  const { data: cardsDataLoged } = useGetSingleEmployQuery(logedInId);
  const [cardModal, setCardModal] = useState(false);
  const [card, setCard] = useState<IEmploye>();
  const [logedIn, setLogedIn] = useState<IEmploye>();

  useEffect(() => {
    if (cardsData) {
      setCard(cardsData);
      setLogedIn(cardsDataLoged);
    }
  }, [isLoading, isError, id]);
  const formatDate = (timestamp: number | undefined): string => {
    if (timestamp === undefined) {
      return "Invalid date";
    }
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const formatBirthDate = (
    day: number | undefined,
    month: number | undefined,
    year: number | undefined
  ) => {
    if (day && month && year) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const d = day.toString().padStart(2, "0");
      const m = months[month - 1];
      return `${d} ${m} ${year}`;
    }
  };
  const handleCardModal = () => {
    setCardModal(!cardModal);
    if (cardModal) {
      document.body.classList.remove("no_scroll");
    } else {
      document.body.classList.add("no_scroll");
    }
  };
  const [coppyLink, setCoppyLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      const link = window.location.href;
      await navigator.clipboard.writeText(link);
      setCoppyLink(true);
    } catch (error) {
      console.log(error);
    }
  };
  const err = userError as { data: string };
  return (
    <>
      <Helmet>
        <title>{`${card?.first_name}  ${card?.last_name}`}</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        err?.data == "User is not logged in" ? (
          <Navigate to="/login" />
        ) : (
          <img src={notFound} alt="Not Found Image" />
        )
      ) : (
        <>
          {card && cardModal && (
            <CardModal
              card={card}
              handleCardModal={handleCardModal}
              setCard={setCard}
            />
          )}
          <div className="card_container">
            <div className="card_content_container">
              <div className="card_left">
                <div className="card_image_container">
                  <img
                    src={card?.user_avatar}
                    alt="Avatar"
                    className="card_avatar"
                  />
                  {card?.isRemoteWork ? (
                    <img
                      src="/assets/homeW.svg"
                      alt="Home icon"
                      className="remote_image"
                    />
                  ) : (
                    <img
                      src="/assets/office.svg"
                      alt="Office icon"
                      className="remote_image"
                    />
                  )}
                </div>
                <h3 className="card_name">
                  {card?.first_name} {card?.last_name}
                </h3>
                <p className="card_full_name">
                  {card?.first_name} {card?.middle_native_name}{" "}
                  {card?.last_name}
                </p>
                <div className="coppy_link" onClick={handleCopyLink}>
                  {!coppyLink ? (
                    <>
                      <img src={copyImage} alt="Coppy" className="copy_image" />
                      <p>Copy Link</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={success}
                        className="copied_image"
                        alt="copied_image"
                      />
                      <p>Copied</p>
                    </>
                  )}
                </div>
                {logedIn?.role == "admin" ? (
                  <div className="edit_btn" onClick={() => handleCardModal()}>
                    <img src={editImage} alt="Edit" />
                    <p>EDIT</p>
                  </div>
                ) : (
                  logedIn?.role == "hr" &&
                  logedIn.sub.includes(id || "") && (
                    <div className="edit_btn" onClick={() => handleCardModal()}>
                      <img src={editImage} alt="Edit" />
                      <p>EDIT</p>
                    </div>
                  )
                )}
              </div>
              <div className="card_right">
                <div className="card_rigth_item">
                  <h3>General Info</h3>
                  <div className="card_right_info">
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={caseImage} alt="Department" />
                        <p>Department</p>
                      </div>
                      <p>{card?.department}</p>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={building} alt="Building" />
                        <p>Building</p>
                      </div>
                      <p>{card?.building}</p>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={room} alt="Room" />
                        <p>Room</p>
                      </div>
                      <p>{card?.room}</p>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={desk} alt="Desk" />
                        <p>Desk Number</p>
                      </div>
                      <p>{card?.desk_number}</p>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={date} alt="Date of birth" />
                        <p>Date of birth</p>
                      </div>
                      <p>
                        {formatBirthDate(
                          card?.date_birth.day,
                          card?.date_birth.month,
                          card?.date_birth.year
                        )}
                      </p>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={manager} alt="Manager" />
                        <p>Manager</p>
                      </div>
                      <p className="card_link">
                        {card?.manager.first_name} {card?.manager.last_name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card_rigth_item">
                  <h3>CONTACTS</h3>
                  <div className="card_right_info">
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={mobile} alt="Mobile" />
                        <p>Mobile Phone</p>
                      </div>
                      <a href={`tel:${card?.phone}`} className="card_link">
                        {card?.phone}
                      </a>
                    </div>

                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={email} alt="Email" />
                        <p>Email</p>
                      </div>
                      <a href={`mailto:${card?.email}`} className="card_link">
                        {card?.email}
                      </a>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={skype} alt="Skype" />
                        <p>Skype</p>
                      </div>
                      <a href={`skype:${card?.skype}`} className="card_link">
                        {card?.skype}
                      </a>
                    </div>
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={desk} alt="-Number" />
                        <p>C-Number</p>
                      </div>
                      <p>{card?.cnumber}</p>
                    </div>
                  </div>
                </div>
                <div className="card_rigth_item">
                  <h3>TRAVEL INFO</h3>
                  <div className="card_right_info">
                    <div className="card_info_item">
                      <div className="card_image_container">
                        <img src={globe} alt="Citizenship" />
                        <p>Citizenship</p>
                      </div>
                      <p>{card?.citizenship}</p>
                    </div>
                    {card?.visa.map((item, index) => (
                      <div key={index}>
                        <div
                          className="card_info_item"
                          style={{ marginBottom: "1rem" }}
                        >
                          <div className="card_image_container">
                            <img src={visa} alt="Visa" />
                            <p>Visa 1</p>
                          </div>
                          <p>{item.type}</p>
                        </div>
                        <div className="card_info_item">
                          <div className="card_image_container">
                            <img src={visaC} alt="Visa" />
                            <p>Visa 1 validity period</p>
                          </div>
                          <p>
                            {formatDate(item.start_date)} -
                            {formatDate(item.end_date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
