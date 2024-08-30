// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Profile.css";
// import { getProfile, updateProfile } from "../../apis/api";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const Profile = () => {
//   //   const [profile, setProfile] = useState({
//   //     firstName: "",
//   //     lastName: "",
//   //     email: "",
//   //     phone: "",
//   //     address: "",
//   //   });

//   //   useEffect(() => {
//   //     // Fetch profile data when component mounts
//   //     axios
//   //       .get("http://localhost:9000/api/user/getprofile")
//   //       .then((response) => {
//   //         setProfile(response.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("There was an error fetching the profile data!", error);
//   //       });
//   //   }, []);
//   useEffect(() => {
//     console.log("use effect called");
//     getProfile()
//       .then((res) => {
//         console.log(res.data);

//         // setting data to show in UI
//         setFirstName(res.data.user.firstName);
//         setLastName(res.data.user.lastName);
//         setEmail(res.data.user.email);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   // make a use state
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");

//   //   const handleUpdate = (e) => {
//   //     // const { name, value } = e.target;
//   //     // setProfile({
//   //     //   ...profile,
//   //     //   [name]: value,
//   //     // });
//   //     e.preventDefault();

//   //     //make a form data
//   //     const formData = new FormData();
//   //     formData.append("firstName", firstName);
//   //     formData.append("lastName", lastName);
//   //     formData.append("email", email);

//   //api call
//   // updateProduct(id, formData)
//   //   .then((res) => {
//   //     if (res.status === 201) {
//   //       toast.success(res.data.message);
//   //     }
//   //   })
//   //   .catch((error) => {
//   //     if (error.response.status === 500) {
//   //       toast.error(error.response.data.message);
//   //     } else if (error.response.status === 400) {
//   //       toast.warning(error.response.data.message);
//   //     }
//   //   });
//   //   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Update profile data
//     updateProfile({
//       firstName,
//       email,
//       lastName,
//     })
//       .then((response) => {
//         console.log(response.data);
//         toast.success("Successfully updated");
//       })
//       .catch((error) => {
//         console.error("There was an error updating the profile data!", error);
//       });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Account Settings</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button>Update</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../apis/api";
import { toast } from "react-hot-toast";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect called");
    getProfile()
      .then((res) => {
        console.log(res.data);
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setEmail(res.data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile({
      firstName,
      email,
      lastName,
    })
      .then((response) => {
        console.log(response.data);
        toast.success("Successfully updated");
      })
      .catch((error) => {
        console.error("There was an error updating the profile data!", error);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={() => navigate("/changepassword")}>
        Change Password
      </button>
    </div>
  );
};

export default Profile;
