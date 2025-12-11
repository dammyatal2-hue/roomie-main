const API_URL = "http://localhost:5000/api/auth";

export async function registerUser(data) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
}
export async function loginUser(data) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong" };
  }
}
