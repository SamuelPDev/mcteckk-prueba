import { useEffect, useState } from "react";

export const Home = () => {
  const [users, setUsers] = useState([]);

  async function getUsers(token) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`, {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data?.errors) {
      sessionStorage.removeItem("token");
      window.location.href = "/signin";
    }
    setUsers(data);
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.location.href = "/signin";
    }

    getUsers(token);
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="md:px-32 py-8  w-full">
          <div className="shadow overflow-hidden rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Last name
                  </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users?.map((user, key) => {
                  return (
                    <tr key={key}>
                      <td className="w-1/3 text-left py-3 px-4">
                        {user?.firstname}
                      </td>
                      <td className="w-1/3 text-left py-3 px-4">
                        {user?.lastname}
                      </td>
                      <td className="text-left py-3 px-4">
                        <a
                          className="hover:text-blue-500"
                          href="mailto:jonsmith@mail.com"
                        >
                          {user?.email}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
