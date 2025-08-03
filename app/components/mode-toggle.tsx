import { Moon, Sun } from "lucide-react";

import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
      className="absolute bottom-8 right-8 size-14 rounded-full"
    >
      <Sun className=" size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="size-6 absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
