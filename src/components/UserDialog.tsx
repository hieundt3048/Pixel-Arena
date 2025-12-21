import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";

const UserDialog = () => {
  const { user, username, onInputChange, handleSubmit } = useUser();

  return (
    <Dialog open={!user?.username}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How can I call you?</DialogTitle>
          <DialogDescription>Please enter your username</DialogDescription>
        </DialogHeader>
        <Input
          id="username"
          name="username"
          placeholder="jack, peter, alice,..."
          value={username}
          onChange={onInputChange}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
