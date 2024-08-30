// import React from "react";
// import { useState, useEffect } from "react";
// import {
//   createServiceApi,
//   deleteService,
//   getAllServices,
// } from "../../apis/api";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";

// const AdminDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [serviceName, setServiceName] = useState("");
//   const [servicePrice, setServicePrice] = useState("");
//   const [serviceCategory, setServiceCategory] = useState("");
//   const [serviceDescription, setServiceDescription] = useState("");
//   const [serviceLocation, setServiceLocation] = useState("");
//   const [serviceImage, setServiceImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     // getAllServices()
//     getServicesByUser()
//       .then((res) => {
//         if (res.data && res.data.services) {
//           setServices(res.data.services);
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch user services:", error);
//       });
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setServiceImage(file);
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleDelete = (id) => {
//     const confirmDialog = window.confirm(
//       "Are you sure you want to delete this service?"
//     );
//     if (confirmDialog) {
//       deleteService(id)
//         .then((res) => {
//           if (res.status === 201) {
//             toast.success(res.data.message);
//             setServices(services.filter((service) => service._id !== id));
//           }
//         })
//         .catch((error) => {
//           toast.error(
//             error.response
//               ? error.response.data.message
//               : "Something went wrong!"
//           );
//         });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("serviceName", serviceName);
//     formData.append("servicePrice", servicePrice);
//     formData.append("serviceCategory", serviceCategory);
//     formData.append("serviceDescription", serviceDescription);
//     formData.append("serviceLocation", serviceLocation);
//     formData.append("serviceImage", serviceImage); // Attach file

//     // Debugging log to see form data
//     for (var pair of formData.entries()) {
//       console.log(pair[0] + ", " + pair[1]);
//     }

//     createServiceApi(formData)
//       .then((res) => {
//         if (res.status === 201) {
//           toast.success(res.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.error(
//           error.response ? error.response.data.message : "Something went wrong!"
//         );
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="text-primary">Admin Dashboard</h1>
//         <button
//           type="button"
//           className="btn btn-primary"
//           data-bs-toggle="modal"
//           data-bs-target="#addServiceModal"
//         >
//           Add New Service
//         </button>
//       </div>

//       <div className="card shadow-sm mb-4">
//         <div className="card-body">
//           <table className="table table-hover">
//             <thead className="table-light">
//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Description</th>
//                 {/* <th>Location</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((singleService) => (
//                 <tr key={singleService._id}>
//                   <td>
//                     <img
//                       height="50"
//                       width="50"
//                       src={`http://localhost:9000/uploads/${singleService.serviceImage}`}
//                       alt={singleService.serviceName}
//                       className="img-fluid rounded"
//                     />
//                   </td>
//                   <td>{singleService.serviceName}</td>
//                   <td>NPR {singleService.servicePrice}</td>
//                   <td>{singleService.serviceCategory}</td>
//                   <td>{singleService.serviceDescription}</td>
//                   <td>
//                     <div className="btn-group">
//                       <Link
//                         to={`/pro/update/${singleService._id}`}
//                         className="btn btn-outline-primary btn-sm"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(singleService._id)}
//                         className="btn btn-outline-danger btn-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div
//         className="modal fade"
//         id="addServiceModal"
//         tabIndex="-1"
//         aria-labelledby="addServiceModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="addServiceModalLabel">
//                 Add New Service
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="serviceName" className="form-label">
//                     Service Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="serviceName"
//                     value={serviceName}
//                     onChange={(e) => setServiceName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="servicePrice" className="form-label">
//                     Service Price
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="servicePrice"
//                     value={servicePrice}
//                     onChange={(e) => setServicePrice(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="serviceCategory" className="form-label">
//                     Service Category
//                   </label>
//                   <select
//                     className="form-select"
//                     id="serviceCategory"
//                     value={serviceCategory}
//                     onChange={(e) => setServiceCategory(e.target.value)}
//                     required
//                   >
//                     <option value="Home Maintenance">Home Maintenance</option>
//                     <option value="Home Modelling">Home Modelling</option>
//                     <option value="Weddings">Weddings</option>
//                     <option value="Events">Events</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="serviceLocation" className="form-label">
//                     Service Location
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="serviceLocation"
//                     value={serviceLocation}
//                     onChange={(e) => setServiceLocation(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="serviceDescription" className="form-label">
//                     Service Description
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="serviceDescription"
//                     rows="3"
//                     value={serviceDescription}
//                     onChange={(e) => setServiceDescription(e.target.value)}
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="serviceImage" className="form-label">
//                     Service Image
//                   </label>
//                   <input
//                     className="form-control"
//                     type="file"
//                     id="serviceImage"
//                     onChange={handleImageUpload}
//                     required
//                   />
//                 </div>
//                 {previewImage && (
//                   <div className="mb-3">
//                     <img
//                       src={previewImage}
//                       alt="Preview"
//                       className="img-fluid rounded"
//                     />
//                   </div>
//                 )}
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     data-bs-dismiss="modal"
//                   >
//                     Close
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Save Service
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import {
  createServiceApi,
  deleteService,
  getServicesByUser,
} from "../../apis/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProDashboard = () => {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    getServicesByUser()
      .then((res) => {
        console.log(res.data); // Check the structure here
        if (res.data && res.data.services) {
          setServices(res.data.services);
        } else {
          toast.error("Failed to fetch your services");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user services:", error);
        toast.error("Failed to fetch your services");
      });
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setServiceImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDialog) {
      deleteService(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            setServices(services.filter((service) => service._id !== id));
          }
        })
        .catch((error) => {
          toast.error(
            error.response
              ? error.response.data.message
              : "Something went wrong!"
          );
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("servicePrice", servicePrice);
    formData.append("serviceCategory", serviceCategory);
    formData.append("serviceDescription", serviceDescription);
    formData.append("serviceLocation", serviceLocation);
    formData.append("serviceImage", serviceImage); // Attach file

    createServiceApi(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(
          error.response ? error.response.data.message : "Something went wrong!"
        );
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Pro Dashboard</h1>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addServiceModal"
        >
          Add New Service
        </button>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((singleService) => (
                <tr key={singleService._id}>
                  <td>
                    <img
                      height="50"
                      width="50"
                      src={`http://localhost:9000/uploads/${singleService.serviceImage}`}
                      alt={singleService.serviceName}
                      className="img-fluid rounded"
                    />
                  </td>
                  <td>{singleService.serviceName}</td>
                  <td>NPR {singleService.servicePrice}</td>
                  <td>{singleService.serviceCategory}</td>
                  <td>{singleService.serviceDescription}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/pro/update/${singleService._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(singleService._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="addServiceModal"
        tabIndex="-1"
        aria-labelledby="addServiceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addServiceModalLabel">
                Add New Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="serviceName" className="form-label">
                    Service Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="servicePrice" className="form-label">
                    Service Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="servicePrice"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceCategory" className="form-label">
                    Service Category
                  </label>
                  <select
                    className="form-select"
                    id="serviceCategory"
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    required
                  >
                    <option value="Home Maintenance">Home Maintenance</option>
                    <option value="Home Modelling">Home Modelling</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceLocation" className="form-label">
                    Service Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serviceLocation"
                    value={serviceLocation}
                    onChange={(e) => setServiceLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceDescription" className="form-label">
                    Service Description
                  </label>
                  <textarea
                    className="form-control"
                    id="serviceDescription"
                    rows="3"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceImage" className="form-label">
                    Service Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="serviceImage"
                    onChange={handleImageUpload}
                    required
                  />
                </div>
                {previewImage && (
                  <div className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-fluid rounded"
                    />
                  </div>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDashboard;
