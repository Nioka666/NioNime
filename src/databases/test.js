import axios from "axios";

export const fetchUserData = (callback) => {
    axios.get("http://localhost:3000/api/user", {
        withCredentials: true,
    })
        .then(response => {
            console.log(response.data);
            callback(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

// Contoh penggunaan
fetchUserData((userData) => {
    // Lakukan sesuatu dengan data pengguna (userData)
    console.log("Data pengguna:", userData);
});
