import { Button } from "@mui/material";
import { tokenStore } from "hooks/useAuth";
import useLogOut from "hooks/useLogOut";
import { Link, Outlet } from "react-router-dom";
import { useStore } from "zustand";

const Home = () => {
  const { token } = useStore(tokenStore);
  const { onLogout } = useLogOut();
  return (
    <div>
      <div>
        {token ? (
          <>
            <Button>
              <Link to={"orders"}>Order</Link>
            </Button>
            <Button onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Button>
            <Link to={"login"}>Login</Link>
          </Button>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Home;
