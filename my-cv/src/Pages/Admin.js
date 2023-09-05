import React, { useEffect, useState } from "react";
import axios from "axios"; // Importez Axios

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour charger la liste des utilisateurs depuis l'API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("api/user/users"); // Faites un appel GET à l'API pour obtenir la liste des utilisateurs
        setUsers(response.data); // Mettez à jour l'état avec les données des utilisateurs
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers(); // Appelez la fonction pour charger les utilisateurs au chargement du composant
  }, []);

  // Fonction pour supprimer un utilisateur par son ID
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`api/user/users/${userId}`); // Faites un appel DELETE à l'API pour supprimer l'utilisateur
      // Mettez à jour la liste des utilisateurs après la suppression
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Liste des utilisateurs</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.firstName} {user.lastName} - {user.email}
                <button onClick={() => deleteUser(user._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Admin;