
import { fetchUserById } from '@/app/actions';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
// 

function Counter() {
  const user = useAppSelector((state) => state.user.user); // Обратите внимание на state.users.users, так как у вас есть вложенный объект с именем 'users'
  const dispatch = useAppDispatch();
console.log(user)
  return (
    <div>
  <button onClick={()=>{dispatch(fetchUserById())}}>dsdqdwqd</button>
    </div>
  );
}

export default Counter;