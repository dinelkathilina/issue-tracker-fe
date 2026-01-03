import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Switch,
} from "@heroui/react";

import { useTheme } from "@heroui/use-theme";
import { Logo } from "./Logo";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export default function NavBar() {
  const menuItems = ["Profile", "Dashboard", "Log Out"];
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent justify="start">
          <NavbarBrand>
            {/* logo */}
            <Logo />

            <p className="font-bold text-inherit">Issue Tracker</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              isSelected={theme === "light"}
              onValueChange={(e) => setTheme(e ? "light" : "dark")}
              color="secondary"
              size="lg"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
            />
          </NavbarItem>

          <NavbarItem>
            <Button as={Link} color="warning" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
