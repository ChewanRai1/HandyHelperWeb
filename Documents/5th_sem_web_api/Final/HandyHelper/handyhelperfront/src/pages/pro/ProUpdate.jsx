import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleService, updateService } from "../../apis/api";
import { toast } from "react-hot-toast";

const AdminUpdate = () => {
  const { id } = useParams();

  // State for service details
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceNewImage, setServiceNewImage] = useState(null);
  const [previewNewImage, setPreviewNewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // Fetch service information on component mount
  useEffect(() => {
    getSingleService(id)
      .then((res) => {
        console.log("Full API Response:", res);

        if (res.data && res.data.service) {
          // setting data to show in UI
          setServiceName(res.data.service.serviceName);
          setServicePrice(res.data.service.servicePrice);
          setServiceDescription(res.data.service.serviceDescription);
          setServiceCategory(res.data.service.serviceCategory);
          setServiceLocation(res.data.service.serviceLocation);
          setOldImage(res.data.service.serviceImage);
        } else {
          console.error("Service data is missing in the response.");
          toast.error("Service data is missing.");
        }
      })
      .catch((error) => {
        console.error("Error fetching service data:", error);
        toast.error("Failed to load service data.");
      });
  }, [id]);
  // image upload handler
  const handleImage = (event) => {
    const file = event.target.files[0];
    setServiceNewImage(file); // for backend
    setPreviewNewImage(URL.createObjectURL(file));
  };

  // update service function
  const handleUpdate = (e) => {
    e.preventDefault();

    // make a form data
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("servicePrice", servicePrice);
    formData.append("serviceCategory", serviceCategory);
    formData.append("serviceLocation", serviceLocation);
    formData.append("serviceDescription", serviceDescription);

    if (serviceNewImage) {
      formData.append("serviceImage", serviceNewImage);
    }

    // api call
    updateService(id, formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 400) {
          toast.warning(error.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="container mt-3">
        <h2>
          Update service for{" "}
          <span className="text-danger">
            {serviceName ? `'${serviceName}'` : "Loading..."}
          </span>
        </h2>

        <div className="d-flex gap-3">
          <form action="">
            <label htmlFor="">Service Name</label>
            <input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Enter your service name"
            />

            <label className="mt-2" htmlFor="">
              Service Price
            </label>
            <input
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              className="form-control"
              type="number"
              placeholder="Enter your service price"
            />

            <label className="mt-2">Choose category</label>
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="form-control"
            >
              <option value="Home Maintenance">Home Maintenance</option>
              <option value="Home Modelling">Home Modelling</option>
              <option value="Weddings">Weddings</option>
              <option value="Events">Events</option>
            </select>

            <label className="mt-2">Service Location</label>
            <textarea
              value={serviceLocation}
              onChange={(e) => setServiceLocation(e.target.value)}
              className="form-control"
            ></textarea>

            <label className="mt-2">Enter description</label>
            <textarea
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              className="form-control"
            ></textarea>

            <label className="mt-2">Choose service Image</label>
            <input
              onChange={handleImage}
              type="file"
              className="form-control"
            />

            <button
              onClick={handleUpdate}
              className="btn btn-danger w-100 mt-2"
            >
              Update Service
            </button>
          </form>
          <div className="image section">
            <h6>Old Image Preview</h6>
            <img
              className="img-fluid object-fit-cover rounded-4"
              height={"200px"}
              width={"200px"}
              src={`http://localhost:9000/uploads/${oldImage}`}
              alt=""
            />

            {previewNewImage && (
              <div>
                <h6>New Image Preview</h6>
                <img
                  className="img-fluid object-fit-cover rounded-4"
                  height={"200px"}
                  width={"200px"}
                  src={previewNewImage}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUpdate;
