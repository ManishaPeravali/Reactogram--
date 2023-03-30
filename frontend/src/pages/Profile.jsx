import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Profile.css";
import horizontalMoreAction from "../images/horizontalMoreAction.PNG";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({ preview: "", data: "" });

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");

  //  ================= frontend state variables =================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPost, setShowPost] = useState(false);
  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);
  //  ================= frontend state variables =================

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  // Function that will upload our image to the server
  const handleImageUpload = async () => {
    let formData = new FormData();
    formData.append("file", image.data);
    const response = axios.post("http://localhost:5000/uploadFile", formData);
    return response;
  };

  const addPost = async () => {
    if (image.preview === "") {
      Swal.fire({
        icon: "error",
        title: "Post image is mandatory!",
      });
    } else if (caption === "") {
      Swal.fire({
        icon: "error",
        title: "Post caption is mandatory!",
      });
    } else if (location === "") {
      Swal.fire({
        icon: "error",
        title: "Location is mandatory!",
      });
    } else {
      setLoading(true);
      const imgRes = await handleImageUpload();
      const request = {
        description: caption,
        location: location,
        image: `http://localhost:5000/files/${imgRes.data.fileName}`,
      };
      // write api call to create post
      const postResponse = await axios.post(
        `http://localhost:5000/createpost`,
        request,
        CONFIG_OBJ
      );
      setLoading(false);
      if (postResponse.status === 201) {
        navigate("/posts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Some error occurred while creating post",
        });
      }
    }
  };
  return (
    <div className="container shadow mt-3 p-5">
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <img
            className="profile-image p-1"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile-pic"
          />
          <div className="ms-3 fs-5 fw-bold">john_doe46</div>
          <div className="ms-3 fs-5">John Doe</div>
          <div className="ms-3 fs-5">
            UI/UX Designer @internshala | Follow @johndoe
          </div>
          <div className="ms-3 fs-5">
            My portfolio on <Link> www.portfolio.com</Link>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between mt-2">
          <div className="stats d-flex justify-content-center gap-4">
            <div className="count-section borderRight pe-5 fw-bold">
              <h4>34</h4>
              <p>Posts</p>
            </div>
            <div className="count-section borderRight ps-0 pe-4 fw-bold">
              <h4>638</h4>
              <p>Followers</p>
            </div>
            <div className="count-section fw-bold ps-1">
              <h4>829</h4>
              <p>Folllowing </p>
            </div>
          </div>
          <div className="buttons mx-auto mt-md-0 mt-4 d-flex justify-content-center gap-5">
            <button className="custom-btn custom-btn-white shadow-sm">
              <span className="fw-semibold fs-6">Edit Profile</span>
            </button>
            <button
              className="custom-btn custom-btn-white shadow-sm"
              onClick={handlePostShow}
            >
              <span className="fw-semibold fs-6">Upload Post</span>
            </button>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <hr />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 col-sm-12">
          <div className="card" onClick={handleShow}>
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>

        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
              className="card-img-top"
            />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="https://images.unsplash.com/photo-1575881875475-31023242e3f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1477005264461-b0e201668d92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body px-2">
                  <div className="row">
                    <div className="col-6 d-flex">
                      <img
                        className="profile-pic p-1"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                        alt="profile-pic"
                      />
                      <div className="mt-2 ms-2">
                        <p className="fs-6 fw-bold">_._dexter</p>
                        <p className="location">Mumbai, India</p>
                      </div>
                      <div className="dropdown ms-5 ">
                        <Link
                          className="btn"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          <img alt="more action" src={horizontalMoreAction} />
                        </Link>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item">
                              <i className="fa-regular fa-pen-to-square px-2"></i>
                              Edit Post
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item">
                              <i className="fa-solid fa-trash px-2"></i>Delete
                              Post
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <span className="ps-2 text-muted">2 Hours Ago</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 ms-2 mt-2">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Blanditiis dignissimos aliquid id! Ut, consequatur
                        iusto?
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 d-flex">
                      <i className="ps-2 fs-4 fa-regular fa-heart"></i>
                      <i className="ps-2 fs-4 fa-regular fa-comment"></i>
                      <i className="ps-2 fs-4 fa-solid fa-location-arrow"></i>
                    </div>
                    <div className="col-12 mt-3 ms-2">
                      <span className="pe-3 fs-6 fw-bold ">200 likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for uploading an image */}
      <Modal
        show={showPost}
        onHide={handlePostClose}
        size="lg"
        centered
        className="uploadModal"
      >
        <Modal.Header closeButton>
          <span className="fw-bold fs-6"></span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="upload-box">
                <div className="dropzoneContainer">
                  <input
                    name="file"
                    type="file"
                    id="drop_zone"
                    className="FileUpload"
                    accept=".jpg,.png,.gif"
                    onChange={handleFileSelect}
                  />

                  <div className="dropzoneOverlay text-muted">
                    {image.preview && (
                      <img
                        src={image.preview}
                        width="150px"
                        height="150px"
                        alt="uploaded file"
                      />
                    )}
                    <i className="fa-solid fa-cloud-arrow-up fs-2 "></i>
                    <br />
                    <br />
                    <p
                      className="fs-5 fw-semibold"
                      style={{ color: "#ed2a7e" }}
                    >
                      Upload Photo from your device
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12  col-sm-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-sm-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      type="text"
                      className="form-control uploadInputs"
                      id="floatingInput"
                      placeholder="Add Caption"
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Add Caption</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control uploadInputs"
                      id="floatingInput"
                      placeholder="Add Location"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      <i className="fa-solid fa-location-pin pe-2"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  {loading ? (
                    <div className="col-md-12 mt-3 text-center">
                      <div className="spinner-border text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    className="custom-btn custom-btn-pink float-end"
                    onClick={() => {
                      addPost();
                    }}
                  >
                    <span className="fs-6 fw-700">POST</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Profile;
