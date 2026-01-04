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
  User,
} from "@heroui/react";

import { useTheme } from "@heroui/use-theme";
import { Logo } from "./Logo";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = isAuthenticated
    ? ["Profile", "Dashboard", "Log Out"]
    : ["Login", "Sign Up"];

  const handleLogout = () => {
    dispatch(logout());
  };

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
            <Logo />
            <p className="font-bold text-inherit ml-2 hidden min-[375px]:block">
              Issue Tracker
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              isSelected={theme === "light"}
              onValueChange={(e) => setTheme(e ? "light" : "dark")}
              color="primary"
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

          {isAuthenticated ? (
            <>
              <NavbarItem className="hidden lg:flex">
                <User
                  name={user?.name}
                  description={user?.email}
                  avatarProps={{
                    src: `https://i.pravatar.cc/150?u=${user?.id}`,
                  }}
                />
              </NavbarItem>
              <NavbarItem>
                <Button color="danger" variant="flat" onPress={handleLogout}>
                  Log Out
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button as={Link} color="primary" href="#" >
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  item === "Log Out"
                    ? "danger"
                    : item === "Sign Up"
                    ? "warning"
                    : "foreground"
                }
                href="#"
                size="lg"
                onPress={item === "Log Out" ? handleLogout : undefined}
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
