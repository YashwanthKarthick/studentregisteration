import React, { useEffect } from "react";
import { useState } from "react";
// import { Modal } from "react-bootstrap";
import AnnouncementService from "../Service/AnnouncementService";
import Dashboard from "../Components/Dashboard";
import "../App.css";
import { useNavigate } from "react-router-dom";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

// import Logo from "../contact.png";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [duration, setDuration] = useState("");
  const [createBy, setCreateBy] = useState("");

  const Navigate = useNavigate();

  //clear text
  const clearTextFields = () => {
    setTitle("");
    setDescription("");
    setPicture(null);
    setDuration("");
    setCreateBy("");
  };

  useEffect(() => {
    getAllAnnounce();
  }, []);

  //getAll announce
  const getAllAnnounce = () => {
    AnnouncementService.getAllAnnounce()
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getAllAnnounce = () => {
  //   AnnouncementService.getAllAnnounce()
  //     .then((response) => {
  //       const announcements = response.data.announcements;
  //       const announcementsArray = Array.from(announcements);
  //       announcementsArray.sort((a, b) => b.createAt - a.createAt);
  //       this.setAnnouncements({ announcementsArray });
  //         // setAnnouncements(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  
  
  //Base 64
  // function convertBase64(e) {
  //   console.log(e.target.files); // Make sure 'e.target.files' is defined
  //   if (e.target.files && e.target.files.length > 0) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const base64Image = event.target.result;
  //       setPicture(base64Image);
  //       console.log(reader.result) // Set the base64 image in the state
  //     };
  //     reader.readAsDataURL(e.target.files[0]); // Convert image file to base64
  //   }
  // }

  //Functions
  function convertBase64(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target.result) {
          const base64Image = event.target.result;
          console.log(base64Image);
          const base64Data = base64Image.replace(
            /^data:image\/(png|jpg|jpeg);base64,/,
            ""
          );
          setPicture(base64Data);
          Navigate("/announcement");
        } else {
          console.log("Failed to read image data");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  //create an announce
  const createAnnounce = () => {
    if (title && description ) {
      const announce = { title, description, duration, createBy, picture };

      AnnouncementService.createAnnounce(announce).then((response) => {
        console.log(response.data);
        clearTextFields();
        getAllAnnounce();
        window.alert("Announcement Added Successfully");
        window.location.href = "/announcement";
      });
    } else {
      window.alert("Please Fill all details");
    }
  };

  //Update an anounce
  const [editingAnnounce, setEditingAnnounce] = useState(null);
  const enterEditingMode = (announcement) => {
    setEditingAnnounce(announcement);
    setEditingAnnounce(announcement);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setPicture(announcement.picture);
    setDuration(announcement.duration);
    setCreateBy(announcement.createBy);
    toggleFormPopup();
  };

  const updateAnnounce = (id) => {
    if (editingAnnounce) {
      const updatedAnnounce = {
        ...editingAnnounce, // Keep existing properties
        title,
        description,
        picture,
        duration,
        createBy,
      };

      AnnouncementService.updateAnnounce(id, updatedAnnounce)
        .then((response) => {
          console.log(response.data);
          clearTextFields();
          getAllAnnounce();
          window.alert("Updated Successfully");
          toggleFormPopup();
          setEditingAnnounce(null);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert("No announcements selected for update");
    }
  };

  //Delete an annouonce
  const deleteAnnounce = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      AnnouncementService.deleteAnnounce(id)
        .then((response) => {
          console.log(response);
          getAllAnnounce();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //conver to base
  const [searchQuery, setSearchQuery] = useState("");
  //Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Filtered announcement based on search query
  const filteredUsers = announcements.filter(
    (announce) =>
      announce.title.toLowerCase().includes(searchQuery) ||
      announce.description.toLowerCase().includes(searchQuery) ||
      announce.duration.toString().includes(searchQuery)
  );

  // const [showFullDescription, setShowFullDescription] = useState(false);

  // const toggleDescription = () => {
  //   setShowFullDescription(!showFullDescription);
  // };

  const [showFormPopup, setShowFormPopup] = useState(false);
  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  return (
    <div>
      <Dashboard>
        <div className={`custom-modal-overlay ${showFormPopup ? "show" : ""}`}>
          <div className="custom-modal">
            <div className="modal-content">
              <button
                className="delete-button"
                onClick={() => setShowFormPopup(false)}
              >
                <ExitToAppIcon />
              </button>
              <br />
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="poplabel">Title</label>
              </div>
              <div className="input-container">
                <input
                  type="file"
                  className="popinpts"
                  accept="image/*"
                  onChange={convertBase64}
                />
                {/* {picture === "" || picture === null ? (
                  ""
                ) : (
                  <img width={100} height={100} src={picture} alt="Preview" />
                )} */}
              </div>
              <div className="input-container">
                <textarea
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label className="poplabel">Description</label>
              </div>

              <div>
                {/* <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea> */}
                {/* <div className="input-container">
                  <input
                    type="text"
                    className="popinpts"
                    placeholder=" "
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <label className="poplabel">Duration</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    className="popinpts"
                    placeholder=" "
                    value={createBy}
                    onChange={(e) => setCreateBy(e.target.value)}
                  />
                  <label className="poplabel">Create By</label>
                </div> */}
                <div className="savebtndiv">
                  <div className="savebtndiv">
                    {editingAnnounce ? (
                      <button
                        className="update-button"
                        onClick={() =>
                          updateAnnounce(editingAnnounce.announceId)
                        }
                      >
                        <SaveIcon />
                      </button>
                    ) : (
                      <button
                        className="update-button"
                        onClick={(e) => {
                          createAnnounce(e);
                        }}
                      >
                        <SaveIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Modal className={`custom-modal-overlay ${showFormPopup ? 'show' : ''}`} onHide={toggleFormPopup}>
          <Modal.Header>
            <button
              className="delete-button"
              onClick={() => setShowFormPopup(false)}
            >
              <ExitToAppIcon />
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="pops">
              <div className="popcont">
                <div>
                  <label className="poplabel">Title :</label>
                  <input
                    type="text"
                    className="popinpts"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="poplabel">Image :</label>
                  <input
                    type="file"
                    className="popinpts"
                    accept="image/*"
                    onChange={convertBase64}
                  />
                  {picture == "" || picture == null ? (
                    ""
                  ) : (
                    <img width={100} height={100} src={picture} alt="Preview" />
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div>
                    <label className="poplabel">Duration :</label>
                    <input
                      type="text"
                      className="popinpts"
                      placeholder="Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="poplabel">Create By:</label>
                    <input
                      type="text"
                      className="popinpts"
                      placeholder="Create By"
                      value={createBy}
                      onChange={(e) => setCreateBy(e.target.value)}
                    />
                  </div>
                  <br />
                  <div className="savebtndiv">
                    <button
                      className="update-button"
                      onClick={(e) => {
                        createAnnounce(e);
                      }}
                    >
                      <SaveIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal> */}
        {/* <div className="search"> */}
        <button className="hadduserbtn" onClick={toggleFormPopup}>
          <AddIcon />
          ADD
        </button>
        <input
            type="text"
            className="searchinpts"
            placeholder="search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        
          {/* <input
            type="text"
            className="searchinpts"
            placeholder="search..."
            value={searchQuery}
            onChange={handleSearch}
          /> */}
          {/* <button className="searchbtn">
            <SearchIcon />
          </button> */}
        {/* </div> */}
        <div >
          {filteredUsers.map((announcement) => (
            <div key={announcement.announceId} className="customannounce">
              {/* <div className="image-container">
              <img src={Logo} alt="Logo" className="image" />
                {announcement.picture}
              </div> */}
              {/* <div className="image-container"> */}
              <img
                src={`data:image/jpeg;base64,${announcement.picture}`}
                alt="Announcement"
                className="image"
              />
              {/* </div> */}
              <div className="content">
                <div className="head6">{announcement.title}</div>
                <div className="description">
                  {/* {showFullDescription ? (
                    announcement.description
                  ) : (
                    <>
                      {announcement.description.slice(0, 200)}{" "}
                      <span onClick={toggleDescription} className="read-more">
                        Read More
                      </span>
                    </>
                  )} */}
                  {announcement.description}
                </div>
              </div>
              <button
                onClick={() => enterEditingMode(announcement)}
                className="update-button"
              >
                <EditIcon />
              </button>
              <button
                className="delete-button"
                onClick={() => deleteAnnounce(announcement.announceId)}
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      </Dashboard>
    </div>
  );
};

export default Announcement;
