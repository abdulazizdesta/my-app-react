import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function App() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fecthUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users/', { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data: User[] = await response.json();

        if (isMounted) {
          setUsers(data)
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fecthUsers();
    return () => {      
      controller.abort();
      isMounted = false;
    }
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!users) return <p>No user data</p>

  return (
    <>
      <h1>Welcome to My App!</h1>
      <div className='grid grid-cols-3 gap-4'>
        {users.map((user, index) => (
          <div className='bg-white p-5 rounded-xl shadow my-2' key={index}>
            <h2 className='text-indigo-500 text-xl font-bold'>{user.name}</h2>
            <p className='text-gray-500'>{user.email}</p>
            <p className='text-teal-600'>{user.username}</p>
          </div>
        ))}
      </div>
    </>
  )
}