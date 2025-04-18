// src/lib/users.ts
type RawUser = {
    login: {
      username: string;
      password: string;
    };
    name: { first: string; last: string };
    picture: { thumbnail: string };
  };
  
  export type AppUser = {
    username: string;
    password: string;
    first: string;
    last: string;
    thumbnail: string;
  };
  
  let usersCache: AppUser[] | null = null;
  
  export async function getRandomUsers(): Promise<AppUser[]> {
    if (usersCache) return usersCache;
  
    const res = await fetch('https://randomuser.me/api/?results=9', {
      // não cache no build; sempre fresh (mas a variável em memória ficará)
      cache: 'no-store',
    });
    const data = await res.json();
    usersCache = (data.results as RawUser[]).map(u => ({
      username: u.login.username,
      password: u.login.password,
      first: u.name.first,
      last: u.name.last,
      thumbnail: u.picture.thumbnail,
    }));
    return usersCache;
  }
  