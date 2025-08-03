/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  photoURL?: string;
}

const Home = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const result = await response.json();
        setUser(result.data);
      } catch (err: any) {
        console.log(err.message);
        navigate("/"); //(/login)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page</h1>

      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 mb-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {user.role}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-lg mb-2">User Details</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">No User</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
