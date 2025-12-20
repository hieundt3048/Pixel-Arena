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
import { useUser } from "@/contexts/UserContext";

const UserDialog = () => {
  const { username, setUsername, onSubmit, currentUser } = useUser();

  return (
    <Dialog open={!currentUser}>
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full" onClick={onSubmit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
