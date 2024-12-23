import React, { SetStateAction, Dispatch, useState, FormEvent } from "react";
import "./cardModal.scss";
import { useUpdateUserMutation } from "../../store/api/updateUser";
import { IEmploye } from "../../Types";
import close from "../../assets/close.svg";
import logo from "../../assets/logo.svg";
interface CardProps {
  handleCardModal: () => void;
  setCard: Dispatch<SetStateAction<IEmploye | undefined>>;
  card: IEmploye;
}
const CardModal: React.FC<CardProps> = ({ card, handleCardModal, setCard }) => {
  const [first_name, setfirst_name] = useState(card?.first_name || "");
  const [last_name, setlast_name] = useState(card?.last_name || "");
  const [middle_native_name, setmiddle_native_name] = useState(
    card?.middle_native_name || ""
  );
  const [department, setDepartment] = useState(card?.department || "");
  const [building, setBuilding] = useState(card?.building || "");
  const [room, setRoom] = useState(card?.room || "");
  const [desk_number, setdesk_number] = useState<number>(card?.desk_number);
  const [birthYear, setBirthYear] = useState<number>(card?.date_birth?.year);
  const [birthMonth, setBirthMonth] = useState<number>(card?.date_birth?.month);
  const [birthDay, setBirthDay] = useState<number>(card?.date_birth?.day);
  const [managerFirstName, setManagerFirstName] = useState(
    card?.manager?.first_name || ""
  );
  const [managerLastName, setManagerLastName] = useState(
    card?.manager?.last_name || ""
  );
  const [phone, setPhone] = useState(card?.phone || "");
  const [email, setEmail] = useState(card?.email || "");
  const [skype, setSkype] = useState(card?.skype || "");
  const [cnumber, setCnumber] = useState(card?.cnumber || "");
  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const manager = card.manager;
    let newCard = {
      ...card,
      first_name,
      last_name,
      middle_native_name,
      department,
      building,
      room,
      desk_number,
      phone,
      email,
      skype,
      cnumber,
      manager: {
        ...manager,
        first_name: managerFirstName,
        last_name: managerLastName,
      },
      managerFirstName,
      managerLastName,
      date_birth: {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
      },
    };

    try {
      await updateUser({ user: newCard }).unwrap();
      setCard(newCard);
      handleCardModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    handleCardModal();
  };
  const handleYear = (e: number) => {
    if (e > 0) {
      setBirthYear(e);
    }
  };
  const handleMonth = (e: number) => {
    if (e > 0 && e <= 12) {
      setBirthMonth(e);
    }
  };
  const handleDay = (e: number) => {
    if (e > 0 && e <= 31) {
      setBirthDay(e);
    }
  };
  return (
    <div className="updat_form_container">
      <form id="update_form" onSubmit={handleSubmit}>
        <div className="card_modal_top">
          <img src={logo} alt="Logo" className="card_modal_logo" />
          <img
            src={close}
            alt="Close"
            className="close_card_modal"
            onClick={() => handleCardModal()}
          />
        </div>
        <div className="update_iputs_container">
          <div className="update_form_input">
            <label>First Name</label>
            <input
              type="text"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Middle Name</label>
            <input
              type="text"
              value={middle_native_name}
              onChange={(e) => setmiddle_native_name(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Building</label>
            <input
              type="text"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Room</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Desk Number</label>
            <input
              type="number"
              value={desk_number}
              onChange={(e) => setdesk_number(Number(e.target.value))}
            />
          </div>
          <div className="update_form_input">
            <label>Birth Year</label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => handleYear(Number(e.target.value))}
            />
          </div>
          <div className="update_form_input">
            <label>Birth Month</label>
            <input
              type="number"
              value={birthMonth}
              onChange={(e) => handleMonth(Number(e.target.value))}
            />
          </div>
          <div className="update_form_input">
            <label>Birth Day</label>
            <input
              type="number"
              value={birthDay}
              onChange={(e) => handleDay(Number(e.target.value))}
            />
          </div>
          <div className="update_form_input">
            <label>Manager First Name</label>
            <input
              type="text"
              value={managerFirstName}
              onChange={(e) => setManagerFirstName(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Manager Last Name</label>
            <input
              type="text"
              value={managerLastName}
              onChange={(e) => setManagerLastName(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Skype</label>
            <input
              type="text"
              value={skype}
              onChange={(e) => setSkype(e.target.value)}
            />
          </div>
          <div className="update_form_input">
            <label>Cnumber</label>
            <input
              type="text"
              value={cnumber}
              onChange={(e) => setCnumber(e.target.value)}
            />
          </div>
        </div>
        <div className="card_modal_btns">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
      <div
        className="card_form_backgound"
        onClick={() => handleCardModal()}
      ></div>
    </div>
  );
};

export default CardModal;
