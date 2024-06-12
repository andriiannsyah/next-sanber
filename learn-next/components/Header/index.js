import Menu from "@/components/Menu";
import { withAuth } from "../with-auth";

export function Header() {
  return (
    <div>
      <Menu />
    </div>
  );
}

export default withAuth(Header);
