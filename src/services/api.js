export const fetchUsersApi = async () => {
  const response = await fetch(
    "https://backend-production-429b.up.railway.app/users"
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const addUserApi = async (userData) => {
  const response = await fetch(
    "https://backend-production-429b.up.railway.app/users/",
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const updateUserApi = async (id, userData) => {
  try {
    const response = await fetch(
      `https://backend-production-429b.up.railway.app/users/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const updatedUser = await response.json();
    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUserApi = async (id) => {
  const response = await fetch(
    `https://backend-production-429b.up.railway.app/users/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};
