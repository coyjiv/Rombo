import { SearchFriendCard } from "./SearchFriendCard";
import { IUser } from "@/mongo/models/User";

interface SearchFriendResultsProps {
  searchResults: IUser[];
  searchString: string;
}

export const SearchFriendResults = ({ searchResults, searchString }: SearchFriendResultsProps) => {
  const friends = searchResults.filter((user) => user.friends.length > 0);

  return (
    <div>
      {searchString.length > 0 ? (
        friends.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {friends.map((user) => (
              <SearchFriendCard key={user.email} user={user} />
            ))}
          </ul>
        ) : (
          <div className="text-center mt-8 text-white text-3xl">No friends found.</div>
        )
      ) : null}
    </div>
  );
};