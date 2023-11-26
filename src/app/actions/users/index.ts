
export async function findUser(searchString:any) {
    try {
      const response = await fetch(`/api/users?searchString=${searchString}`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function findFriend(searchString: string, userEmail: string) {
  try {
    const response = await fetch(`/api/friends?userEmail=${userEmail}&searchString=${searchString}`);
    const { data } = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}