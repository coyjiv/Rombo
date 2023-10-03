import { User } from "@/types";
import { SearchUserCard } from "./SearchUserCard";

export const SearchResults = ({ searchResults }: { searchResults: User[] }) =>
  searchResults.length > 0 ? (
    <div>
      <ul className="space-y-4">
        {searchResults.map((user) => (
          <SearchUserCard key={user?.id} user={user} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-center mt-8 text-white">No users found.</div>
  );
