import React, { useEffect, useState } from "react";
import searchImg from "../../assets/search.svg";
import gridImg from "../../assets/grid.svg";
import listImg from "../../assets/list.svg";
import caseImg from "../../assets/case.svg";
import phoenImg from "../../assets/cardPhone.svg";
import circleImg from "../../assets/c.svg";
import personImg from "../../assets/p.svg";
import notFound from "../../assets/notFound.svg";
import "./home.scss";
import { Link, Navigate } from "react-router-dom";
import { useGetEmployesQuery } from "../../store/api/users";
import { IEmploye } from "../../Types";
import Loading from "../../components/loading/Loading";
import { Helmet } from "react-helmet-async";

const Home: React.FC = () => {
  const [searchAdvanced, setSearchAdvanced] = useState(false);
  const [displayGrid, setDisplayGrid] = useState("grid");
  const [basicInput, setBasicIput] = useState("");
  const {
    data: allEmployes,
    isLoading,
    isError,
    error,
  } = useGetEmployesQuery();
  const [filteredCardsData, setFilteredCardsData] = useState<IEmploye[]>([]);
  const [buildings, setBuildings] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skype, setSkype] = useState("");
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState("");
  const [department, setDepartment] = useState("");
  useEffect(() => {
    if (!isLoading && !isError && allEmployes) {
      setFilteredCardsData(allEmployes);
      setFilteredCardsData(allEmployes);
      const uBuildings: Set<string> = new Set();
      const uDepartments: Set<string> = new Set();
      allEmployes.forEach((item) => {
        uBuildings.add(item.building);
        uDepartments.add(item.department);
      });
      setBuildings(Array.from(uBuildings));
      setDepartments(Array.from(uDepartments));
    }
  }, [isLoading, isError, allEmployes]);

  const updateState = () => {
    if (!isLoading && !isError && allEmployes) {
      const searchedData = allEmployes.filter(
        (item) =>
          item.first_name.includes(basicInput.trim()) ||
          item.last_name.includes(basicInput.trim()) ||
          item.id.includes(basicInput.trim())
      );
      setFilteredCardsData(searchedData);
    }
  };
  const handleAdvancedSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && !isError && allEmployes) {
      const searchedData = allEmployes.filter((item) => {
        const matchesName =
          name.trim() === "" ||
          item.first_name.includes(name.trim()) ||
          item.last_name.includes(name.trim());
        const matchesEmail =
          email.trim() === "" || item.email.includes(email.trim());
        const matchesPhone =
          phone.trim() === "" || item.phone.includes(phone.trim());
        const matchesSkype =
          skype.trim() === "" || item.skype.includes(skype.trim());
        const matchesRoom =
          room.trim() === "" || item.room.includes(room.trim());
        const matchesDepartment =
          department.trim() === "" || item.department === department;
        const matchesBuildng =
          building.trim() === "" || item.building === building;
        return (
          matchesName &&
          matchesEmail &&
          matchesPhone &&
          matchesSkype &&
          matchesRoom &&
          matchesDepartment &&
          matchesBuildng
        );
      });
      setFilteredCardsData(searchedData);
    }
  };
  const err = error as { data: string };
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : isError && err.data == "User is not logged in" ? (
        <Navigate to="/login" />
      ) : (
        <div className="cards_container">
          <div className="cards_left">
            <div className="cards_search_top">
              <p
                className={`${!searchAdvanced && "active_search"}`}
                onClick={() => setSearchAdvanced(false)}
              >
                BASIC SEARCH
              </p>
              <p
                className={`${searchAdvanced && "active_search"}`}
                onClick={() => setSearchAdvanced(true)}
              >
                ADVANCED SEARCH
              </p>
            </div>
            {!searchAdvanced ? (
              <div className="search_container">
                <div className="basic_search">
                  <div className="input_container">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Search"
                      value={basicInput}
                      onChange={(e) => setBasicIput(e.currentTarget.value)}
                    />
                    <img src={searchImg} alt="Search" />
                  </div>
                  <button onClick={updateState}>Search</button>
                </div>
              </div>
            ) : (
              <form
                className="search_advanced_container"
                onSubmit={handleAdvancedSearch}
              >
                <div className="search_advanced_input_container">
                  <label htmlFor="name_id">Name</label>
                  <input
                    id="name_id"
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
                <div className="search_advanced_input_container">
                  <label htmlFor="email_id">Email</label>
                  <input
                    id="email_id"
                    type="text"
                    placeholder="john.smith@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>
                <div className="search_advanced_two_iputs">
                  <div className="search_advanced_input_container">
                    <label htmlFor="phone_id">Phone Number</label>
                    <input
                      id="phone_id"
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                    />
                  </div>
                  <div className="search_advanced_input_container">
                    <label htmlFor="skype_id">Skype</label>
                    <input
                      id="skype_id"
                      type="text"
                      placeholder="SkypeId"
                      value={skype}
                      onChange={(e) => setSkype(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div className="search_advanced_selects">
                  <div className="s_container">
                    <label htmlFor="building_id">Buildng</label>
                    <select
                      name=""
                      id="building_id"
                      value={building}
                      onChange={(e) => setBuilding(e.currentTarget.value)}
                    >
                      <option value="">Any</option>
                      {buildings.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="search_advanced_input_container">
                    <label htmlFor="room_id">Room</label>
                    <input
                      id="room_id"
                      type="text"
                      placeholder="303"
                      value={room}
                      onChange={(e) => setRoom(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div className="advanced_select">
                  <label htmlFor="department_id">Department</label>
                  <select
                    name=""
                    id="department_id"
                    value={department}
                    onChange={(e) => setDepartment(e.currentTarget.value)}
                  >
                    <option value="">Any</option>
                    {departments.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Search</button>
              </form>
            )}
          </div>
          <div className="cards_right">
            <div className="cards_right_top">
              <p> {filteredCardsData.length} employees displayed</p>
              <div className="cards_right_buttons">
                <img
                  src={gridImg}
                  alt="Grid"
                  className={`${displayGrid == "grid" && "cards_active_btn"}`}
                  onClick={() => setDisplayGrid("grid")}
                />
                <img
                  src={listImg}
                  alt="List"
                  className={`${displayGrid == "list" && "cards_active_btn"}`}
                  onClick={() => setDisplayGrid("list")}
                />
              </div>
            </div>
            {filteredCardsData.length > 0 && (
              <>
                {displayGrid == "grid" ? (
                  <div className="cards_items_container">
                    {filteredCardsData.map((item, index) => (
                      <Link
                        to={`card/${item.id}`}
                        className={`cards_item_container cards_item_container_opacity `}
                        style={{ animationDelay: `${index / 10}s` }}
                        key={item.id}
                      >
                        <div className="cards_item_top">
                          <img src={item.user_avatar} alt="Avatar" />
                          <h3>
                            {item.first_name} {item.last_name}
                          </h3>
                        </div>
                        <div className="cards_item_bottom">
                          <div className="cards_bottom_item">
                            <img src={caseImg} alt="Department" />
                            <p>{item.department}</p>
                          </div>
                          <div className="cards_bottom_item">
                            <img src={phoenImg} alt="Phome" />
                            <p>{item.room}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="cards_list_container">
                    <div className="list_top">
                      <div className="list_top_item list_item_first">
                        <img src={circleImg} alt="Photo" />
                        <p>Photo</p>
                      </div>
                      <div className="list_top_item list_item_second">
                        <img src={personImg} alt="Nperson" />
                        <p>Name</p>
                      </div>
                      <div className="list_top_item list_item_first">
                        <img src={caseImg} alt="Department" />
                        <p>Department</p>
                      </div>
                      <div className="list_top_item list_item_first">
                        <img src={phoenImg} alt="Room" />
                        <p>Room</p>
                      </div>
                    </div>
                    <div className="list_body">
                      {filteredCardsData.map((item, index) => (
                        <Link
                          to={`card/${item.id}`}
                          className="list_item cards_item_container_opacity"
                          key={index}
                          style={{ animationDelay: `${index / 10}s` }}
                        >
                          <div className="list_item_image list_item_first">
                            <img src={item.user_avatar} alt="Avatar" />
                          </div>
                          <div className="list_item_name list_item_second">
                            {item.first_name} {item.last_name}
                          </div>
                          <div className="list_item_department list_item_first">
                            {item.department}
                          </div>
                          <div className="list_item_room list_item_first">
                            {item.room}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {filteredCardsData.length == 0 && (
              <div>
                <img src={notFound} alt="Not Found" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
