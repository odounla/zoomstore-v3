import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import CartButton from "./CartButton";
import NavSearch from "./NavSearch";
import Container from "../global/Container";
import { Suspense } from "react";
function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-zinc-950 sticky top-0 z-50">
      <Container className="flex flex-col md:flex-row md:justify-between md:items-center flex-wrap gap-4 py-4">
        <Logo />

        <div className="flex-1 max-w-2xl mx-auto order-last md:order-none w-full md:w-auto">
          <Suspense>
            <NavSearch />
          </Suspense>
        </div>

        <div className="flex gap-4 items-center justify-end">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
