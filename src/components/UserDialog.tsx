import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UserDialog = () => {
  const user = useUser();
  const hasNoSession = user === null;

  return (
    <Dialog open={hasNoSession} onOpenChange={(open) => !open && hasNoSession}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How can I call you?</DialogTitle>
          <DialogDescription>Please enter your username</DialogDescription>
        </DialogHeader>
        <Input
          id="username"
          name="username"
          placeholder="jack, peter, alice,..."
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
