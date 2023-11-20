
export async function findUser(searchString:any) {
    try {
      const response = await fetch(`/api/users?searchString=${searchString}`);
      const { data } = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function findFriend(searchString: any, userEmail: string) {
    try {
      const queryString = searchString ? `?searchString=${searchString}` : '';
      const response = await fetch(`/api/users${queryString}&userEmail=${userEmail}`);
      const { data } = await response.json();
      return data || [];
    } catch (error) {
      throw error;
    }
  }