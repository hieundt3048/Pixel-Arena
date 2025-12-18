import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUsername } from "@/contexts/UsernameContext";

const UsernameDialog = () => {
  const { username, setUsername } = useUsername();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show dialog if username is not set
    if (!username) {
      setIsOpen(true);
    }
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length > 0) {
      setUsername(trimmedValue);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !username && setIsOpen(open)}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Your Username</DialogTitle>
          <DialogDescription>
            Please enter a username to continue. This will be used to identify
            your contributions to the pixel canvas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              minLength={1}
              maxLength={50}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={inputValue.trim().length === 0}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameDialog;
